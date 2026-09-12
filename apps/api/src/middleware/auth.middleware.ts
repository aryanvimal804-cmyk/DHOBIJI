import { Request, Response, NextFunction } from 'express';

// Extend Express Request to include user context
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; role: string };
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    // For development/demo: Mock a user if no token is provided
    req.user = { userId: 'mock-customer-id', role: 'CUSTOMER' };
    return next();
  }

  try {
    // Mock JWT decoding (In production, use jwt.verify)
    const decodedPayload = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    req.user = decodedPayload;
    next();
  } catch (error) {
    // Fallback to mock user for dev demo
    req.user = { userId: 'mock-customer-id', role: 'CUSTOMER' };
    next();
  }
};

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // DEV BYPASS: Allow all roles to access everything for UI demo purposes
    next();
  };
};
