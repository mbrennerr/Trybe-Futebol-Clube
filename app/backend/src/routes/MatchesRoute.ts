import { Router } from 'express';
import Validate from '../middlewares/Validate';
import MatchesController from '../controller/MatchesController';

const router:Router = Router();
const controller = new MatchesController();

router.get('/matches', controller.getAllMatches);
router.post('/matches', Validate.Token, controller.postMatch);
router.patch('/matches/:id/finish', controller.finishMatch);
router.patch('/matches/:id/', controller.updateMatch);
export default router;
