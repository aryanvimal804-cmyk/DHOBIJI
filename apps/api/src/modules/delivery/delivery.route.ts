import { Router } from 'express';
import { getAssignments, acceptAssignment, getActiveDelivery, updateDeliveryStatus } from './delivery.controller';
import { authenticate, authorizeRole } from '../../middleware/auth.middleware';

const router = Router();

router.use(authenticate, authorizeRole(['DELIVERY_PARTNER']));

router.get('/assignments', getAssignments);
router.patch('/assignments/:id/accept', acceptAssignment);
router.get('/active', getActiveDelivery);
router.patch('/:id/status', updateDeliveryStatus);

export default router;
