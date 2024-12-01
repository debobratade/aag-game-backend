import * as Joi from 'joi';

// Validation schema for creating a new league
export const validateCreateLeague = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.base': 'name should be a type of text',
    'string.empty': 'name cannot be empty',
    'string.min': 'name should have at least 3 characters',
    'string.max': 'name should not exceed 100 characters',
    'any.required': 'name is a required field',
  }),
  entry_fee: Joi.number().positive().precision(2).required().messages({
    'number.base': 'entry_fee must be a valid number',
    'number.positive': 'entry_fee must be a positive number',
    'number.precision': 'entry_fee must have up to 2 decimal places',
    'any.required': 'entry_fee is a required field',
  }),
  start_time: Joi.date().iso().min('now').required().messages({
    'date.base': 'start_time must be a valid date',
    'date.iso': 'start_time must be in ISO 8601 format',
    'date.min': 'start_time must not be in the past',
    'any.required': 'start_time is a required field',
  }),
  end_time: Joi.date().iso().greater(Joi.ref('start_time')).required().messages({
    'date.base': 'end_time must be a valid date',
    'date.iso': 'end_time must be in ISO 8601 format',
    'date.greater': 'end_time must be later than start_time',
    'any.required': 'end_time is a required field',
  }),
});



//  validating query parameters
export const validateGetLeaguesQuery = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
  name: Joi.string().optional(),
  sortBy: Joi.string().valid('start_time', 'end_time', 'name').optional(),
  order: Joi.string().valid('ASC', 'DESC').optional(),
});