import * as Joi from 'joi';
import { EmailMsg, PswMsg } from '../../Utils';

export default class Schemas {
  public static get Login() {
    return Joi.object({
      email: Joi
        .string().email().not().empty()
        .required()
        .messages({
          'any.required': EmailMsg.requiredField,
          'string.email': EmailMsg.incorrectEmail,
          'string.base': EmailMsg.incorrectEmail,
          'string.empty': EmailMsg.requiredField,
        }),
      password: Joi
        .string().not().empty().required()
        .messages({
          'any.required': PswMsg.requiredField,
          'string.base': PswMsg.incorrectPsw,
          'string.empty': PswMsg.requiredField,

        }),
    });
  }
}
