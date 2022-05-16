import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { JwtPayload } from 'jsonwebtoken';
import Schemas from '../controller/schemas/Schemas';
import { Token } from '../Utils';

export default class Validate {
  private static token = Token;

  public static async Login(req:Request, res:Response, next:NextFunction) {
    try {
      await Validate.validation(Schemas.Login, req.body);

      return next();
    } catch (error) {
      console.error('Validate.Login', error);
      next(error);
    }
  }

  public static async Token(req:Request, res:Response, next:NextFunction) {
    const { authorization } = req.headers;
    try {
      if (!authorization) {
        throw new Error('Token not Found');
      }

      const payload:JwtPayload = await Validate.token.verifyToken(authorization);
      res.locals.user = payload;
      console.log('Meu Payload Favorito', payload);
      return next(); /* deixa o  payload acessível pelo res das rotas */
    } catch (error) {
      next(error);
    }
  }

  private static async validation(schema:ObjectSchema, body:unknown) {
    const { error } = await schema.validate(body);

    if (error) {
      // const [{type, message}] = error.details;
      // const {type,message} = error.details[0];
      const errorType = error.details[0].type;
      const errorMessage = error.details[0].message;
      const unauthorized = { name: 'Unauthorized', message: errorMessage };
      const invalidInput = { name: 'invalidInput', message: errorMessage };
      console.log('validate.validation', error);
      if (errorType === 'any.required' || errorType === 'string.empty') {
        throw (unauthorized as unknown);
      }

      throw (invalidInput as unknown);
    }
  }
}
