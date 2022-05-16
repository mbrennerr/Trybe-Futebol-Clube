import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../Types';
import LoginService from '../services/LoginService';

export default class LoginController {
  public loginService ;

  constructor() {
    this.loginService = new LoginService();
  }

  public getByEmail = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const { email, password }:ILogin = req.body;
      const user = await this.loginService.findUserByEmail(email, password);
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  };

  public returnUserRole = async (req:Request, res:Response, _next:NextFunction) => {
    console.log('role');
    console.log('meu Locals', res.locals);
    const { role } = res.locals.user;
    return res.status(200).json(role);
  };
}
