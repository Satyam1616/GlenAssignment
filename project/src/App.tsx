import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import PropertyDetails from './pages/PropertyDetails';
import SearchResults from './pages/SearchResults';
import HostDashboard from './pages/HostDashboard';
import HostProperties from './pages/HostProperties';
import HostBookings from './pages/HostBookings';

const GOOGLE_CLIENT_ID = '979520332654-a68n100bntpujrclrsj67o1fcoiiore2.apps.googleusercontent.com';

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/properties/:id" element={<PropertyDetails />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/host/dashboard" element={<HostDashboard />} />
                <Route path="/host/properties" element={<HostProperties />} />
                <Route path="/host/bookings" element={<HostBookings />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;