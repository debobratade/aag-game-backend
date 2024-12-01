"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEntryStatus = void 0;
const joi_1 = __importDefault(require("joi"));
const entryModel_1 = __importDefault(require("../../../models/tournament/entryModel"));
// Enum for Entry Status
const EntryStatus = ['granted', 'pending', 'rejected'];
// Validation for request body
const statusValidationSchema = joi_1.default.object({
    status: joi_1.default.string()
        .valid(...EntryStatus)
        .required()
        .messages({
        'any.only': `Invalid status. Valid statuses are: ${EntryStatus.join(', ')}`,
        'any.required': 'Status is required.',
        'string.base': 'Status must be a string.',
    }),
});
const entryIdValidationSchema = joi_1.default.object({
    entryId: joi_1.default.number().integer().positive().required().messages({
        'number.base': 'Entry ID must be a number.',
        'number.integer': 'Entry ID must be an integer.',
        'number.positive': 'Entry ID must be a positive number.',
        'any.required': 'Entry ID is required.',
    }),
});
const updateEntryStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const entry = yield entryModel_1.default.findByPk(entryId);
        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        entry.status = status;
        yield entry.save();
        return res.status(200).json({
            message: 'Entry status updated successfully',
            entry,
        });
    }
    catch (error) {
        console.error('Error updating entry status:', error);
        return res.status(500).json({ message: 'An error occurred while updating the entry status.' });
    }
});
exports.updateEntryStatus = updateEntryStatus;
