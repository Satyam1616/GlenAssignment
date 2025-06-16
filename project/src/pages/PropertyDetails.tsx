import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { listingsAPI, bookingsAPI } from '../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MapPin, Users, Bed, Bath, Wifi, Parking, Pool } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  host: {
    id: string;
    name: string;
    email: string;
  };
}

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await listingsAPI.getListing(id!);
        setProperty(response.data);
      } catch (err) {
        setError('Failed to fetch property details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!checkIn || !checkOut) {
      setBookingError('Please select check-in and check-out dates');
      return;
    }

    try {
      const response = await bookingsAPI.createBooking({
        propertyId: id!,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests,
      });

      navigate(`/bookings`);
    } catch (err) {
      setBookingError('Failed to create booking. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading property details...</div>;
  }

  if (error || !property) {
    return <div className="text-red-600">{error}</div>;
  }

  const totalNights = checkIn && checkOut
    ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const totalPrice = totalNights * property.price;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Image Gallery */}
      <div className="relative h-[500px] mb-8">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {property.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-5 w-5 mr-1" />
            {property.location}
          </div>

          <div className="flex space-x-4 mb-6">
            <div className="flex items-center">
              <Bed className="h-5 w-5 mr-1 text-gray-600" />
              <span>{property.bedrooms} bedrooms</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-5 w-5 mr-1 text-gray-600" />
              <span>{property.bathrooms} bathrooms</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-1 text-gray-600" />
              <span>Up to {property.maxGuests} guests</span>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <p>{property.description}</p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  {amenity === 'wifi' && <Wifi className="h-5 w-5 mr-2 text-gray-600" />}
                  {amenity === 'parking' && <Parking className="h-5 w-5 mr-2 text-gray-600" />}
                  {amenity === 'pool' && <Pool className="h-5 w-5 mr-2 text-gray-600" />}
                  <span className="text-gray-600 capitalize">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6 sticky top-6">
            <div className="mb-4">
              <span className="text-2xl font-bold">${property.price}</span>
              <span className="text-gray-600"> / night</span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in
                  </label>
                  <DatePicker
                    selected={checkIn}
                    onChange={setCheckIn}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={new Date()}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholderText="Select date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out
                  </label>
                  <DatePicker
                    selected={checkOut}
                    onChange={setCheckOut}
                    selectsEnd
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={checkIn}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholderText="Select date"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {[...Array(property.maxGuests)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </div>

              {bookingError && (
                <div className="text-red-600 text-sm">{bookingError}</div>
              )}

              {totalNights > 0 && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span>${property.price} x {totalNights} nights</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBooking}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {user ? 'Book Now' : 'Sign in to Book'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails; 