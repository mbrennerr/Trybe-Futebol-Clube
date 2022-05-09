import { Request, Response } from 'express';
import { ILogin } from '../Types';
import LoginService from '../services/LoginService';

export default class LoginController {
  public loginService ;

  constructor() {
    this.loginService = new LoginService();
  }

  public getByEmail = async (req:Request, res:Response) => {
    const { email, password }:ILogin = req.body;
    const user = await this.loginService.findUserByEmail(email, password);
    return res.status(200).json(user);
  };
}
