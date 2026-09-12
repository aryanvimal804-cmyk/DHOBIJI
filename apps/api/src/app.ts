import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';

const app: Express = express();

// Global Middlewares
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Basic Health Check Route
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'DhobiGo API is running',
    timestamp: new Date().toISOString()
  });
});

import authRoutes from './modules/auth/auth.route';
import customerRoutes from './modules/customer/customer.route';
import laundryRoutes from './modules/laundry/laundry.route';
import deliveryRoutes from './modules/delivery/delivery.route';
import paymentsRoutes from './modules/payments/payments.route';
import adminRoutes from './modules/admin/admin.route';

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/laundry', laundryRoutes);
app.use('/api/v1/delivery', deliveryRoutes);
app.use('/api/v1/payments', paymentsRoutes);
app.use('/api/v1/admin', adminRoutes);

export default app;
