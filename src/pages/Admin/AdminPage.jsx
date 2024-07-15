import React, { useEffect, useState } from 'react';
import { getFeedbackApi, getUserList, getServiceProvidersApi } from '../../apis/Api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    toast.success('Logged out successfully');
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
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-600">Error: {error}</div>
            ) : reviews.length === 0 ? (
              <div className="text-center text-gray-600">No feedbacks available.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((feedback) => (
                  <div key={feedback._id} className="bg-white p-6 rounded-md shadow-md hover:shadow-lg transition-shadow">
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
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-600">Error: {error}</div>
            ) : users.length === 0 ? (
              <div className="text-center text-gray-600">No users available.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase">Name</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 border-b border-gray-300">{user.firstName} {user.lastName}</td>
                        <td className="px-6 py-4 border-b border-gray-300">{user.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      case 'providerlist':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Provider List</h2>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-600">Error: {error}</div>
            ) : providers.length === 0 ? (
              <div className="text-center text-gray-600">No providers available.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase">Name</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase">Email</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 uppercase">Service</th>
                    </tr>
                  </thead>
                  <tbody>
                    {providers.map((provider) => (
                      <tr key={provider._id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 border-b border-gray-300">{provider.firstName} {provider.lastName}</td>
                        <td className="px-6 py-4 border-b border-gray-300">{provider.email}</td>
                        <td className="px-6 py-4 border-b border-gray-300">{provider.service}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      default:
        return <div>Feedbacks Content</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-72 h-screen bg-gray-900 text-white p-5">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <ul>
          {Menus.map((menu, index) => (
            <li
              key={index}
              onClick={() => handleMenuClick(menu)}
              className={`p-4 hover:bg-gray-700 cursor-pointer ${activeSection === menu.src.toLowerCase() ? 'bg-gray-700' : ''}`}
            >
              {menu.title}
            </li>
          ))}
          <li
            onClick={handleLogout}
            className="p-4 hover:bg-gray-700 cursor-pointer mt-2"
          >
            Logout
          </li>
        </ul>
      </div>
      <div className="flex-grow p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPage;
