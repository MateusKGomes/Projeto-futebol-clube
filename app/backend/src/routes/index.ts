import { Router } from 'express';
import teamRouter from './TeamRoute';
import userRoute from './UserRoute';
import matchesRoute from './MatchesRoute';
import leaderboardsRouter from './ResultsRoute';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRoute);
router.use('/matches', matchesRoute);
router.use('/leaderboard', leaderboardsRouter);

export default router;
