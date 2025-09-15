import React, { useEffect, useState, useContext,useCallback  } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import HistorialModal from './HistorialModal';
function SolicitudSoporteList() {
  const { token } = useContext(AuthContext);
  const [solicitudes, setSolicitudes] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [historialSolicitudId, setHistorialSolicitudId] = useState(null);

const fetchSolicitudes = useCallback(async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/solicitudes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSolicitudes(res.data);
  } catch (err) {
    alert('Error al cargar solicitudes');
  }
}, [token]);

  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);

  const handleChange = (id, field, value) => {
    setRespuestas({
      ...respuestas,
      [id]: {
        ...respuestas[id],
        [field]: value,
      },
    });
  };

  const handleUpdate = async (id) => {
    try {
      const data = respuestas[id];
      if (!data || (!data.estado && !data.respuesta)) {
        alert('Debes ingresar una respuesta o estado');
        return;
      }

      await axios.put(`${process.env.REACT_APP_API_URL}/solicitudes/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Solicitud actualizada');
      fetchSolicitudes();
    } catch (err) {
      alert('Error al actualizar');
    }
  };

  return (
    <div>
      <h5>Solicitudes Asignadas</h5>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes asignadas.</p>
      ) : (
        <ul className="list-group">
          {solicitudes.map((s) => (
            <li key={s.id} className="list-group-item mb-3">
              <strong>{s.titulo}</strong> <br />
              Descripción: {s.descripcion} <br />
              Estado actual: <strong>{s.estado}</strong> <br />
              Respuesta actual: {s.respuesta || 'Ninguna'} <br />

              <select
                className="form-select mt-2"
                onChange={(e) => handleChange(s.id, 'estado', e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Cambiar estado
                </option>
                <option value="abierta">Abierta</option>
                <option value="en_proceso">En Proceso</option>
                <option value="cerrada">Cerrada</option>
              </select>

              <textarea
                className="form-control mt-2"
                placeholder="Escribe una respuesta"
                onChange={(e) => handleChange(s.id, 'respuesta', e.target.value)}
              />

              <button
                className="btn btn-primary mt-2"
                onClick={() => handleUpdate(s.id)}
              >
                Actualizar
              </button>
                <button
        className="btn btn-outline-secondary btn-sm me-2"
        onClick={() => setHistorialSolicitudId(s.id)}
      >
        Ver Historial
      </button>
            </li>
          ))}
        </ul>
      )}{historialSolicitudId && (
  <HistorialModal
    solicitudId={historialSolicitudId}
    onClose={() => setHistorialSolicitudId(null)}
  />
)}
    </div>
    
  );
  
}

export default SolicitudSoporteList;
