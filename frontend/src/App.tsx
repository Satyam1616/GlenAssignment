import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import PropertyDetail from './pages/PropertyDetail';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HostDashboard from './pages/HostDashboard';
import HostProperties from './pages/HostProperties';
import HostBookings from './pages/HostBookings';
import HostPropertyForm from './pages/HostPropertyForm';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Host Dashboard Routes */}
              <Route path="/host/dashboard" element={<HostDashboard />} />
              <Route path="/host/properties" element={<HostProperties />} />
              <Route path="/host/bookings" element={<HostBookings />} />
              <Route path="/host/properties/new" element={<HostPropertyForm />} />
              <Route path="/host/properties/:id/edit" element={<HostPropertyForm />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;