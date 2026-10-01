import mongoose from "mongoose";

const ScheduledMessageSchema = new mongoose.Schema({
    contact: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    scheduledAt: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "processing", "sent", "failed", "cancelled"],
        default: "pending"
    },
    executedAt: {
        type: Date,
    },
    deletedAt: {
        type: Date,
    },
    error: {
        type: String,
    }
}, {
    timestamps: true
});

const ScheduledMessage = mongoose.model("ScheduledMessage", ScheduledMessageSchema);
export default ScheduledMessage;