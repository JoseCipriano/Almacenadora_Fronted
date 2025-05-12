import { useState } from 'react';
import { api } from '../services/api';
import { useCurrentData } from './useCurrentData';
import toast from 'react-hot-toast';

export const useSuppliers = () => {
  const [loading, setLoading] = useState(false);
  const { currentDate, currentUser } = useCurrentData();

  const createSupplier = async (supplierData) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      // Agregar metadata
      formData.append('createdAt', currentDate);
      formData.append('createdBy', currentUser);
      
      // Agregar datos del proveedor
      Object.keys(supplierData).forEach(key => {
        if (key === 'image' && supplierData[key] instanceof File) {
          formData.append('image', supplierData[key]);
        } else {
          formData.append(key, supplierData[key]);
        }
      });

      const response = await api.createSupplier(formData);
      if (response.error) {
        toast.error(response.message);
        return false;
      }
      
      toast.success('Proveedor creado exitosamente');
      return true;
    } catch (error) {
      toast.error('Error al crear el proveedor');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createSupplier,
    loading
  };
};