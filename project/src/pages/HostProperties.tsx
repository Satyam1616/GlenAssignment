import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { listingsAPI } from '../services/api';
import { Edit, Trash2, Plus } from 'lucide-react';

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
  status: 'active' | 'inactive';
}

const HostProperties: React.FC = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await listingsAPI.getHostListings();
      setProperties(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch properties');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      await listingsAPI.delete(id);
      setProperties((prev) => prev.filter((property) => property.id !== id));
    } catch (err) {
      setError('Failed to delete property');
      console.error(err);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await listingsAPI.update(id, { status: newStatus });
      setProperties((prev) =>
        prev.map((property) =>
          property.id === id ? { ...property, status: newStatus } : property
        )
      );
    } catch (err) {
      setError('Failed to update property status');
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading properties...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Properties</h1>
        <Link
          to="/host/properties/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Property
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={property.images[0]}
                alt={property.title}
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{property.title}</h2>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${property.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {property.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{property.location.address}</p>
              <p className="text-2xl font-bold mb-4">${property.price}/night</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusToggle(property.id, property.status)}
                    className={`px-3 py-1 rounded-md text-sm ${property.status === 'active'
                        ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                  >
                    {property.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <Link
                    to={`/host/properties/${property.id}/edit`}
                    className="p-2 text-gray-600 hover:text-indigo-600"
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="p-2 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostProperties; 