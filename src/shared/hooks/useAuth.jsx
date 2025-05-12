import { useState, useCallback } from 'react';
import { api } from '../services/api';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      return null;
    }
  });

  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      if (!credentials.password) {
        throw new Error("La contraseña es requerida");
      }

      if (!credentials.email && !credentials.username) {
        throw new Error("Debe proporcionar email o username");
      }

      const loginData = {
        password: credentials.password,
        ...(credentials.email 
          ? { email: credentials.email.toLowerCase() } 
          : { username: credentials.username.toLowerCase() })
      };

      const response = await api.login(loginData);

      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        return response;
      }

      throw new Error(response.message || 'Error al iniciar sesión');
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const isAuthenticated = useCallback(() => {
    const token = localStorage.getItem('token');
    return !!token && !!user;
  }, [user]);

  const getCurrentUser = useCallback(() => {
    return user;
  }, [user]);

  return {
    user,
    login,
    logout,
    isAuthenticated,
    getCurrentUser,
    loading,
    error
  };
};