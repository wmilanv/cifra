import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function ReporteSolicitudes() {
  const { token } = useContext(AuthContext);
  const [resumen, setResumen] = useState(null);

  useEffect(() => {
    const fetchResumen = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/reportes/solicitudes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResumen(res.data);
      } catch (err) {
        alert('Error al obtener el reporte');
      }
    };

    fetchResumen();
  }, [token]);

  if (!resumen) return <p>Cargando reporte...</p>;

  return (
    <div>
      <h5>Resumen de Solicitudes por Estado</h5>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <span>🟡 Abiertas</span>
          <span>{resumen.abierta || 0}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>🟠 En proceso</span>
          <span>{resumen.en_proceso || 0}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>🟢 Cerradas</span>
          <span>{resumen.cerrada || 0}</span>
        </li>
      </ul>
    </div>
  );
}

export default ReporteSolicitudes;
