import React, { useState } from 'react';
import { Calendar, Users, DollarSign, Filter } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const handleFilterChange = () => {
    onFilterChange({
      startDate,
      endDate,
      guests,
      priceRange
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="Where are you going?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Dates */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check in - Check out
          </label>
          <div className="flex space-x-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Check in"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Check out"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Price Range */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="0"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
              placeholder="Min"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              min="0"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
              placeholder="Max"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Additional Filters */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={handleFilterChange}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Filter className="h-4 w-4 mr-2" />
          Apply Filters
        </button>

        <button
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
            setGuests(1);
            setPriceRange({ min: 0, max: 1000 });
          }}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default SearchFilters; 