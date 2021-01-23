import * as Joi from 'joi';

export default (data: object) => {
  const schema = Joi.object({
    provider: Joi.string().required(),
  });
  return schema.validate(data);
};
