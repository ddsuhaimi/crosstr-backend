import { Router } from 'express';

import { addOne, deleteOne, editOne, getAll, getAllOwned, getOne } from '../../controllers/posts/posts.controller';
import { checkJwt } from '../../middleware/checkJwt';
import { checkRole } from '../../middleware/checkRole';
import { validatorEdit } from '../../middleware/validation/users/users.middleware.validation';

const router = Router();

router.get('/all', [checkJwt, checkRole(['ADMINISTRATOR'], true)], getAll);

router.get('/', [checkJwt, checkRole(['STANDARD'], true)], getAllOwned);

router.post('/', [checkJwt, checkRole(['STANDARD'])], addOne);

router.get('/:id([0-9]+)', [checkJwt, checkRole(['STANDARD'], true)], getOne);

router.patch('/:id([0-9]+)', [checkJwt, checkRole(['STANDARD'], true)], editOne);

router.delete('/:id([0-9]+)', [checkJwt, checkRole(['STANDARD'], true)], deleteOne);

export default router;
