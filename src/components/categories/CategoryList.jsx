import React from 'react';
import PropTypes from 'prop-types';

const CategoryList = ({ categories, onEdit, onDelete }) => {
  // Función de formateo de fecha movida directamente al componente
  const formatDateTime = (dateString) => {
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return 'Fecha inválida';
      }

      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Guatemala'
      };

      return new Intl.DateTimeFormat('es-GT', options).format(date);
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return 'Error en fecha';
    }
  };

  return (
    <div className="category-list">
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Creado Por</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>{category.createdBy}</td>
              <td>{formatDateTime(category.createdAt)}</td>
              <td>
                <button
                  onClick={() => onEdit(category)}
                  className="btn btn-edit"
                  title="Editar"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={() => onDelete(category._id)}
                  className="btn btn-delete"
                  title="Eliminar"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CategoryList;