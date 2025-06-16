import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { listingsAPI, bookingsAPI } from '../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    coordinates: [number, number];
  };
  images: string[];
  amenities: string[];
  rating: number;
  host: {
    id: string;
    name: string;
    email: string;
  };
}

const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await listingsAPI.getById(id!);
      setProperty(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch property details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates');
      return;
    }

    try {
      setBookingLoading(true);
      await bookingsAPI.create({
        propertyId: id!,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests,
      });
      navigate('/bookings');
    } catch (err) {
      setError('Failed to create booking');
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <div>Loading property details...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <img
              src={property.images[0]}
              alt={property.title}
              className="object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {property.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.title} ${index + 2}`}
                className="object-cover rounded-lg aspect-w-1 aspect-h-1"
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <p className="text-gray-600 mb-4">{property.location.address}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{property.rating}</span>
          </div>

          <div className="border-t border-b py-4 my-4">
            <h2 className="text-xl font-semibold mb-2">About this place</h2>
            <p className="text-gray-600">{property.description}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Amenities</h2>
            <ul className="grid grid-cols-2 gap-2">
              {property.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">•</span>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Book your stay</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Check-in
                  </label>
                  <DatePicker
                    selected={checkIn}
                    onChange={setCheckIn}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    minDate={new Date()}
                    placeholderText="Select check-in date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Check-out
                  </label>
                  <DatePicker
                    selected={checkOut}
                    onChange={setCheckOut}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    minDate={checkIn || new Date()}
                    placeholderText="Select check-out date"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Guests
                </label>
                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">${property.price}</p>
                  <p className="text-gray-600">per night</p>
                </div>
                <button
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {bookingLoading ? 'Booking...' : 'Book now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail; 