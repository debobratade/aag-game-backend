import Joi from "joi";

// Validator to create tournament
export const tournamentCreateValidator = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    entry_fee: Joi.number().min(0).optional(),
    start_time: Joi.date().iso().required(),
    end_time: Joi.date().iso().greater(Joi.ref('start_time')).required(),
    prize_distribution: Joi.object({
        "1st_place": Joi.string().optional(),
        "2nd_place": Joi.string().optional(),
        "3rd_place": Joi.string().optional(),
    }).optional(),
});

// Validator to update tournament
export const tournamentUpdateValidator = Joi.object({
    name: Joi.string().optional(),  // Allow name to be optional, but validate if provided
    description: Joi.string().optional(),
    entry_fee: Joi.number().optional(),
    start_time: Joi.date().iso().optional(),
    end_time: Joi.date().iso().optional(),
    prize_distribution: Joi.object({
      "1st_place": Joi.number().optional(),
      "2nd_place": Joi.number().optional(),
      "3rd_place": Joi.number().optional()
    }).optional(),
  });