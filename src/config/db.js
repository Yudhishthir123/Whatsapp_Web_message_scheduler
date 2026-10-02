import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { env } from "./env.js";

const connectDB = async () => {
    if (!env.mongoUrl) {
        throw new Error("MONGODB_URL is not configured");
    }

    const connectionInstance = await mongoose.connect(env.mongoUrl, { dbName: DB_NAME });
    console.log(`MongoDB connected successfully !! HOST : ${connectionInstance.connection.host}`);
};

export { connectDB };