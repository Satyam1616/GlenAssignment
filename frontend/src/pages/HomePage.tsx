import React from 'react';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';

// Mock data for properties
const properties = [
  {
    id: '1',
    title: 'Cozy Mountain Cabin with Stunning Views',
    location: 'Aspen, Colorado',
    price: 280,
    rating: 4.9,
    reviewCount: 127,
    imageUrl: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800',
    superhost: true,
  },
  {
    id: '2',
    title: 'Modern Beachfront Apartment',
    location: 'Miami Beach, Florida',
    price: 195,
    rating: 4.8,
    reviewCount: 89,
    imageUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    title: 'Historic Loft in Downtown',
    location: 'New York City, NY',
    price: 350,
    rating: 4.7,
    reviewCount: 203,
    imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    superhost: true,
  },
  {
    id: '4',
    title: 'Charming Vineyard Cottage',
    location: 'Napa Valley, California',
    price: 225,
    rating: 4.9,
    reviewCount: 156,
    imageUrl: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '5',
    title: 'Luxury Desert Villa with Pool',
    location: 'Scottsdale, Arizona',
    price: 425,
    rating: 4.8,
    reviewCount: 94,
    imageUrl: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
    superhost: true,
  },
  {
    id: '6',
    title: 'Peaceful Lakeside Retreat',
    location: 'Lake Tahoe, Nevada',
    price: 310,
    rating: 4.9,
    reviewCount: 178,
    imageUrl: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '7',
    title: 'Urban Penthouse with City Views',
    location: 'Seattle, Washington',
    price: 450,
    rating: 4.7,
    reviewCount: 112,
    imageUrl: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '8',
    title: 'Rustic Farmhouse Escape',
    location: 'Austin, Texas',
    price: 185,
    rating: 4.8,
    reviewCount: 145,
    imageUrl: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '9',
    title: 'Stylish Studio Apartment',
    location: 'Portland, Oregon',
    price: 125,
    rating: 4.6,
    reviewCount: 78,
    imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '10',
    title: 'Cozy Treehouse Getaway',
    location: 'Olympic National Forest, WA',
    price: 165,
    rating: 4.9,
    reviewCount: 234,
    imageUrl: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800',
    superhost: true,
  },
  {
    id: '11',
    title: 'Elegant Victorian House',
    location: 'San Francisco, California',
    price: 395,
    rating: 4.8,
    reviewCount: 167,
    imageUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '12',
    title: 'Minimalist Tiny House',
    location: 'Joshua Tree, California',
    price: 95,
    rating: 4.7,
    reviewCount: 89,
    imageUrl: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const HomePage = () => {
  return (
    <div>
      <Hero />

      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Amazing Properties
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From cozy cabins to luxury villas, find the perfect property for your next getaway
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Property Type
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect accommodation that matches your travel style
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Entire Homes</h3>
              <p className="text-sm text-gray-600">Complete privacy and space</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Apartments</h3>
              <p className="text-sm text-gray-600">Urban living at its finest</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Cabins</h3>
              <p className="text-sm text-gray-600">Rustic charm in nature</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Villas</h3>
              <p className="text-sm text-gray-600">Luxury and comfort combined</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose StayFinder */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose StayFinder?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make it easy to find and book the perfect property for your next adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Properties</h3>
              <p className="text-gray-600">All our properties are verified and reviewed by our team to ensure quality and safety.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">We offer competitive prices and guarantee you won't find better deals elsewhere.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our customer support team is available around the clock to help with any questions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;