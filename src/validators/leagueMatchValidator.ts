import Joi from 'joi';

export const validateCreateMatch = Joi.object({
    team1Id: Joi.number().integer().required().messages({
        'number.base': '"team1Id" must be a number',
        'number.integer': '"team1Id" must be an integer',
        'any.required': '"team1Id" is required',
    }),
    team2Id: Joi.number().integer().required().messages({
        'number.base': '"team2Id" must be a number',
        'number.integer': '"team2Id" must be an integer',
        'any.required': '"team2Id" is required',
    }),
    start_time: Joi.date()
        .iso()
        .greater('now')
        .required()
        .messages({
            'date.base': '"start_time" must be a valid ISO date',
            'date.greater': '"start_time" must be in the future',
            'any.required': '"start_time" is required',
        }),
    end_time: Joi.date()
        .iso()
        .greater(Joi.ref('start_time'))
        .required()
        .messages({
            'date.base': '"end_time" must be a valid ISO date',
            'date.greater': '"end_time" must be after "start_time" and in the future',
            'any.required': '"end_time" is required',
        }),
    result: Joi.string().optional().messages({
        'string.base': '"result" must be a string',
    }),
});
