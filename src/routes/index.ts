import { Router } from 'express';
import UserRouter from './Users';
import apiRouter from './api';

// Init router and path
const router = Router();

// Add sub-routes
// router.use('/users', UserRouter);
router.use('/api', apiRouter);

// Export the base-router
export default router;
