import { chromium } from "playwright";

let context = null;

const getBrowser = async () => {
    if (context && !context.isClosed()) {
        try {
            context.pages();
            return context;
        } catch (error) {
            context = null;
        }
    }

    context = await chromium.launchPersistentContext(
        "./whatsapp-session",
        {
            headless: false,
            channel: "chrome"
        }
    );

    return context;
};

const closeBrowser = async () => {
    if (!context) {
        return;
    }

    await context.close();
    context = null;
};

export {
    getBrowser,
    closeBrowser
};