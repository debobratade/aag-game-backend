import { Request, Response } from 'express';
import Joi from 'joi';
import Entry from '../../../models/tournament/entryModel';


// Enum for Entry Status
const EntryStatus = ['granted', 'pending', 'rejected'] as const;
type EntryStatusType = typeof EntryStatus[number];

// Validation for request body
const statusValidationSchema = Joi.object({
    status: Joi.string()
        .valid(...EntryStatus)
        .required()
        .messages({
            'any.only': `Invalid status. Valid statuses are: ${EntryStatus.join(', ')}`,
            'any.required': 'Status is required.',
            'string.base': 'Status must be a string.',
        }),
});

const entryIdValidationSchema = Joi.object({
    entryId: Joi.number().integer().positive().required().messages({
        'number.base': 'Entry ID must be a number.',
        'number.integer': 'Entry ID must be an integer.',
        'number.positive': 'Entry ID must be a positive number.',
        'any.required': 'Entry ID is required.',
    }),
});

export const updateEntryStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const { error: entryIdError } = entryIdValidationSchema.validate(req.params);
        if (entryIdError) {
            return res.status(400).json({ message: entryIdError.details[0].message });
        }

        const { error: statusError } = statusValidationSchema.validate(req.body);
        if (statusError) {
            return res.status(400).json({ message: statusError.details[0].message });
        }

        const { entryId } = req.params;
        const { status } = req.body;

        const entry = await Entry.findByPk(entryId);
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        
        entry.status = status;
        await entry.save();

        return res.status(200).json({
            message: 'Entry status updated successfully',
            entry,
        });
    } catch (error: any) {
        console.error('Error updating entry status:', error);
        return res.status(500).json({ message: 'An error occurred while updating the entry status.' });
    }
};
