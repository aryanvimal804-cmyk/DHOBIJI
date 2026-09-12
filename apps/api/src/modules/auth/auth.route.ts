import { Router } from 'express';
import { requestOtp, verifyOtp } from './auth.controller';

const router = Router();

router.post('/login', requestOtp);
router.post('/verify-otp', verifyOtp);

export default router;
