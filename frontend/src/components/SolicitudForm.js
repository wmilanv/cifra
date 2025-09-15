import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function SolicitudForm({ onCreated }) {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({ titulo: '', descripcion: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/solicitudes`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setForm({ titulo: '', descripcion: '' });
      onCreated(); // para refrescar la lista
    } catch (err) {
      alert('Error al crear solicitud');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>Nueva Solicitud</h5>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Título"
        value={form.titulo}
        onChange={(e) => setForm({ ...form, titulo: e.target.value })}
        required
      />
      <textarea
        className="form-control mb-2"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        required
      />
      <button className="btn btn-success">Crear Solicitud</button>
    </form>
  );
}

export default SolicitudForm;
