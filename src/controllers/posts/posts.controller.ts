import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from '../../typeorm/entities/posts/Post';
import { User } from '../../typeorm/entities/users/User';
import { CustomError } from '../../utils/response/custom-error/CustomError';

// Admin route
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const postRepository = getRepository(Post);
  try {
    const post = await postRepository.find({});

    res.customSuccess(200, 'Post found', post);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

// Standard route
export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const postRepository = getRepository(Post);
  try {
    const post = await postRepository.findOne(id, {
      select: ['id', 'title', 'text', 'created_at', 'updated_at'],
    });

    if (!post) {
      const customError = new CustomError(404, 'General', `Post with id:${id} not found.`, ['User not found.']);
      return next(customError);
    }
    // res.customSuccess(200, 'Post found', post);
    res.json({})

  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

export const getAllOwned = async (req: Request, res: Response, next: NextFunction) => {
  const postRepository = getRepository(Post);
  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne(1);
    if (!user) {
      const customError = new CustomError(404, 'General', `User with id:${req.user.id} not found.`, [
        'User not found.',
      ]);
      return next(customError);
    }

    console.log('query bos', req.query);
    const post = await postRepository.find({ user: user });

    // res.customSuccess(200, 'Post found', post);
    res.json({})

  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

export const addOne = async (req: Request, res: Response, next: NextFunction) => {
  const { title, text } = req.body;

  const postRepository = getRepository(Post);
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOne(1);
    const newPost = new Post();
    newPost.title = title;
    newPost.text = text;
    if (user) {
      newPost.user = user;
    }
    await postRepository.save(newPost);

    // res.customSuccess(200, 'Post successfully created.');
    res.json({})

  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const postRepository = getRepository(Post);
  try {
    const post = await postRepository.findOne({ where: { id } });

    if (!post) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Post with id:${id} doesn't exists.`]);
      return next(customError);
    }
    postRepository.delete(id);

    // res.customSuccess(200, 'Post successfully deleted.', { id: post.id, title: post.title, text: post.text });
    res.json({})

  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

export const editOne = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { title, text } = req.body;

  const postRepository = getRepository(Post);
  try {
    const post = await postRepository.findOne({ where: { id } });

    if (!post) {
      const customError = new CustomError(404, 'General', `Post with id:${id} not found.`, ['Post not found.']);
      return next(customError);
    }

    post.title = title;
    post.text = text;

    try {
      await postRepository.save(post);
      // res.customSuccess(200, 'Post successfully saved.');
      res.json({})

    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Post '${post.id}' can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
