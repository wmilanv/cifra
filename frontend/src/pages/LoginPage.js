import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, form);
      const token = res.data.token;

      // Decodificar token para extraer rol
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role || 'cliente';

      login(token, role);

      if (role === 'admin') navigate('/admin');
      else if (role === 'soporte') navigate('/soporte');
      else navigate('/home');
    } catch (err) {
      setError('Login incorrecto. Revisa tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          disabled={loading}
          autoFocus
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Contraseña"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          disabled={loading}
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
