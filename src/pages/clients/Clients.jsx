import React, { useState } from 'react';
import ClientList from "../../components/clients/ClientList";
import ClientForm from "../../components/clients/ClientForm";
import { useClient } from "../../shared/hooks/useClients";
import { toast } from "react-toastify";

export default function Clients() {
  const { clients, loading, error, addClient, updateClient, deleteClient } = useClient();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (clientData) => {
    try {
      const result = isEditing 
        ? await updateClient(selectedClient._id, clientData)
        : await addClient(clientData);

      if (result.success) {
        toast.success(isEditing ? 'Cliente actualizado!' : 'Cliente creado!');
        handleCloseForm();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Error al procesar el cliente');
    }
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este cliente?')) {
      const result = await deleteClient(id);
      if (result.success) {
        toast.success('Cliente eliminado!');
      } else {
        toast.error(result.error);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setSelectedClient(null);
  };

  if (error) {
    toast.error(error);
  }

  return (
    <div className="clients-container">
      <header className="clients-header">
        <h1>Gestión de Clientes</h1>
        <button 
          className="add-button"
          onClick={() => setShowForm(true)}
        >
          Nuevo Cliente
        </button>
      </header>

      {showForm && (
        <ClientForm
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          initialData={selectedClient}
          isEditing={isEditing}
        />
      )}

      <ClientList
        clients={clients}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
}