import ScheduledMessage from "../models/ScheduledMessage.models.js";
import { sendWhatsAppMessage } from "../services/message.service.js";

const processScheduledMessage = async () => {
    const now = new Date();

    // avoid multiple processes running at the same time
    while (true) {
        const schedule = await ScheduledMessage.findOneAndUpdate({
            status: "pending",
            scheduledAt: { $lte: now },
        }, {
            $set: {
                status: "processing",
            }
        }, {
            returnDocument: "after",
        });

        if (!schedule) {
            break;
        }

        try {
            await sendWhatsAppMessage(schedule.contact, schedule.message);
            schedule.status = "sent";
            schedule.executedAt = new Date();
            await schedule.save();
        } catch (error) {
            console.error(`Failed to send message for schedule ${schedule._id}:`, error);
            schedule.status = "failed";
            schedule.error = error.message;
            await schedule.save();
        }
    }

}

export { processScheduledMessage };