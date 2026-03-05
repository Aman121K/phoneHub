import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      
      if (storedToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        // Fetch user profile to restore session
        try {
          const response = await axios.get('/api/users/profile');
          setUser(response.data);
        } catch (error) {
          // Token is invalid or expired
          console.error('Error fetching user profile:', error);
          localStorage.removeItem('token');
          setUser(null);
          delete axios.defaults.headers.common['Authorization'];
        }
      } else {
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []); // Only run once on mount

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token: newToken, user: userData } = response.data;
      localStorage.setItem('token', newToken);
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      return { success: true, user: userData };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed',
        code: error.response?.data?.code,
        email: error.response?.data?.email
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      return {
        success: true,
        message: response.data?.message || 'Registration successful',
        requiresEmailVerification: Boolean(response.data?.requiresEmailVerification),
        email: response.data?.email || userData.email
      };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const refreshUser = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const response = await axios.get('/api/users/profile');
        setUser(response.data);
        return { success: true, user: response.data };
      }
      return { success: false, error: 'No token found' };
    } catch (error) {
      console.error('Error refreshing user:', error);
      return { success: false, error: error.response?.data?.error || 'Failed to refresh user' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, refreshUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
