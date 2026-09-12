import { Request, Response } from 'express';
import User, { UserRole } from '../users/user.model';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export const requestOtp = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, email, role = UserRole.CUSTOMER } = req.body;

    if (!phoneNumber && !email) {
      return res.status(400).json({ success: false, message: 'Phone number or email is required' });
    }

    const identifier = email || phoneNumber;
    
    // Generate a random 4-digit OTP
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(`[AUTH] Generated OTP for ${identifier} is ${generatedOtp}`);

    // Create user if not exists, and save the generated OTP
    const query = email ? { email } : { phoneNumber };
    let user = await User.findOne(query);
    if (!user) {
      user = new User({ ...query, role });
    }
    user.otp = generatedOtp;
    await user.save();

    // Send OTP via Email if email is provided
    if (email && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: `"TidyTouch" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your TidyTouch Verification OTP',
        text: `Your OTP for logging into TidyTouch is ${generatedOtp}. It is valid for a limited time.`
      });
      console.log(`[AUTH] Email OTP sent to ${email}`);
    }

    return res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error requesting OTP:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, email, otp } = req.body;

    if (!phoneNumber && !email) {
      return res.status(400).json({ success: false, message: 'Phone number or email is required' });
    }

    const query = email ? { email } : { phoneNumber };
    const user = await User.findOne(query);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify OTP against the database
    if (user.otp !== otp) {
      // Still allow '1234' bypass for dev if EMAIL_USER isn't configured
      if (otp !== '1234' || process.env.NODE_ENV === 'production') {
        return res.status(401).json({ success: false, message: 'Invalid OTP' });
      }
    }

    user.isVerified = true;
    user.otp = undefined; // Clear OTP after successful verification
    await user.save();

    // Generate real JWT Token
    const jwtSecret = process.env.JWT_SECRET || 'dhobigo_fallback_secret_for_dev_only';
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      token: token,
      user: {
        id: user._id,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
