import { Router } from 'express';

import auth from './auth.route';
import posts from './posts.route';
import users from './users.route';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/posts', posts);

export default router;
