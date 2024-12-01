import Joi from "joi";


export const matchValidationSchemaForTournament = Joi.object({
    team1Id: Joi.number().integer().positive().required().messages({
        'number.base': 'Team1 ID must be a positive number.',
        'number.integer': 'Team1 ID must be an integer.',
        'any.required': 'Team1 ID is required.',
    }),
    team2Id: Joi.number().integer().positive().required().messages({
        'number.base': 'Team2 ID must be a positive number.',
        'number.integer': 'Team2 ID must be an integer.',
        'any.required': 'Team2 ID is required.',
    }),
    start_time: Joi.date().iso().required().messages({
        'date.base': 'Start time must be a valid date.',
        'any.required': 'Start time is required.',
        'date.format': 'Start time must be in ISO 8601 format.',
    }),
    end_time: Joi.date().iso().required().greater(Joi.ref('start_time')).messages({
        'date.base': 'End time must be a valid date.',
        'any.required': 'End time is required.',
        'date.format': 'End time must be in ISO 8601 format.',
        'date.greater': 'End time must be later than start time.',
    }),
});


export const tournamentIdValidationSchema = Joi.object({
    tournamentId: Joi.number().integer().positive().required().messages({
        'number.base': 'Tournament ID must be a positive number.',
        'number.integer': 'Tournament ID must be an integer.',
        'any.required': 'Tournament ID is required.',
    }),
});



export const matchIdValidationSchema = Joi.object({
    matchId: Joi.number().integer().positive().required().messages({
        'number.base': 'Match ID must be a positive number.',
        'number.integer': 'Match ID must be an integer.',
        'any.required': 'Match ID is required.',
    }),
});


export const resultValidationSchema = Joi.object({
    result: Joi.string().trim().min(3).required().messages({
        'string.base': 'Result must be a string.',
        'string.empty': 'Result cannot be empty.',
        'string.min': 'Result must be at least 3 characters long.',
        'any.required': 'Result is required.',
    }),
});