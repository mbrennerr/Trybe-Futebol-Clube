import * as Joi from 'joi';

export default class Schemas {
  public static get Login() {
    return Joi.object({
      email: Joi
        .string()
        .email()
        .not()
        .empty()
        .required(),
      password: Joi
        .string()
        .not()
        .empty()
        .required(),
    });
  }
}
