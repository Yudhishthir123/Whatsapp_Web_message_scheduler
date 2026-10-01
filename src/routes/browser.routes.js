import { Router } from "express";
import {
	browserStatus,
	connectBrowser,
	disconnectBrowser,
} from "../controllers/browser.controller.js";

const router = Router();

router.get("/status", browserStatus);
router.post("/connect", connectBrowser);
router.post("/disconnect", disconnectBrowser);

export default router;
