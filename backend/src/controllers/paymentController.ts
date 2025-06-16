import { Request, Response } from 'express';
import Stripe from 'stripe';
import { Payment } from '../models/Payment';
import { Booking } from '../models/Booking';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

interface AuthRequest extends Request {
  user?: any;
}

export const createPaymentIntent = async (req: AuthRequest, res: Response) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: booking.totalAmount * 100, // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Create payment record
    const payment = new Payment({
      booking: bookingId,
      amount: booking.totalAmount,
      paymentMethod: 'stripe',
      paymentIntentId: paymentIntent.id
    });

    await payment.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
};

export const confirmPayment = async (req: AuthRequest, res: Response) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    payment.status = 'completed';
    await payment.save();

    // Update booking status
    const booking = await Booking.findById(payment.booking);
    if (booking) {
      booking.status = 'confirmed';
      await booking.save();
    }

    res.json({ message: 'Payment confirmed successfully' });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({ message: 'Payment confirmation failed' });
  }
}; 