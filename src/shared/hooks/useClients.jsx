import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/Almacenadora_app/v1';

export const useClient = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar clientes
  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/clients`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar los clientes');
      }

      const data = await response.json();
      setClients(data.clients);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear cliente
  const addClient = async (clientData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      Object.keys(clientData).forEach(key => {
        if (key === 'profilePicture' && clientData[key]) {
          formData.append('profilePicture', clientData[key]);
        } else {
          formData.append(key, clientData[key]);
        }
      });

      const response = await fetch(`${API_URL}/clients`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error al crear el cliente');
      }

      const newClient = await response.json();
      setClients(prev => [...prev, newClient]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar cliente
  const updateClient = async (id, clientData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      Object.keys(clientData).forEach(key => {
        if (key === 'profilePicture' && clientData[key]) {
          formData.append('profilePicture', clientData[key]);
        } else {
          formData.append(key, clientData[key]);
        }
      });

      const response = await fetch(`${API_URL}/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el cliente');
      }

      const updatedClient = await response.json();
      setClients(prev => prev.map(client => 
        client._id === id ? updatedClient : client
      ));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar cliente
  const deleteClient = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/clients/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el cliente');
      }

      setClients(prev => prev.filter(client => client._id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Cargar clientes al montar el componente
  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    loading,
    error,
    addClient,
    updateClient,
    deleteClient,
    fetchClients
  };
};