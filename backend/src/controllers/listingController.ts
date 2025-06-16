import { Request, Response } from 'express';
import { Listing } from '../models/Listing';

interface AuthRequest extends Request {
  user?: any;
}

export const getListings = async (req: Request, res: Response) => {
  try {
    const listings = await Listing.find().populate('host', 'name email');
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getListing = async (req: Request, res: Response) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('host', 'name email');
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createListing = async (req: AuthRequest, res: Response) => {
  try {
    const listing = new Listing({
      ...req.body,
      host: req.user._id
    });
    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateListing = async (req: AuthRequest, res: Response) => {
  try {
    const listing = await Listing.findOne({ _id: req.params.id, host: req.user._id });
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    Object.assign(listing, req.body);
    await listing.save();
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteListing = async (req: AuthRequest, res: Response) => {
  try {
    const listing = await Listing.findOneAndDelete({ _id: req.params.id, host: req.user._id });
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json({ message: 'Listing deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 