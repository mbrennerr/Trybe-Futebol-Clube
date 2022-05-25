import { Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const router:Router = Router();
const controller = new LeaderBoardController();

router.get('/leaderboard/home', controller.getLeaderboardHome);
router.get('/leaderboard/away', controller.getLeaderBoardAway);
router.get('/leaderboard', controller.getLeaderBoardGeneral);
export default router;
