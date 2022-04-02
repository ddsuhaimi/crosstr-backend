import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Role } from '../../typeorm/entities/users/types';
import { User } from '../../typeorm/entities/users/User';
import { UserToken } from '../../typeorm/entities/userTokens/UserToken';
import { JwtPayload } from '../../types/JwtPayload';
import { createJwtRefreshToken, createJwtToken } from '../../utils/createJwtToken';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { email } });

    if (user) {
      const customError = new CustomError(400, 'General', 'User already exists', [
        `Email '${user.email}' already exists`,
      ]);
      return next(customError);
    }

    try {
      const newUser = new User();
      newUser.email = email;
      newUser.password = password;
      newUser.hashPassword();
      await userRepository.save(newUser);

      res.customSuccess(200, 'User successfully created.');
      // res.json({})
    } catch (err) {
      const customError = new CustomError(400, 'Raw', `User '${email}' can't be created`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password, passwordNew } = req.body;
  const { id } = req.user;
  // const id = 1

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      const customError = new CustomError(404, 'General', 'Not Found', [`User ${id} not found.`]);
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new CustomError(400, 'General', 'Not Found', ['Incorrect password']);
      return next(customError);
    }

    user.password = passwordNew;
    user.hashPassword();
    userRepository.save(user);

    // res.customSuccess(200, 'Password successfully changed.');
    res.json({})

  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);
  const userTokenRepository = getRepository(UserToken);
  try {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      const customError = new CustomError(404, 'General', 'Not Found', ['Incorrect email or password']);
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new CustomError(404, 'General', 'Not Found', ['Incorrect email or password']);
      return next(customError);
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role as Role,
      created_at: user.createdAt,
    };

    try {
      const { token: accessToken, expiresIn: accessTokenExpiration } = createJwtToken(jwtPayload);
      const { token: refreshToken, expiresIn: refreshTokenExpiration } = createJwtRefreshToken(jwtPayload);

      const data = {
        ...user.toJSON(),
        accessToken: `Bearer ${accessToken}`,
        expiresIn: accessTokenExpiration,
        refreshToken: refreshToken,
      };

      const oldUserToken = await userTokenRepository.findOne({ where: { user: user } });
      if (oldUserToken) {
        // have signed in before
        oldUserToken.refreshToken = refreshToken;
        await userTokenRepository.save(oldUserToken);
      } else {
        // first time user sign in
        const newUserToken = new UserToken();
        newUserToken.user = user;
        newUserToken.refreshToken = refreshToken;
        await userTokenRepository.save(newUserToken);
      }

      // res.customSuccess(200, 'Token successfully created.', data);
      res.json({})

    } catch (err) {
      const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

export const getUserBasedOnToken = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user;
  // const id = 1

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      const customError = new CustomError(404, 'General', 'Not Found', [`User ${id} not found.`]);
      return next(customError);
    }

    // res.customSuccess(200, 'Password successfully changed.', user);
    res.json({})

  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  console.log('req.body', req.body);

  const userTokenRepository = getRepository(UserToken);
  const userRepository = getRepository(User);
  try {
    const userToken = await userTokenRepository.findOne({ where: { refreshToken: refreshToken } });
    if (!userToken) {
      const customError = new CustomError(404, 'General', 'Not Found', [`User Refresh Token not found.`]);
      return next(customError);
    }

    const user = await userRepository.findOne({ where: { id: userToken.user_id } });

    if (!user) {
      const customError = new CustomError(404, 'General', 'Not Found', [`User not found.`]);
      return next(customError);
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role as Role,
      created_at: user.createdAt,
    };
    const { token: newAccessToken, expiresIn: accessTokenExpiration } = createJwtToken(jwtPayload);
    const { token: newRefreshToken, expiresIn: refreshTokenExpiration } = createJwtRefreshToken(jwtPayload);
    userToken.refreshToken = newRefreshToken;

    await userTokenRepository.save(userToken);

    const data = {
      accessToken: `Bearer ${newAccessToken}`,
      expiresIn: accessTokenExpiration,
      refreshToken: newRefreshToken,
    };

    // res.customSuccess(200, 'Update access and refresh token.', data);
    res.json({})

  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
