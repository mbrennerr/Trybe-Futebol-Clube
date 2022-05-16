import { Router } from 'express';
import Validate from '../middlewares/Validate';
import LoginController from '../controller/LoginController';

const router:Router = Router();
const Controller = new LoginController();

router.post('/login', Validate.Login, Controller.getByEmail);
export default router;

router.get('/login/validate', Validate.Token, Controller.returnUserRole);
