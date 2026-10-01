import ScheduledMessage from "../models/ScheduledMessage.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createSchedule = asyncHandler(async (req, res) => {
    const { contact, message, scheduledAt } = req.body;

    const scheduledMessage = await ScheduledMessage.create({
        contact,
        message,
        scheduledAt
    });

    return res
        .status(201)
        .json(new ApiResponse(201, scheduledMessage, "Message scheduled successfully"));

});

const getSchedule = asyncHandler(async (req, res) => {
    const schedule = await ScheduledMessage.find({ status: { $ne: "cancelled" } }).sort({ scheduledAt: 1 });

    return res
        .status(200)
        .json(new ApiResponse(200, schedule, "Message schedule found"));

});

const getScheduleById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const schedule = await ScheduledMessage.findById(id);

    if (!schedule) {
        throw new ApiError(404, "Schedule not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, schedule, "Message Schedule found"));
});

const deleteSchedule = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const schedule = await ScheduledMessage.findById(id);
    if (!schedule) {
        throw new ApiError(404, "Schedule not found");
    }

    schedule.status = "cancelled";
    schedule.deletedAt = new Date();
    await schedule.save();

    return res
        .status(200)
        .json(new ApiResponse(200, schedule, "Schedule removed from your view"));
});

export {
    createSchedule,
    getSchedule,
    getScheduleById,
    deleteSchedule
};