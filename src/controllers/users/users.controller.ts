import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../../typeorm/entities/users/User';
import { CustomError } from '../../utils/response/custom-error/CustomError';

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne(id, {
      select: ['id', 'email', 'role', 'language', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      const customError = new CustomError(404, 'General', `User with id:${id} not found.`, ['User not found.']);
      return next(customError);
    }
    // res.customSuccess(200, 'User found', user.toJSON());
    res.json({})

  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = getRepository(User);
  try {
    const users = await userRepository.find({
      select: ['id', 'email', 'role', 'language', 'createdAt', 'updatedAt'],
    });
    // res.customSuccess(200, 'List of users.', users);
    res.json({})

  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};

export const editOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { name } = req.body;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      const customError = new CustomError(404, 'General', `User with id:${id} not found.`, ['User not found.']);
      return next(customError);
    }

    // user.name = name;

    try {
      await userRepository.save(user);
      // res.customSuccess(200, 'User successfully saved.');
      res.json({})

    } catch (err) {
      const customError = new CustomError(409, 'Raw', `User '${user.email}' can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      const customError = new CustomError(404, 'General', 'Not Found', [`User with id:${id} doesn't exists.`]);
      return next(customError);
    }
    userRepository.delete(id);

    // res.customSuccess(200, 'User successfully deleted.', { id: user.id, email: user.email });
    res.json({})

  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
