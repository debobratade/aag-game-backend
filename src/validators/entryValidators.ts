import Joi from "joi";

// Validate the tournamentId and userId for entry
export const validateEntryInputs = (tournamentId: any, userId: any) => {
    const schema = Joi.object({
        tournamentId: Joi.number().integer().positive().required().messages({
            'number.base': '"tournamentId" should be a number',
            'number.integer': '"tournamentId" should be an integer',
            'number.positive': '"tournamentId" should be a positive number',
            'any.required': '"tournamentId" is required'
        }),
        userId: Joi.number().integer().positive().required().messages({
            'number.base': '"userId" should be a number',
            'number.integer': '"userId" should be an integer',
            'number.positive': '"userId" should be a positive number',
            'any.required': '"userId" is required'
        })
    });

    return schema.validate({ tournamentId, userId });
};