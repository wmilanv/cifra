import React, { useEffect, useState, useContext,useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function SolicitudList({ refresh }) {
  const { token } = useContext(AuthContext);
  const [solicitudes, setSolicitudes] = useState([]);
console.log('TOKEN QUE SE ENVÍA:', token);
  const fetchSolicitudes = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/solicitudes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSolicitudes(res.data);
    } catch (err) {
      console.log(err)
      alert('Error al cargar solicitudes');
    }
}, [token]);

  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);

  return (
    <div>
      <h5>Mis Solicitudes</h5>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes.</p>
      ) : (
        <ul className="list-group">
          {solicitudes.map((s) => (
            <li key={s.id} className="list-group-item">
              <strong>{s.titulo}</strong> <br />
              Estado: {s.estado} <br />
              Respuesta: {s.respuesta || 'Pendiente'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SolicitudList;
