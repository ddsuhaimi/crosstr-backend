import { Router } from 'express';

import { getAll, getOne, editOne, deleteOne } from '../../controllers/users/users.controller';
import { checkJwt } from '../../middleware/checkJwt';
import { checkRole } from '../../middleware/checkRole';
import { validatorEdit } from '../../middleware/validation/users/users.middleware.validation';

const router = Router();

router.get('/', [checkJwt, checkRole(['ADMINISTRATOR'])], getAll);

router.get('/:id([0-9]+)', [checkJwt, checkRole(['STANDARD'], true)], getOne);

router.patch('/:id([0-9]+)', [checkJwt, checkRole(['STANDARD'], true), validatorEdit], editOne);

router.delete('/:id([0-9]+)', [checkJwt, checkRole(['STANDARD'], true)], deleteOne);

export default router;
