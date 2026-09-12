import { Router } from 'express';
import { getNearbyLaundries, placeOrder, getOrders } from './customer.controller';
import { authenticate, authorizeRole } from '../../middleware/auth.middleware';

const router = Router();

// Public routes (or could be protected depending on requirement)
router.get('/laundries', getNearbyLaundries);

// Protected routes for Customers
router.post('/orders', authenticate, authorizeRole(['CUSTOMER']), placeOrder);
router.get('/orders', authenticate, authorizeRole(['CUSTOMER']), getOrders);

export default router;
