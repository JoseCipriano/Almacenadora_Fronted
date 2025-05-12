import React, { useState, useEffect } from 'react';
import { FaSearch, FaCalendar, FaFileDownload, FaFilter, FaSync } from 'react-icons/fa';
import './History.css';

const History = () => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    search: '',
    type: 'all'
  });

  // Simular datos de ejemplo con la fecha actual
  const mockData = [
    {
      id: 1,
      date: '2025-05-11 00:43:58',
      type: 'Entrada',
      productName: 'Producto A',
      quantity: 100,
      user: 'aarbizu-2020398',
      location: 'Bodega Principal'
    },
    {
      id: 2,
      date: '2025-05-11 00:30:00',
      type: 'Salida',
      productName: 'Producto B',
      quantity: 50,
      user: 'aarbizu-2020398',
      location: 'Bodega Secundaria'
    }
  ];

  useEffect(() => {
    // Simular llamada a API
    const fetchMovements = async () => {
      try {
        setLoading(true);
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMovements(mockData);
      } catch (error) {
        console.error('Error al cargar el historial:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovements();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExport = () => {
    const csvContent = [
      ['Fecha', 'Tipo', 'Producto', 'Cantidad', 'Usuario', 'Ubicación'],
      ...movements.map(item => [
        item.date,
        item.type,
        item.productName,
        item.quantity,
        item.user,
        item.location
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historial_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFilters({
      startDate: '',
      endDate: '',
      search: '',
      type: 'all'
    });
  };

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.productName.toLowerCase().includes(filters.search.toLowerCase()) ||
                         movement.location.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type === 'all' || movement.type === filters.type;
    const movementDate = new Date(movement.date);
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;

    return matchesSearch && matchesType &&
           (!startDate || movementDate >= startDate) &&
           (!endDate || movementDate <= endDate);
  });

  return (
    <div className="history-container">
      <header className="history-header">
        <h1>Historial de Movimientos</h1>
        <div className="header-actions">
          <button className="btn-reset" onClick={handleReset}>
            <FaSync /> Reiniciar Filtros
          </button>
          <button className="btn-export" onClick={handleExport}>
            <FaFileDownload /> Exportar CSV
          </button>
        </div>
      </header>

      <section className="filters-panel">
        <div className="search-filter">
          <FaSearch className="icon" />
          <input
            type="text"
            name="search"
            placeholder="Buscar por producto o ubicación..."
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>

        <div className="date-filters">
          <div className="date-input">
            <FaCalendar className="icon" />
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </div>
          <span>a</span>
          <div className="date-input">
            <FaCalendar className="icon" />
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="type-filter">
          <FaFilter className="icon" />
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="all">Todos los tipos</option>
            <option value="Entrada">Entradas</option>
            <option value="Salida">Salidas</option>
          </select>
        </div>
      </section>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando historial...</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="movements-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Usuario</th>
                <th>Ubicación</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovements.map((movement) => (
                <tr key={movement.id}>
                  <td>{new Date(movement.date).toLocaleString()}</td>
                  <td>
                    <span className={`badge ${movement.type.toLowerCase()}`}>
                      {movement.type}
                    </span>
                  </td>
                  <td>{movement.productName}</td>
                  <td>{movement.quantity}</td>
                  <td>{movement.user}</td>
                  <td>{movement.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;