import { ObjectSchema } from 'joi';

const validation = async <U>(schema:ObjectSchema<U>, body:U) => {
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
};

export default validation;
