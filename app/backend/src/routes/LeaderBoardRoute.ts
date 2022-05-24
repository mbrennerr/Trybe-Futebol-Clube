import { Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const router:Router = Router();
const controller = new LeaderBoardController();

router.get('/leaderboard/home', controller.getLeaderboardHome);
export default router;
