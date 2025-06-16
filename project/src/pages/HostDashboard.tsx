import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { listingsAPI, bookingsAPI } from '../services/api';
import {
  Home,
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';

interface DashboardStats {
  totalProperties: number;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  occupancyRate: number;
  activeGuests: number;
}

interface RecentBooking {
  id: string;
  property: {
    id: string;
    title: string;
    image: string;
  };
  guest: {
    name: string;
    email: string;
  };
  checkIn: string;
  checkOut: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
}

const HostDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, bookingsResponse] = await Promise.all([
        listingsAPI.getHostStats(),
        bookingsAPI.getHostBookings(),
      ]);
      setStats(statsResponse.data);
      setRecentBookings(bookingsResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (!stats) {
    return <div>Failed to load dashboard data</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Host Dashboard</h1>
        <Link
          to="/host/properties/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Property
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-gray-500">Total Properties</p>
              <p className="text-2xl font-bold">{stats.totalProperties}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold">{stats.totalBookings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">${stats.totalRevenue}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-gray-500">Average Rating</p>
              <p className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-gray-500">Occupancy Rate</p>
              <p className="text-2xl font-bold">{stats.occupancyRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-gray-500">Active Guests</p>
              <p className="text-2xl font-bold">{stats.activeGuests}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>
        </div>
        <div className="divide-y">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={booking.property.image}
                    alt={booking.property.title}
                    className="h-16 w-16 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium">{booking.property.title}</h3>
                    <p className="text-gray-500">
                      {booking.guest.name} • {booking.guest.email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${booking.totalAmount}</p>
                  <p className="text-gray-500">
                    {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                    {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostDashboard; 