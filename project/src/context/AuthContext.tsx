import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import jwtDecode from 'jwt-decode';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Attempting login with:', { email }); // Debug log
    try {
      const response = await authAPI.login(email, password);
      console.log('Login response:', response); // Debug log
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      console.error('Login error:', error); // Debug log
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    console.log('Attempting registration with:', { name, email, role }); // Debug log
    try {
      const response = await authAPI.register(name, email, password, role);
      console.log('Registration response:', response); // Debug log
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      console.error('Registration error:', error); // Debug log
      throw error;
    }
  };

  const loginWithGoogle = async (credential: string) => {
    console.log('Attempting Google login with credential'); // Debug log
    try {
      const response = await authAPI.loginWithGoogle(credential);
      console.log('Google login response:', response); // Debug log
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      console.error('Google login error:', error); // Debug log
      throw error;
    }
  };

  const logout = () => {
    console.log('Logging out user'); // Debug log
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 