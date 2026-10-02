import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const env = {
	host: process.env.HOST || "0.0.0.0",
	port: Number(process.env.PORT) || 3000,
	mongoUrl: process.env.MONGODB_URL || process.env.MONGODB_URI || "",
	corsOrigin: process.env.CORS_ORIGIN || "",
	browserHeadless: process.env.BROWSER_HEADLESS === "true",
	browserChannel: process.env.BROWSER_CHANNEL || (process.platform === "win32" ? "chrome" : ""),
	whatsappSessionPath: process.env.WHATSAPP_SESSION_PATH || "./whatsapp-session",
};

export { env };
