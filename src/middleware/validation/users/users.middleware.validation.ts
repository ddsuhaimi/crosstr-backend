import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../../../typeorm/entities/users/User';
import { CustomError } from '../../../utils/response/custom-error/CustomError';
import { ErrorValidation } from '../../../utils/response/custom-error/types';

export const validatorEdit = async (req: Request, res: Response, next: NextFunction) => {
  // let { name } = req.body;
  const id = req.params.id;
  const errorsValidation: ErrorValidation[] = [];
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(id);
  if (parseInt(id) !== 1) {
    errorsValidation.push({ id: `You dont have permission to change user with id ${id}` });
  }

  if (!user) {
    const customError = new CustomError(400, 'Validation', 'Edit user validation error', null, null, errorsValidation);
    return next(customError);
  }

  // if (user) {
  //   errorsValidation.push({ username: `Username '${username}' already exists` });
  // }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Edit user validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};
