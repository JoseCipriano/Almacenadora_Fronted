import React, { useState, useEffect } from 'react';
import { FaBox, FaUsers, FaTruck, FaWarehouse, FaExchangeAlt, FaHistory } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    // Obtener usuario del localStorage o valor por defecto
    const storedUser = localStorage.getItem('user') || 'aarbizu-2020398';
    setUser(storedUser);

    // Formatear fecha actual en 'YYYY-MM-DD HH:mm:ss'
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    setCurrentTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
  }, []);

  const menuCards = [
    { title: 'Productos', icon: FaBox, path: '/products', color: 'bg-blue-500' },
    { title: 'Clientes', icon: FaUsers, path: '/clients', color: 'bg-green-500' },
    { title: 'Proveedores', icon: FaTruck, path: '/suppliers', color: 'bg-purple-500' },
    { title: 'Categorías', icon: FaWarehouse, path: '/categories', color: 'bg-yellow-500' },
    { title: 'Movimientos', icon: FaExchangeAlt, path: '/movements', color: 'bg-red-500' },
    { title: 'Historial', icon: FaHistory, path: '/history', color: 'bg-indigo-500' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">{currentTime}</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-600">{user}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                onClick={() => navigate(card.path)}
                className="bg-white overflow-hidden shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
              >
                <div className="px-4 py-5 sm:p-6 flex items-center">
                  <div className={`rounded-md p-3 ${card.color}`}>  
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Gestionar {card.title.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* System Info */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">Información del Sistema</h2>
            <div className="mt-3 text-sm text-gray-500">
              <p>Última actualización: {currentTime}</p>
              <p>Usuario: {user}</p>
              <p>Versión: 1.0.0</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">© 2025 TOP Almacén. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
