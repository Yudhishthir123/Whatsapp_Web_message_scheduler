import { processScheduledMessage } from "../services/scheduler.service.js";
import cron from "node-cron";

const schedulerJob = async () => {

    cron.schedule("* * * * *", async () => {
        try {
            await processScheduledMessage();
        } catch (error) {
            console.error("Scheduler job error:", error);
        }
    })
}

export { schedulerJob };