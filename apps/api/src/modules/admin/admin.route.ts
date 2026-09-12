import { Router } from 'express';
import { getDashboardStats, getLaundries, getDeliveryPartners, getOrders } from './admin.controller';

const router = Router();

router.get('/stats', getDashboardStats);
router.get('/laundries', getLaundries);
router.get('/delivery-partners', getDeliveryPartners);
router.get('/orders', getOrders);

export default router;
