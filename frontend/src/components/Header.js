import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { logout, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-light bg-light px-4 mb-4">
      <span className="navbar-text">Rol actual: {role || 'Sin rol'}</span>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Header;
