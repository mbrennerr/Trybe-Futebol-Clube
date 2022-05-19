import { Router } from 'express';
import Validate from '../middlewares/Validate';
import MatchesController from '../controller/MatchesController';

const router:Router = Router();
const controller = new MatchesController();

router.get('/matches', controller.getAllMatches);
router.post('/matches', Validate.Token, controller.postMatch);
export default router;
