import { useState } from 'react';
import { api } from '../services/api';
import { useCurrentData } from './useCurrentData';
import toast from 'react-hot-toast';

export const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const { currentDate, currentUser } = useCurrentData();

  const createProduct = async (productData) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      // Agregar metadata
      formData.append('createdAt', currentDate);
      formData.append('createdBy', currentUser);
      
      // Agregar datos del producto
      Object.keys(productData).forEach(key => {
        if (key === 'image' && productData[key] instanceof File) {
          formData.append('image', productData[key]);
        } else {
          formData.append(key, productData[key]);
        }
      });

      const response = await api.createProduct(formData);
      if (response.error) {
        toast.error(response.message);
        return false;
      }
      
      toast.success('Producto creado exitosamente');
      return true;
    } catch (error) {
      toast.error('Error al crear el producto');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    loading
  };
};