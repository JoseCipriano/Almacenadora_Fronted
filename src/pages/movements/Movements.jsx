import React, { useState, useEffect } from 'react';
import { FaBoxOpen, FaTruck, FaWarehouse, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import './Movements.css';

const Movements = () => {
  const [currentDateTime] = useState('2025-05-11 00:54:07');
  const [currentUser] = useState('aarbizu-2020398');
  const [movementType, setMovementType] = useState('entrada');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    locationId: '',
    description: '',
    providerId: ''
  });

  // Estados para los datos de selección
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    // Simular carga de datos
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simular llamadas a API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProducts([
          { id: 1, name: 'Producto A', stock: 100 },
          { id: 2, name: 'Producto B', stock: 150 },
        ]);
        
        setLocations([
          { id: 1, name: 'Bodega Principal' },
          { id: 2, name: 'Bodega Secundaria' },
        ]);
        
        setProviders([
          { id: 1, name: 'Proveedor A' },
          { id: 2, name: 'Proveedor B' },
        ]);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      
      // Limpiar formulario y cerrar
      setFormData({
        productId: '',
        quantity: '',
        locationId: '',
        description: '',
        providerId: ''
      });
      setShowForm(false);
      
      // Mostrar mensaje de éxito (implementar toast o notificación)
      alert('Movimiento registrado con éxito');
    } catch (error) {
      console.error('Error al registrar movimiento:', error);
      alert('Error al registrar movimiento');
    } finally {
      setLoading(false);
    }
  };

  const MovementForm = () => (
    <form onSubmit={handleSubmit} className="movement-form">
      <div className="form-header">
        <h3>{movementType === 'entrada' ? 'Nuevo Ingreso' : 'Nueva Salida'}</h3>
        <button 
          type="button" 
          className="close-button"
          onClick={() => setShowForm(false)}
        >
          <FaTimes />
        </button>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="productId">Producto</label>
          <select
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione un producto</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} (Stock: {product.stock})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Cantidad</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="locationId">Ubicación</label>
          <select
            id="locationId"
            name="locationId"
            value={formData.locationId}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione una ubicación</option>
            {locations.map(location => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        {movementType === 'entrada' && (
          <div className="form-group">
            <label htmlFor="providerId">Proveedor</label>
            <select
              id="providerId"
              name="providerId"
              value={formData.providerId}
              onChange={handleInputChange}
              required={movementType === 'entrada'}
            >
              <option value="">Seleccione un proveedor</option>
              {providers.map(provider => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>
        )}

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
        <button type="submit" className="submit-button" disabled={loading}>
          <FaSave />
          {loading ? 'Guardando...' : 'Guardar Movimiento'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="movements-container">
      <header className="movements-header">
        <div className="header-content">
          <h1>Gestión de Movimientos</h1>
          <div className="header-info">
            <span>{currentDateTime}</span>
            <span className="user-info">{currentUser}</span>
          </div>
        </div>
        
        {!showForm && (
          <div className="movement-types">
            <button
              className={`type-button ${movementType === 'entrada' ? 'active' : ''}`}
              onClick={() => setMovementType('entrada')}
            >
              <FaBoxOpen />
              Entradas
            </button>
            <button
              className={`type-button ${movementType === 'salida' ? 'active' : ''}`}
              onClick={() => setMovementType('salida')}
            >
              <FaTruck />
              Salidas
            </button>
          </div>
        )}
      </header>

      <main className="movements-main">
        {showForm ? (
          <MovementForm />
        ) : (
          <div className="movement-cards">
            <div className="new-movement-card" onClick={() => setShowForm(true)}>
              <FaPlus className="add-icon" />
              <h3>Nuevo {movementType === 'entrada' ? 'Ingreso' : 'Salida'}</h3>
              <p>Click para registrar un nuevo movimiento</p>
            </div>

            <div className="info-card">
              <FaWarehouse className="info-icon" />
              <h3>Información Rápida</h3>
              <ul>
                <li>Total Productos: {products.length}</li>
                <li>Ubicaciones: {locations.length}</li>
                <li>Último movimiento: {currentDateTime}</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Movements;