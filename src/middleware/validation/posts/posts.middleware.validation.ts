import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from '../../../typeorm/entities/posts/Post';
import { CustomError } from '../../../utils/response/custom-error/CustomError';
import { ErrorValidation } from '../../../utils/response/custom-error/types';

export const validatorEdit = async (req: Request, res: Response, next: NextFunction) => {
  //   let { title, text } = req.body;
  //   const errorsValidation: ErrorValidation[] = [];
  //   const postRepository = getRepository(Post);

  //   title = !title ? '' : title;
  //   text = !text ? '' : text;

  //   const post = await postRepository.findOne({ title: title });
  //   if (post) {
  //     errorsValidation.push({ username: `Username '${username}' already exists` });
  //   }

  //   if (errorsValidation.length !== 0) {
  //     const customError = new CustomError(400, 'Validation', 'Edit user validation error', null, null, errorsValidation);
  //     return next(customError);
  //   }
  return next();
};
