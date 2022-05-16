import { Request, Response, NextFunction } from 'express';
import { IErrorMap } from '../Types';

export const ErrorMap:IErrorMap = {
  // badRequest: 400,
  Unauthorized: 400,
  notFound: 404,
  invalidInput: 401,
  conflict: 409,
  TokenExpiredError: 401,

};

export default (err:Error, _req:Request, res:Response, _next:NextFunction) => {
  const { name } = err;
  const status:number = ErrorMap[name];
  console.log('Middleware', err);
  if (!status) {
    return res.status(500).json({ message: 'Server error' });
  }
  res.status(status).json({ message: err.message });
};
