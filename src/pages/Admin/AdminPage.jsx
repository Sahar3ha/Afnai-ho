import React, { useEffect, useState } from 'react';
import { getFeedbackApi, getUserList, getServiceProvidersApi } from '../../apis/Api';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('feedbacks');
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeSection === 'feedbacks') {
      fetchFeedbacks();
    } else if (activeSection === 'userlist') {
      fetchUsers();
    } else if (activeSection === 'providerlist') {
      fetchProviders();
    }
  }, [activeSection]);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await getFeedbackApi();
      setReviews(response.data.reviews || []);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUserList();
      setUsers(response.data.users || []);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const response = await getServiceProvidersApi();
      setProviders(response.data.providers || []);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleMenuClick = (menu) => {
    setActiveSection(menu.src.toLowerCase());
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login'); 
  };

  const Menus = [
    { title: 'Feedbacks', src: 'Feedbacks' },
    { title: 'User List', src: 'Userlist' },
    { title: 'Provider List', src: 'Providerlist' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'feedbacks':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Feedbacks</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : reviews.length === 0 ? (
              <p className="text-gray-600">No feedbacks available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((feedback) => (
                  <div key={feedback._id} className="bg-white p-6 rounded-md shadow-md">
                    <p className="text-gray-800 font-semibold">{feedback.feedback}</p>
                    <p className="text-gray-600 text-sm mt-2">Provider: {feedback.providerId.firstName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'userlist':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">User List</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : users.length === 0 ? (
              <p className="text-gray-600">No users available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <div key={user._id} className="bg-white p-6 rounded-md shadow-md">
                    <p className="text-gray-800 font-semibold">{user.firstName} {user.lastName}</p>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                    {/* Add more user details as needed */}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'providerlist':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Provider List</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : providers.length === 0 ? (
              <p className="text-gray-600">No providers available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map((provider) => (
                  <div key={provider._id} className="bg-white p-6 rounded-md shadow-md">
                    <p className="text-gray-800 font-semibold">{provider.firstName} {provider.lastName}</p>
                    <p className="text-gray-600 text-sm">{provider.email}</p>
                    {/* Add more provider details as needed */}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return <div>Feedbacks Content</div>;
    }
  };

  return (
    <div className="flex">
      <div className="w-72 duration-200 h-screen pt-8 p-5 bg-gray-900 relative">
        <div className="flex gap-x-4 items-center">
          <h1 className="text-white origin-left font-medium text-xl duration-200">Admin Panel</h1>
        </div>
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <li
              key={index}
              onClick={() => handleMenuClick(menu)}
              className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-400 rounded-md ${menu.gap ? 'mt-9' : 'mt-2'}`}
            >
              <span className="origin-left duration-200">{menu.title}</span>
            </li>
          ))}
          <li
            onClick={handleLogout}
            className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-400 rounded-md mt-2"
          >
            <span className="origin-left duration-200">Logout</span>
          </li>
        </ul>
      </div>
      <div className="flex flex-col justify-center items-center w-full p-8 bg-gray-100">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPage;
