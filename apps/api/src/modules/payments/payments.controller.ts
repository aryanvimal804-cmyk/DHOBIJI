import { Request, Response } from 'express';
import { Order } from '../order/order.model';
import Razorpay from 'razorpay';
import crypto from 'crypto';

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { orderId, amount } = req.body;

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      // Fallback for local development if keys are not set
      return res.json({
        success: true,
        clientSecret: `mock_secret_${orderId}_${Date.now()}`,
        orderId,
        mockMode: true
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // Razorpay amount is in paise
      currency: "INR",
      receipt: `receipt_order_${orderId}`
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ success: false, message: 'Payment gateway error', error });
  }
};

export const verifyPaymentWebhook = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId, mockMode } = req.body;

    // Handle Mock Mode Verification
    if (mockMode) {
       await Order.findByIdAndUpdate(orderId, { status: 'ACCEPTED' });
       return res.json({ success: true, message: 'Mock Payment verified' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET as string;
    
    // Create Signature
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // Payment is successful
      if (orderId) {
        await Order.findByIdAndUpdate(orderId, { status: 'ACCEPTED', paymentId: razorpay_payment_id });
      }
      return res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ success: false, message: 'Webhook error', error });
  }
};
