import { getBrowser } from "./browser.manager.js";
import { ApiError } from "../utils/ApiError.js";

const getWhatsAppSession = async () => {
    const context = await getBrowser();
    const page = await context.newPage();

    await page.goto("https://web.whatsapp.com");
    await page.waitForTimeout(5000);

    const isLoggedIn = await page.locator('[data-testid = "chat-list"]').count();

    if (isLoggedIn === 0) {
        throw new ApiError(400, "WhatsApp Web is not Logged in");
    }

    return page;
}

export { getWhatsAppSession };