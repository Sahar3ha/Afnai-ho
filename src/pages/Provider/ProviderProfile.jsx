import React from 'react';
import { Link } from 'react-router-dom';
import ProviderNavbar from '../../components/ProviderNavbar';

const ProviderProfile = () => {
  const storedUserData = localStorage.getItem('user');
  const parsedUserData = JSON.parse(storedUserData);
  const { firstName, lastName, email } = parsedUserData;

  return (
    <>
      <ProviderNavbar />
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg relative">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Profile</h2>

          <Link
            to="/updateProviderProfile"
            className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Update Profile
          </Link>

          <div className="flex flex-col items-center mb-8">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 shadow-md"
            />
            <p className="text-2xl font-semibold text-gray-700">{`${firstName} ${lastName}`}</p>
            <p className="text-lg text-gray-500">{email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderProfile;
