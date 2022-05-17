import { Router } from 'express';
import TeamsController from '../controller/TeamsController';

const router:Router = Router();
const controller = new TeamsController();

router.get('/teams', controller.getAllTeams);
router.get('/teams/:id', controller.getById);
export default router;
