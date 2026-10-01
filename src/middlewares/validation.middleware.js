import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const validateMessage = (contact, message) => {
    if (typeof contact !== "string" || contact.trim() === "") {
        throw new ApiError(400, "Valid contact is required");
    }

    if (!/^[+\d\s().-]+$/.test(contact)) {
        throw new ApiError(400, "Contact must be a WhatsApp phone number with country code");
    }

    const phone = contact.replace(/\D/g, "");
    if (!/^\d{10,15}$/.test(phone)) {
        throw new ApiError(400, "Contact number must contain 10 to 15 digits");
    }

    if (typeof message !== "string" || message.trim() === "") {
        throw new ApiError(422, "Valid message is required");
    }
};

const validation = asyncHandler(async (req, res, next) => {
    const { contact, message, scheduledAt } = req.body;

    validateMessage(contact, message);

    if (typeof scheduledAt !== "string" || scheduledAt.trim() === "") {
        throw new ApiError(422, "Scheduled time is required");
    }

    const scheduledDate = new Date(scheduledAt);
    if (isNaN(scheduledDate.getTime())) {
        throw new ApiError(400, "Invalid date format");
    }

    const now = new Date();
    if (scheduledDate <= now) {
        throw new ApiError(400, "Scheduled time should be in Future");
    }

    next();
});

const messageValidation = asyncHandler(async (req, res, next) => {
    const { contact, message } = req.body;
    validateMessage(contact, message);
    next();
});

export { validation, messageValidation };