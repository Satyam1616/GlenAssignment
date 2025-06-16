import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Heart } from 'lucide-react';

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  location,
  price,
  rating,
  image,
  coordinates
}) => {
  return (
    <Link to={`/listings/${id}`} className="group">
      <div className="relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
            <Heart className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{title}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>

          <div className="mt-2">
            <span className="text-lg font-semibold text-gray-900">${price}</span>
            <span className="text-gray-600"> / night</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard; 