import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import Schemas from '../controller/schemas/Schemas';

export default class Validate {
  public static async Login(req:Request, res:Response, next:NextFunction) {
    try {
      await Validate.validation(Schemas.Login, req.body);

      return next();
    } catch (error) {
      console.error('Validate', error);
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
      const badRequest = { name: 'badRequest', message: errorMessage };
      const invalidInput = { name: 'invalidInput', message: errorMessage };
      // console.log('validation', error);
      if (errorType === 'any.required') throw (badRequest as unknown);

      throw (invalidInput as unknown);
    }
  }
}
