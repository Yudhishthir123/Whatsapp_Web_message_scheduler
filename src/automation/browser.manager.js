import { chromium } from "playwright";
import { env } from "../config/env.js";

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

    const browserOptions = {
        headless: env.browserHeadless,
    };

    if (env.browserChannel) {
        browserOptions.channel = env.browserChannel;
    }

    context = await chromium.launchPersistentContext(env.whatsappSessionPath, browserOptions);

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