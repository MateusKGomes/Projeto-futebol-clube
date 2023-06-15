import { Router } from 'express';
import teamRouter from './TeamRoute';
import userRoute from './UserRoute';
import matchesRoute from './MatchesRoute';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRoute);
router.use('/matches', matchesRoute);

export default router;
