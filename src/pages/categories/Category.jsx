import React, { useState, useEffect } from "react";
import CategoryList from "../../components/categories/CategoryList";
import CategoryForm from "../../components/categories/CategoryForm";
import { useCategory } from "../../shared/hooks/useCategory";
import { toast } from "react-toastify";

export default function Categories() {
  const { categories, loading, error, addCategory, updateCategory, deleteCategory } = useCategory();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (categoryData) => {
    try {
      if (isEditing) {
        await updateCategory(selectedCategory.id, categoryData);
        toast.success('Categoría actualizada exitosamente');
      } else {
        await addCategory(categoryData);
        toast.success('Categoría creada exitosamente');
      }
      handleCloseForm();
    } catch (error) {
      toast.error(error.message || 'Error al procesar la categoría');
    }
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta categoría?')) {
      try {
        await deleteCategory(id);
        toast.success('Categoría eliminada exitosamente');
      } catch (error) {
        toast.error(error.message || 'Error al eliminar la categoría');
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setSelectedCategory(null);
  };

  const currentDateTime = '2025-05-11 01:32:30';
  const currentUser = 'aarbizu-2020398';

  return (
    <div className="categories-container">
      <header className="categories-header">
        <div className="header-content">
          <h1>Gestión de Categorías</h1>
          <div className="header-info">
            <span>{currentDateTime}</span>
            <span className="user-info">{currentUser}</span>
          </div>
        </div>
        <button 
          className="add-button"
          onClick={() => setShowForm(true)}
        >
          Nueva Categoría
        </button>
      </header>

      {showForm && (
        <CategoryForm
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          initialData={selectedCategory}
          isEditing={isEditing}
        />
      )}

      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
}