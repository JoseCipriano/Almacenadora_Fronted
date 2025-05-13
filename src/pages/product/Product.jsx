<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaSync } from 'react-icons/fa';
import './Product.css';
=======
import { useState } from "react";
import { Navbar } from "../../components/navbars/Navbar";
import ProductList from "../../components/products/ProductList.jsx";
>>>>>>> 34e0fd5c9b5d8c4ac5065f3e1a957fbd10e64259

const Product = () => {
  const [currentDateTime] = useState('2025-05-11 01:02:08');
  const [currentUser] = useState('aarbizu-2020398');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    supplier: ''
  });

  // Datos de ejemplo
  const mockProducts = [
    {
      id: 1,
      name: 'Producto A',
      description: 'Descripción del producto A',
      price: 100,
      stock: 50,
      category: 'Categoría 1',
      supplier: 'Proveedor 1'
    },
    {
      id: 2,
      name: 'Producto B',
      description: 'Descripción del producto B',
      price: 150,
      stock: 30,
      category: 'Categoría 2',
      supplier: 'Proveedor 2'
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simular llamada a API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingProduct) {
        // Actualizar producto existente
        setProducts(products.map(p => 
          p.id === editingProduct.id ? { ...formData, id: p.id } : p
        ));
      } else {
        // Agregar nuevo producto
        setProducts([...products, { ...formData, id: Date.now() }]);
      }

      handleCloseForm();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este producto?')) {
      setLoading(true);
      try {
        // Simular llamada a API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      supplier: ''
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-container">
      <header className="products-header">
        <div className="header-content">
          <h1>Gestión de Productos</h1>
          <div className="header-info">
            <span>{currentDateTime}</span>
            <span className="user-info">{currentUser}</span>
          </div>
        </div>
        
        <div className="header-actions">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-button" onClick={() => setShowForm(true)}>
            <FaPlus /> Nuevo Producto
          </button>
        </div>
      </header>

      {showForm && (
        <div className="product-form-container">
          <form onSubmit={handleSubmit} className="product-form">
            <h2>{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Precio</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Categoría</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="supplier">Proveedor</label>
                <input
                  type="text"
                  id="supplier"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleCloseForm} className="cancel-button">
                Cancelar
              </button>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Guardando...' : editingProduct ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="products-table-container">
        {loading ? (
          <div className="loading-state">
            <FaSync className="spin" />
            <p>Cargando productos...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron productos</p>
          </div>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Proveedor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td>{product.supplier}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(product)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(product.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Product;
