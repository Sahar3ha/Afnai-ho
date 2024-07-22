import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Example from '../components/Navbar';
import img from '../images/icons/user.png';
import { toast } from 'react-toastify';
import { deleteUserApi } from '../apis/Api';
const Profile = () => {
  const storedUserData = localStorage.getItem('user');
  const parsedUserData = JSON.parse(storedUserData);
  const { firstName, lastName, email } = parsedUserData;
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUserApi(parsedUserData._id); // Assuming _id is the user's ID
      if (response.data.success) {
        toast.success('Account deleted successfully');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/register'); // Redirect to the registration page or any other appropriate page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error deleting account');
      console.error(error.message);
    }
  };

  return (
    <>
      <Example />
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md relative">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Profile</h2>

          <Link
            to="/updateProfile"
            className="absolute top-6 right-6 bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
          >
            Update Profile
          </Link>

          <div className="flex flex-col items-center mb-6">
            <img
              src={img}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
            <p className="text-lg font-semibold text-gray-900">{`${firstName} ${lastName}`}</p>
            <p className="text-gray-600">{email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/requests" className="block">
              <div className="bg-blue-500 text-white p-6 rounded-md shadow-md text-center hover:bg-blue-600 transition duration-300">
                <h3 className="text-xl font-semibold">Requests</h3>
                <p>View and manage your service requests</p>
              </div>
            </Link>
            <Link to="/favourites" className="block">
              <div className="bg-green-500 text-white p-6 rounded-md shadow-md text-center hover:bg-green-600 transition duration-300">
                <h3 className="text-xl font-semibold">Favourites</h3>
                <p>View your favourite service providers</p>
              </div>
            </Link>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p>Learn more about Afnai Ho, our mission, and the team behind the platform.</p>
              <Link to="/about" className="text-blue-400 hover:text-blue-500">Read More</Link>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Services</h3>
              <p>Discover the wide range of services we offer and find the right professional for your needs.</p>
              <Link to="/services" className="text-blue-400 hover:text-blue-500">Explore Services</Link>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">FAQ</h3>
              <p>Have questions? Find answers to common queries in our FAQ section.</p>
              <Link to="/faq" className="text-blue-400 hover:text-blue-500">Visit FAQ</Link>
            </div>
          </div>
          <p>&copy; 2024 Afnai Ho. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Profile;
