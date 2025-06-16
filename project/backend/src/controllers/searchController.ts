import { Request, Response } from 'express';
import { Listing } from '../models/Listing';

export const searchListings = async (req: Request, res: Response) => {
  try {
    const {
      location,
      minPrice,
      maxPrice,
      startDate,
      endDate,
      guests,
      amenities,
      bedrooms,
      bathrooms
    } = req.query;

    // Build query
    const query: any = { status: 'active' };

    // Location search
    if (location) {
      query.$or = [
        { location: { $regex: location, $options: 'i' } },
        { title: { $regex: location, $options: 'i' } }
      ];
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Date availability
    if (startDate && endDate) {
      query.availability = {
        $elemMatch: {
          startDate: { $lte: new Date(startDate as string) },
          endDate: { $gte: new Date(endDate as string) }
        }
      };
    }

    // Guest capacity
    if (guests) {
      query.maxGuests = { $gte: Number(guests) };
    }

    // Amenities
    if (amenities) {
      const amenitiesList = (amenities as string).split(',');
      query.amenities = { $all: amenitiesList };
    }

    // Bedrooms and bathrooms
    if (bedrooms) query.bedrooms = { $gte: Number(bedrooms) };
    if (bathrooms) query.bathrooms = { $gte: Number(bathrooms) };

    // Execute query
    const listings = await Listing.find(query)
      .populate('host', 'name email')
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Search failed' });
  }
}; 