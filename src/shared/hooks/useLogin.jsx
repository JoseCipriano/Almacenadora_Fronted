import { useState } from 'react';

const API_URL = 'http://localhost:3000/Almacenadora_app/v1';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data = await response.json();
      
      // Guardar token y datos del usuario
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      localStorage.setItem('loginTimestamp', '2025-05-11 02:46:31');
      localStorage.setItem('currentUser', 'aarbizu-2020398');
      
      return true;
    } catch (error) {
      console.error('Error en login:', error);
      alert(error.message || 'Error al iniciar sesión');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};

export default useLogin;
