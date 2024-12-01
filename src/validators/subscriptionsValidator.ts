import Joi from "joi";

export const subscriptionSchemaToCreate = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.base": "Name must be a string.",
            "string.empty": "Name is required.",
            "string.min": "Name must be at least 3 characters.",
            "string.max": "Name must not exceed 100 characters.",
            "any.required": "Name is required.",
        }),
    features: Joi.array()
        .items(Joi.string().trim().min(3).max(100))
        .min(1)
        .required()
        .messages({
            "array.base": "Features must be an array of strings.",
            "array.min": "At least one feature is required.",
            "string.base": "Each feature must be a string.",
            "string.empty": "Features cannot be empty.",
            "string.min": "Each feature must be at least 3 characters.",
            "string.max": "Each feature must not exceed 100 characters.",
            "any.required": "Features are required.",
        }),
    price: Joi.number()
        .positive()
        .required()
        .messages({
            "number.base": "Price must be a number.",
            "number.positive": "Price must be a positive number.",
            "any.required": "Price is required.",
        }),
});


// validating request body
export const subscriptionSchema = Joi.object({
    userId: Joi.number().integer().required().messages({
      "any.required": "User ID is required.",
      "number.base": "User ID must be a number.",
      "number.integer": "User ID must be an integer."
    }),
    subscriptionId: Joi.number().integer().required().messages({
      "any.required": "Subscription ID is required.",
      "number.base": "Subscription ID must be a number.",
      "number.integer": "Subscription ID must be an integer."
    }),
  });