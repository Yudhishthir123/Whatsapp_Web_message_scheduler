import mongoose from "mongoose";

const ExecutionLogSchema = new mongoose.Schema({
    scheduledMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ScheduledMessage",
        required: true,
    },

    status: {
        type: String,
        enum: ["processing", "sent", "failed"],
        required: true,
    },

    startedAt: {
        type: Date,
        default: Date.now,
    },

    completedAt: {
        type: Date,
    },

    error: {
        type: String,
    },
});

const ExecutionLog = mongoose.model("ExecutionLog", ExecutionLogSchema);

export default ExecutionLog;