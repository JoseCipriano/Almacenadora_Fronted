import React, { useState, useEffect } from 'react';
import { getSuppliers, getClients, getProducts } from '../../services/api';
import './Providers.css';

export default function Providers() {
  const [stats, setStats] = useState({ suppliers:0, clients:0, products:0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async()=>{
      try {
        const [sup, cli, prod] = await Promise.all([
          getSuppliers(), getClients(), getProducts()
        ]);
        if (sup.error||cli.error||prod.error) 
          throw new Error(sup.message||cli.message||prod.message);
        setStats({ suppliers: sup.length, clients: cli.length, products: prod.length });
      } catch(e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="providers-page">Cargando…</div>;
  if (error)   return <div className="providers-page text-red-600">Error: {error}</div>;

  return (
    <div className="providers-page p-6">
      <h1 className="text-3xl font-bold mb-4">Panel de Proveedores</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="stat-card bg-blue-100 p-4 rounded shadow">
          <h2 className="text-xl">Proveedores</h2>
          <p className="text-4xl">{stats.suppliers}</p>
        </div>
        <div className="stat-card bg-green-100 p-4 rounded shadow">
          <h2 className="text-xl">Clientes</h2>
          <p className="text-4xl">{stats.clients}</p>
        </div>
        <div className="stat-card bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-xl">Productos</h2>
          <p className="text-4xl">{stats.products}</p>
        </div>
      </div>
    </div>
  );
}
