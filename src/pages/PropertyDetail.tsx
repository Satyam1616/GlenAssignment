import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Users, Bed, Bath, Wifi, Car, Coffee, Tv, ChevronLeft, ChevronRight, Calendar, Heart } from 'lucide-react';

const PropertyDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);

  // Mock property data
  const property = {
    id: '1',
    title: 'Cozy Mountain Cabin with Stunning Views',
    location: 'Aspen, Colorado',
    price: 280,
    rating: 4.9,
    reviewCount: 127,
    superhost: true,
    images: [
      'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Escape to this charming mountain cabin nestled in the heart of Aspen. Perfect for a romantic getaway or family vacation, this property offers breathtaking mountain views, cozy interiors, and easy access to world-class skiing and hiking trails. The cabin features a fully equipped kitchen, comfortable living spaces, and a private deck where you can enjoy your morning coffee while taking in the stunning scenery.',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: [
      { icon: Wifi, name: 'WiFi' },
      { icon: Car, name: 'Free parking' },
      { icon: Coffee, name: 'Kitchen' },
      { icon: Tv, name: 'TV' },
    ],
    host: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      joinedDate: 'March 2019',
      responseRate: 98,
      responseTime: '1 hour',
      superhost: true,
    },
    reviews: [
      {
        id: 1,
        author: 'Mike Chen',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Absolutely stunning property! The views are incredible and the cabin is even more beautiful than the photos. Sarah was an excellent host and very responsive.',
      },
      {
        id: 2,
        author: 'Emily Rodriguez',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
        rating: 5,
        date: '1 month ago',
        comment: 'Perfect getaway! The location is ideal for both summer and winter activities. The cabin is cozy, clean, and has everything you need for a comfortable stay.',
      },
    ],
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const calculateTotal = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights * property.price : 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
            <span className="font-medium">{property.rating}</span>
            <span className="ml-1">({property.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.location}</span>
          </div>
          {property.superhost && (
            <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs font-medium">
              Superhost
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="relative mb-8">
            <div className="aspect-[4/3] rounded-xl overflow-hidden">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Image Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Favorite Button */}
            <button className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors">
              <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
            </button>
          </div>

          {/* Property Info */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Entire cabin hosted by {property.host.name}</h2>
              <img
                src={property.host.avatar}
                alt={property.host.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            
            <div className="flex items-center space-x-4 text-gray-600 mb-6">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{property.maxGuests} guests</span>
              </div>
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{property.bedrooms} bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms} bathrooms</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">{property.description}</p>

            {/* Amenities */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <amenity.icon className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Host Info */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={property.host.avatar}
                alt={property.host.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{property.host.name}</h3>
                {property.host.superhost && (
                  <span className="text-sm text-pink-600 font-medium">Superhost</span>
                )}
                <p className="text-sm text-gray-600">Joined {property.host.joinedDate}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">Response rate: </span>
                <span className="text-gray-600">{property.host.responseRate}%</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Response time: </span>
                <span className="text-gray-600">{property.host.responseTime}</span>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-lg font-semibold text-gray-900">
                {property.rating} · {property.reviewCount} reviews
              </span>
            </div>
            
            <div className="space-y-6">
              {property.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{review.author}</p>
                      <p className="text-sm text-gray-600">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-2xl font-bold text-gray-900">${property.price}</span>
                <span className="text-gray-600 ml-1">night</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium text-gray-900">{property.rating}</span>
                <span className="text-sm text-gray-500 ml-1">({property.reviewCount})</span>
              </div>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    {[...Array(property.maxGuests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Reserve
              </button>
            </form>

            {checkInDate && checkOutDate && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Total</span>
                  <span className="text-lg font-semibold text-gray-900">${calculateTotal()}</span>
                </div>
                <p className="text-sm text-gray-500">
                  {Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))} nights
                </p>
              </div>
            )}

            <p className="text-center text-sm text-gray-500 mt-4">
              You won't be charged yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;