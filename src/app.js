import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const app = express();
import cors from "cors";
import { env } from "./config/env.js";
import ScheduleRouter from "./routes/schedule.routes.js";
import MessageRouter from "./routes/message.routes.js";
import BrowserRouter from "./routes/browser.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const allowedOrigins = [env.corsOrigin].filter(Boolean);

const isAllowedOrigin = (origin) => {
    if (!origin || allowedOrigins.includes(origin)) return true;

    try {
        const url = new URL(origin);
        return (
            (url.hostname === "localhost" || url.hostname === "127.0.0.1") &&
            url.protocol === "http:"
        );
    } catch {
        return false;
    }
};

app.use(
    cors({
        origin(origin, callback) {
            if (isAllowedOrigin(origin)) return callback(null, true);
            return callback(new Error("Origin is not allowed by CORS"));
        },
        credentials: true,
    }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.get("/health", (req, res) => {
    res.status(200).json({ success: true, message: "OK" });
});

app.use("/api/v1/schedules", ScheduleRouter);
app.use("/api/v1/messages", MessageRouter);
app.use("/api/v1/browser", BrowserRouter);

app.use(errorHandler);

export { app };