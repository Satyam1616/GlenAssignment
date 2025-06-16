import mongoose from 'mongoose';
import { User } from '../models/User';
import { Listing } from '../models/Listing';
import { Booking } from '../models/Booking';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Listing.deleteMany({});
    await Booking.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const host = await User.create({
      name: 'John Host',
      email: 'host@example.com',
      password: 'password123',
      role: 'host'
    });

    const user = await User.create({
      name: 'Jane User',
      email: 'user@example.com',
      password: 'password123',
      role: 'user'
    });

    console.log('Created users');

    // Create listings
    const listings = await Listing.create([
      {
        title: 'Luxury Beach House',
        description: 'Beautiful beachfront property with ocean views',
        location: 'Miami Beach, FL',
        price: 250,
        images: ['https://example.com/beach-house-1.jpg'],
        host: host._id,
        amenities: ['Pool', 'WiFi', 'Kitchen'],
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        status: 'active'
      },
      {
        title: 'Downtown Apartment',
        description: 'Modern apartment in the heart of the city',
        location: 'New York, NY',
        price: 150,
        images: ['https://example.com/apartment-1.jpg'],
        host: host._id,
        amenities: ['Gym', 'Parking', 'Doorman'],
        bedrooms: 2,
        bathrooms: 1,
        maxGuests: 4,
        status: 'active'
      }
    ]);

    console.log('Created listings');

    // Create bookings
    const bookings = await Booking.create([
      {
        property: listings[0]._id,
        guest: user._id,
        checkIn: new Date('2024-03-01'),
        checkOut: new Date('2024-03-05'),
        guests: 2,
        totalAmount: 1000,
        status: 'confirmed'
      },
      {
        property: listings[1]._id,
        guest: user._id,
        checkIn: new Date('2024-04-01'),
        checkOut: new Date('2024-04-03'),
        guests: 1,
        totalAmount: 300,
        status: 'pending'
      }
    ]);

    console.log('Created bookings');
    console.log('Seed data completed successfully');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
  }
};

// Run the seed function
seedData(); 