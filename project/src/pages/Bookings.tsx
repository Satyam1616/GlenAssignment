import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingsAPI } from '../services/api';
import { Calendar, MapPin, DollarSign, Clock } from 'lucide-react';

interface Booking {
  id: string;
  property: {
    id: string;
    title: string;
    location: string;
    images: string[];
  };
  checkIn: string;
  checkOut: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalAmount: number;
  guests: number;
}

const Bookings: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed'>('all');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingsAPI.getUserBookings();
        setBookings(response.data);
      } catch (err) {
        setError('Failed to fetch bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter(booking =>
    filter === 'all' ? true : booking.status === filter
  );

  if (!user) {
    return <div>Please log in to view your bookings.</div>;
  }

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <p className="mt-1 text-sm text-gray-500">View and manage your bookings</p>
      </div>

      <div className="mb-6 flex space-x-2">
        {(['all', 'pending', 'confirmed', 'cancelled', 'completed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${filter === status
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'all'
              ? "You haven't made any bookings yet."
              : `You don't have any ${filter} bookings.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={booking.property.images[0]}
                  alt={booking.property.title}
                  className="object-cover w-full h-48"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {booking.property.title}
                </h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {booking.property.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ${booking.totalAmount}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                  </div>
                </div>
                <div className="mt-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings; 