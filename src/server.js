import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { schedulerJob } from "./job/scheduler.job.js";
import { env } from "./config/env.js";


connectDB()
    .then(() => {
        schedulerJob();

        app.listen(env.port, () => {
            console.log(`App is Listening on Port : ${env.port}`);
        })
    })
    .catch((err) => {
        console.log("MongoDB connection error ", err);
    })