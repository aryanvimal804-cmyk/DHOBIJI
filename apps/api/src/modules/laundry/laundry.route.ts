import { Router } from 'express';
import { getPendingOrders, updateOrderStatus, getAllOrders } from './laundry.controller';
import { authenticate, authorizeRole } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticate, authorizeRole(['LAUNDRY_PARTNER']));

router.get('/orders', getAllOrders);
router.get('/orders/pending', getPendingOrders);
router.patch('/orders/:id/status', updateOrderStatus);

export default router;
