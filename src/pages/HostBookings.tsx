import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Settings,
  Calendar,
  LogOut,
  CheckCircle,
  XCircle,
  Clock,
  User,
  MapPin,
  DollarSign
} from 'lucide-react';

// Mock data for bookings
const mockBookings = [
  {
    id: '1',
    property: {
      id: '1',
      title: 'Cozy Mountain Cabin',
      imageUrl: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    guest: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
    },
    checkIn: '2024-03-15',
    checkOut: '2024-03-20',
    status: 'confirmed',
    totalAmount: 1400,
    guests: 4,
  },
  {
    id: '2',
    property: {
      id: '2',
      title: 'Modern Beachfront Apartment',
      imageUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    guest: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234 567 8901',
    },
    checkIn: '2024-03-18',
    checkOut: '2024-03-22',
    status: 'pending',
    totalAmount: 780,
    guests: 2,
  },
  {
    id: '3',
    property: {
      id: '3',
      title: 'Historic Loft',
      imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    guest: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 234 567 8902',
    },
    checkIn: '2024-03-25',
    checkOut: '2024-03-28',
    status: 'cancelled',
    totalAmount: 1050,
    guests: 3,
  },
];

const HostBookings = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [filter, setFilter] = useState('all'); // 'all', 'confirmed', 'pending', 'cancelled'

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: newStatus }
        : booking
    ));
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">StayFinder</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            <Link
              to="/host/dashboard"
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link
              to="/host/properties"
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Settings className="h-5 w-5 mr-3" />
              Properties
            </Link>
            <Link
              to="/host/bookings"
              className="flex items-center px-4 py-3 text-gray-900 bg-gray-100 rounded-lg"
            >
              <Calendar className="h-5 w-5 mr-3" />
              Bookings
            </Link>
            <button
              className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
            <p className="text-gray-600">Manage your property bookings</p>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                All Bookings
              </button>
              <button
                onClick={() => setFilter('confirmed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'confirmed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Confirmed
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('cancelled')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'cancelled'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                Cancelled
              </button>
            </div>
          </div>

          {/* Bookings List */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Bookings</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={booking.property.imageUrl}
                        alt={booking.property.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {booking.property.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {booking.checkIn} - {booking.checkOut}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <User className="h-4 w-4 mr-1" />
                          {booking.guest.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-lg font-medium text-gray-900">
                          ${booking.totalAmount}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.guests} guests
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(booking.id, 'confirmed')}
                              className="p-2 text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleStatusChange(booking.id, 'cancelled')}
                              className="p-2 text-red-600 hover:text-red-700"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostBookings; 