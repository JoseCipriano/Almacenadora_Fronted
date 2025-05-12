import { useState, useEffect, useCallback } from 'react';
import { api } from '../../services/api'; 
import toast from 'react-hot-toast';

export function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCategories();
      if (data.error) {
        throw new Error(data.message);
      }
      setCategories(data.categories || data);
    } catch (err) {
      const errorMessage = err.message || 'Error cargando categorías';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const addCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.createCategory(category); 
      if (result.error) {
        throw new Error(result.message);
      }
      toast.success('Categoría creada exitosamente');
      await fetchCategories();
      return true;
    } catch (err) {
      const errorMessage = err.message || 'Error agregando categoría';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, category) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.updateCategory(id, category);
      if (result.error) {
        throw new Error(result.message);
      }
      toast.success('Categoría actualizada exitosamente');
      await fetchCategories();
      return true;
    } catch (err) {
      const errorMessage = err.message || 'Error actualizando categoría';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.deleteCategory(id); 
      if (result.error) {
        throw new Error(result.message);
      }
      toast.success('Categoría eliminada exitosamente');
      await fetchCategories();
      return true;
    } catch (err) {
      const errorMessage = err.message || 'Error eliminando categoría';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    refreshCategories: fetchCategories
  };
}