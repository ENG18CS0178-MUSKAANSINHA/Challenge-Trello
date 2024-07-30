import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Here you would typically verify the token and get user details
      setUser({ name: 'User' }); // Replace with actual user data
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/api/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser({ name: response.data.user.name }); // Replace with actual user data
  };

  const signup = async (email, password) => {
    await axios.post('/api/signup', { email, password });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

