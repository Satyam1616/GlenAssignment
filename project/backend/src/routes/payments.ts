import express from 'express';
import { auth } from '../middleware/auth';
import { createPaymentIntent, confirmPayment } from '../controllers/paymentController';

const router = express.Router();

router.post('/create-intent', auth, createPaymentIntent);
router.post('/:paymentId/confirm', auth, confirmPayment);

export default router; 