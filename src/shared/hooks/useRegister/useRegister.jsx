// src/shared/hooks/useRegister/useRegister.jsx

import { useState } from 'react';
import { toast }       from 'react-toastify';
import { config }      from '../../../config/configs.js';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        if (key === 'profilePicture' && value) {
          formData.append('profilePicture', value);
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch(
        `${config.API_URL}/auth/signup`,
        {
          method: 'POST',
          headers: { Accept: 'application/json' },
          credentials: 'include', // si tu API usa cookies
          body: formData
        }
      );

      if (!response.ok) {
        const ct = response.headers.get('content-type') || '';
        const errBody = ct.includes('application/json')
          ? await response.json()
          : { message: await response.text() };
        throw new Error(errBody.message || 'Error en el registro');
      }

      const data = await response.json();
      if (data.token) localStorage.setItem('token', data.token);
      if (data.user)  localStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Registro exitoso');
      return true;
    } catch (error) {
      console.error('Error en el registro:', error);
      toast.error(error.message || 'Error en el registro');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
};

export default useRegister;
