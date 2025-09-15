import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ReporteSolicitudes from '../components/ReporteSolicitudes';
import UserManagement from '../components/UserManagement';
function AdminPage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Panel de Administrador</h3>
        <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
      </div>

      <ReporteSolicitudes />
       <UserManagement />
    </div>
  );
}

export default AdminPage;
