import { Request, Response, NextFunction } from 'express';
import { IErrorMap } from '../Types';

export const ErrorMap:IErrorMap = {
  badRequest: 400,
  notFound: 404,
  invalidInput: 422,
  conflict: 409,
};

export default (err:Error, _req:Request, res:Response, _next:NextFunction) => {
  const { name } = err;
  const status:number = ErrorMap[name];
  console.log('middleware', name);
  if (!status) {
    return res.status(500).json({ error: 'Server error' });
  }
  res.status(status).json({ error: err.message });
};
