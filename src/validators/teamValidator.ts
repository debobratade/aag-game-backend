import Joi from 'joi';

export const validateCreateTeam = Joi.object({
  name: Joi.string().min(1).max(100).required().messages({
    'string.base': '"name" must be a string',
    'string.empty': '"name" cannot be empty',
    'string.min': '"name" must be at least 1 character long',
    'string.max': '"name" must not exceed 100 characters',
    'any.required': '"name" is required',
  }),
  userId: Joi.number().integer().required().messages({
    'number.base': '"userId" must be a number',
    'number.integer': '"userId" must be an integer',
    'any.required': '"userId" is required',
  }),
});
