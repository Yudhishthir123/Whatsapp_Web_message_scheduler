import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const env = {
	port: Number(process.env.PORT) || 10000,
	mongoUrl: process.env.MONGODB_URL || "",
	corsOrigin: process.env.CORS_ORIGIN || "",
};

export { env };
