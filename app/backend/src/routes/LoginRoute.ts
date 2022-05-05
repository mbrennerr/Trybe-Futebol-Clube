import { Router } from 'express';
import LoginController from '../controller/LoginController';

const router:Router = Router();
const Controller = new LoginController();

router.post('/login', Controller.getByEmail);
export default router;
