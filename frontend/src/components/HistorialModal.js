import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function HistorialModal({ solicitudId, onClose }) {
  const { token } = useContext(AuthContext);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/solicitudes/${solicitudId}/historial`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistorial(res.data);
      } catch (err) {
        alert('Error al cargar historial');
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, [solicitudId, token]);

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">📜 Historial de Cambios</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <p>Cargando historial...</p>
            ) : historial.length === 0 ? (
              <p>No hay cambios registrados aún.</p>
            ) : (
              <table className="table table-sm table-striped">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Usuario</th>
                    <th>Cambio de Estado</th>
                    <th>Cambio de Respuesta</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((h) => (
                    <tr key={h.id}>
                      <td>{new Date(h.createdAt).toLocaleString()}</td>
                      <td>{h.Usuario?.nombre} ({h.Usuario?.rol})</td>
                      <td>
                        {h.estadoAnterior} → <strong>{h.estadoNuevo}</strong>
                      </td>
                      <td>
                        {h.respuestaAnterior !== h.respuestaNueva && (
                          <>
                            <small>{h.respuestaAnterior || '—'}</small>
                            <br />
                            <strong>{h.respuestaNueva || '—'}</strong>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistorialModal;
