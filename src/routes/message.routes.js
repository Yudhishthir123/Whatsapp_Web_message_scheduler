import { Router } from 'express';
import { sendMessage } from '../controllers/message.controller.js';
import { messageValidation } from '../middlewares/validation.middleware.js';

const router = Router();

router.post('/send', messageValidation, sendMessage);

export default router;
