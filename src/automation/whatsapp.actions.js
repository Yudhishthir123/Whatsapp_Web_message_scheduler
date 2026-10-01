const openChat = async (page, phone) => {
    await page.goto(
        `https://web.whatsapp.com/send?phone=${phone}`,
        {
            waitUntil: "domcontentloaded",
        }
    );
};

const typeMessage = async (page, message) => {
    const messageBox = page
        .locator('div[contenteditable="true"]')
        .last();

    await messageBox.waitFor({
        state: "visible",
        timeout: 30000,
    });

    await messageBox.fill(message);
};

const sendMessage = async (page) => {
    const sendButton = page.getByRole("button", {
        name: "Send",
    });

    await sendButton.waitFor({
        state: "visible",
        timeout: 30000,
    });

    await sendButton.click();

    // Allow WhatsApp Web to finish the send request before the service closes the page.
    await page.waitForTimeout(20000);
    await page.waitForFunction(() => {
        const boxes = document.querySelectorAll('div[contenteditable="true"]');
        const box = boxes[boxes.length - 1];
        return !box || box.textContent.trim() === "";
    }, null, { timeout: 10000 });
};

export {
    openChat,
    typeMessage,
    sendMessage,
};