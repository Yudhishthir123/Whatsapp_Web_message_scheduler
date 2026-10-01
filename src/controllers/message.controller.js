import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendWhatsAppMessage } from "../services/message.service.js";

const sendMessage = asyncHandler(async (req, res) => {
    const { contact, message } = req.body;

    const result = await sendWhatsAppMessage(contact, message);

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Message sent successfully"));
});

export { sendMessage };