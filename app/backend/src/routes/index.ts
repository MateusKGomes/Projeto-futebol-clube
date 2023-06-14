import { Router } from 'express';
import teamRouter from './TeamRoute';
import userRoute from './UserRoute';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRoute);

export default router;
