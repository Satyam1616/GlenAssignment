import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingsAPI } from '../services/api';
import { Check, X, Clock } from 'lucide-react';

interface Booking {
  id: string;
  property: {
    id: string;
    title: string;
    image: string;
  };
  guest: {
    id: string;
    name: string;
    email: string;
  };
  checkIn: string;
  checkOut: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  guests: number;
}

type BookingStatus = Booking['status'];

const HostBookings: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingsAPI.getHostBookings();
      setBookings(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: BookingStatus) => {
    try {
      await bookingsAPI.updateStatus(id, newStatus);
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (err) {
      setError('Failed to update booking status');
      console.error(err);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md ${filter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-4 py-2 rounded-md ${filter === 'confirmed'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-md ${filter === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-4 py-2 rounded-md ${filter === 'cancelled'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={booking.property.image}
                    alt={booking.property.title}
                    className="h-16 w-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{booking.property.title}</h3>
                    <p className="text-gray-500">
                      {booking.guest.name} • {booking.guest.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">${booking.totalAmount}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                          title="Confirm"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                          title="Cancel"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'completed')}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                        title="Mark as completed"
                      >
                        <Clock className="h-5 w-5" />
                      </button>
                    )}
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-sm ${booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : booking.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostBookings; 