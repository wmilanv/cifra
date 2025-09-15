import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import SolicitudForm from '../components/SolicitudForm';
import SolicitudList from '../components/SolicitudList';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const refreshList = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Panel del Cliente</h3>
        <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
      </div>

      <SolicitudForm onCreated={refreshList} />
      <SolicitudList refresh={refresh} />
    </div>
  );
}

export default HomePage;
