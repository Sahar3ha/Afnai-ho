import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import logo from '../images/AfnaiHo.png'; 

const ProviderNavbar = () => {
  const navigate = useNavigate();



  const handleLogout = () => {
    
    localStorage.clear('user'); 
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/">
            <img src={logo} alt="Afnai Ho Logo" className=" h-16" />
          </Link>
        </div>
        <div className="space-x-4">
          <Link to="/providerHome" className="text-white hover:text-gray-300 transition duration-300">My Requests</Link>
          <Link to="/providerProfile" className="text-white hover:text-gray-300 transition duration-300">Profile</Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ProviderNavbar;
