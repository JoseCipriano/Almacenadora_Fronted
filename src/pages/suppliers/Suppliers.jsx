import React, { useState, useEffect } from 'react';
import { getSuppliers } from '../../services/api';
import './Suppliers.css';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async()=>{
      try {
        const res = await getSuppliers();
        if (res.error) throw new Error(res.message);
        setSuppliers(res);
      } catch(e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = suppliers.filter(s =>
    s.username.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="suppliers-page p-6">
      <h1 className="text-3xl font-bold mb-4">Listado de Proveedores</h1>
      <input
        type="text"
        placeholder="Buscar…"
        value={filter}
        onChange={e=>setFilter(e.target.value)}
        className="search-input mb-4 p-2 border rounded w-full"
      />

      {loading && <p>Cargando…</p>}
      {error   && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Registrado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s=>(
              <tr key={s.id} className="border-b">
                <td className="px-4 py-2">{s.username}</td>
                <td className="px-4 py-2">{s.email}</td>
                <td className="px-4 py-2">{s.phone}</td>
                <td className="px-4 py-2">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {filtered.length===0 && (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                  Ningún resultado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
