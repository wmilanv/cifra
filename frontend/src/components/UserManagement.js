import React, { useEffect, useState, useContext,useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function UserManagement() {
  const { token } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nombre: '', email: '', password: '', rol: 'cliente' });
console.log('TOKEN QUE SE ENVÍA:', token);
  const fetchUsuarios =useCallback( async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/usuarios`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(res.data);
    } catch (err) {
       console.log(err)
      alert('Error al cargar usuarios');
    }
 }, [token]);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/usuarios`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ nombre: '', email: '', password: '', rol: 'cliente' });
      fetchUsuarios();
    } catch (err) {
      alert('Error al crear usuario');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsuarios();
    } catch (err) {
      alert('Error al eliminar usuario');
    }
  };

  return (
    <div className="mt-5">
      <h5>👤 Gestión de Usuarios</h5>

      <form onSubmit={handleCreate} className="row g-3 mb-4">
        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={form.rol}
            onChange={(e) => setForm({ ...form, rol: e.target.value })}
          >
            <option value="cliente">Cliente</option>
            <option value="soporte">Soporte</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div className="col-md-1">
          <button className="btn btn-success w-100">Crear</button>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
