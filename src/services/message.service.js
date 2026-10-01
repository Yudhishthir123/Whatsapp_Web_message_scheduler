import { getWhatsAppSession } from '../automation/whatsapp.session.js';
import { ApiError } from '../utils/ApiError.js';
import {
    openChat,
    typeMessage,
    sendMessage
} from "../automation/whatsapp.actions.js";

const sendWhatsAppMessage = async (contact, message) => {
    if (!contact || !message) {
        throw new ApiError(400, "Contact and message are required");
    }

    // keeps digits only from the contact string
    const contactValue = String(contact).trim();
    if (!/^[+\d\s().-]+$/.test(contactValue)) {
        throw new ApiError(400, "Contact must be a WhatsApp phone number with country code");
    }

    const phone = contactValue.replace(/\D/g, "");

    if (!/^\d{10,15}$/.test(phone)) {
        throw new ApiError(400, "Invalid contact number. It should contain only digits and be between 10 to 15 digits long.");
    }

    let page;

    try {
        page = await getWhatsAppSession();
        await openChat(page, phone);

        await typeMessage(page, message);

        await sendMessage(page);

        return {
            success: true,
            contact: phone,
            message: "Whatsapp message sent successfully",
        }
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(500, "Failed to send WhatsApp message: " + error.message);
    } finally {
        if (page) {
            await page.close().catch(() => {});
        }
    }

}

export { sendWhatsAppMessage };