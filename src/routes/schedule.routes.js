import { Router } from "express";
import {
    createSchedule,
    getSchedule,
    getScheduleById,
    deleteSchedule
} from "../controllers/schedule.controller.js";
import { validation } from "../middlewares/validation.middleware.js";
const router = Router();

router.post("/", validation, createSchedule);
router.get("/", getSchedule);
router.get("/:id", getScheduleById);
router.delete("/:id", deleteSchedule);

export default router;