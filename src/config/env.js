import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const env = {
	port: Number(process.env.PORT) || 10000,
	host: process.env.HOST || "0.0.0.0",
	mongoUrl: process.env.MONGODB_URL || "",
	corsOrigin: process.env.CORS_ORIGIN || "",
	browserHeadless: process.env.BROWSER_HEADLESS !== "false",
	browserChannel: process.env.BROWSER_CHANNEL || "",
	whatsappSessionPath: process.env.WHATSAPP_SESSION_PATH || "./whatsapp-session",
};

export { env };
