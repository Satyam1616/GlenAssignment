import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
  Star,
  MapPin,
  Home,
  Settings,
  LogOut
} from 'lucide-react';

// Mock data for host's properties
const mockProperties = [
  {
    id: '1',
    title: 'Cozy Mountain Cabin',
    location: 'Aspen, Colorado',
    price: 280,
    rating: 4.9,
    reviewCount: 127,
    imageUrl: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'active',
    bookings: 45,
    revenue: 12600,
  },
  {
    id: '2',
    title: 'Modern Beachfront Apartment',
    location: 'Miami Beach, Florida',
    price: 195,
    rating: 4.8,
    reviewCount: 89,
    imageUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'active',
    bookings: 32,
    revenue: 6240,
  },
  {
    id: '3',
    title: 'Historic Loft',
    location: 'New York City, NY',
    price: 350,
    rating: 4.7,
    reviewCount: 203,
    imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'inactive',
    bookings: 78,
    revenue: 27300,
  },
];

const HostDashboard = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteProperty = (propertyId) => {
    setProperties(properties.filter(property => property.id !== propertyId));
    setShowDeleteModal(false);
  };

  const handleStatusToggle = (propertyId) => {
    setProperties(properties.map(property =>
      property.id === propertyId
        ? { ...property, status: property.status === 'active' ? 'inactive' : 'active' }
        : property
    ));
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
              <span className="text-xl font-bold text-gray-900">The Glen Assignment</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            <Link
              to="/host/dashboard"
              className="flex items-center px-4 py-3 text-gray-900 bg-gray-100 rounded-lg"
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
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Host Dashboard</h1>
              <p className="text-gray-600">Manage your properties and bookings</p>
            </div>
            <Link
              to="/host/properties/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Property
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Home className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Properties</p>
                  <p className="text-2xl font-semibold text-gray-900">{properties.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {properties.reduce((sum, property) => sum + property.bookings, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    ${properties.reduce((sum, property) => sum + property.revenue, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Properties List */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Your Properties</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {properties.map((property) => (
                <div key={property.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={property.imageUrl}
                        alt={property.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{property.title}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {property.location}
                        </div>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-gray-600">
                            {property.rating} ({property.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-lg font-medium text-gray-900">${property.price}/night</p>
                        <p className="text-sm text-gray-600">{property.bookings} bookings</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleStatusToggle(property.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${property.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                          {property.status === 'active' ? 'Active' : 'Inactive'}
                        </button>
                        <Link
                          to={`/host/properties/${property.id}/edit`}
                          className="p-2 text-gray-600 hover:text-blue-600"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedProperty(property);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-gray-600 hover:text-red-600"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <Link
                          to={`/properties/${property.id}`}
                          className="p-2 text-gray-600 hover:text-blue-600"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedProperty && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Property</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{selectedProperty.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProperty(selectedProperty.id)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostDashboard; 