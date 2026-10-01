import { getBrowser, closeBrowser } from "../automation/browser.manager.js";
import { getWhatsAppSession } from "../automation/whatsapp.session.js";

const getBrowserStatus = async () => {
	const context = await getBrowser();
	return {
		connected: context.pages().length > 0,
		pages: context.pages().length,
	};
};

const connectWhatsApp = async () => {
	const page = await getWhatsAppSession();
	try {
		return { connected: true };
	} finally {
		await page.close().catch(() => {});
	}
};

const disconnectWhatsApp = async () => {
	await closeBrowser();
	return { connected: false, pages: 0 };
};

export { getBrowserStatus, connectWhatsApp, disconnectWhatsApp };
