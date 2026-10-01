import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
	getBrowserStatus,
	connectWhatsApp,
	disconnectWhatsApp,
} from "../services/browser.service.js";

const browserStatus = asyncHandler(async (req, res) => {
	const status = await getBrowserStatus();
	res.status(200).json(new ApiResponse(200, status, "Browser status fetched"));
});

const connectBrowser = asyncHandler(async (req, res) => {
	const status = await connectWhatsApp();
	res.status(200).json(new ApiResponse(200, status, "WhatsApp connected"));
});

const disconnectBrowser = asyncHandler(async (req, res) => {
	const status = await disconnectWhatsApp();
	res.status(200).json(new ApiResponse(200, status, "WhatsApp disconnected"));
});

export { browserStatus, connectBrowser, disconnectBrowser };
