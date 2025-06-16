import express from 'express';
import { auth } from '../middleware/auth';
import {
  createBooking,
  getBookings,
  updateBookingStatus
} from '../controllers/bookingController';

const router = express.Router();

router.post('/', auth, createBooking);
router.get('/', auth, getBookings);
router.put('/:id/status', auth, updateBookingStatus);

export default router; 