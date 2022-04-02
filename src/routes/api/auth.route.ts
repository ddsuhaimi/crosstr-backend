import { Router } from 'express';

import {
  login,
  register,
  changePassword,
  getUserBasedOnToken,
  refreshAccessToken,
  // refreshAccessToken,
} from '../../controllers/auth/auth.controller';
import { checkJwt } from '../../middleware/checkJwt';
import {
  validatorLogin,
  validatorRegister,
  validatorChangePassword,
} from '../../middleware/validation/auth/auth.middleware.validation';

const router = Router();

router.post('/login', [validatorLogin], login);
router.post('/refresh-token', refreshAccessToken);
router.post('/register', [validatorRegister], register);
router.post('/change-password', [checkJwt, validatorChangePassword], changePassword);
router.get('/me', [checkJwt], getUserBasedOnToken);

export default router;
