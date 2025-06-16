import { Request, Response } from 'express';
import { Booking } from '../models/Booking';
import { Listing } from '../models/Listing';

interface AuthRequest extends Request {
  user?: any;
}

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { propertyId, checkIn, checkOut, guests } = req.body;

    // Check if property exists
    const property = await Listing.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Calculate total amount
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = nights * property.price;

    const booking = new Booking({
      property: propertyId,
      guest: req.user._id,
      checkIn,
      checkOut,
      guests,
      totalAmount
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ guest: req.user._id })
      .populate('property')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is the host of the property
    const property = await Listing.findById(booking.property);
    if (property?.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 