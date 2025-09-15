import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SolicitudSoporteList from '../components/SolicitudSoporteList';

function SoportePage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Panel de Soporte</h3>
        <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
      </div>

      <SolicitudSoporteList />
    </div>
  );
}

export default SoportePage;
