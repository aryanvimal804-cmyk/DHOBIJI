import { Router } from 'express';
import { createPaymentIntent, verifyPaymentWebhook } from './payments.controller';

const router = Router();

router.post('/intent', createPaymentIntent);
router.post('/webhook', verifyPaymentWebhook);

export default router;
