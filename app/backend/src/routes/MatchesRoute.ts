import { Router } from 'express';
import MatchesController from '../controller/MatchesController';

const router:Router = Router();
const controller = new MatchesController();

router.get('/matches', controller.getAllMatches);
export default router;
