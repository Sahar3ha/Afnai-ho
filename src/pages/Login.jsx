import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { loginUserApi } from '../apis/Api';
import { Link, useNavigate } from "react-router-dom";
import LoginImg from '../images/LoginImg.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password
    };

    loginUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);

          // Set token and user data in local storage
          localStorage.setItem('token', res.data.token);

          // Set user data
          localStorage.setItem('user', JSON.stringify(res.data.userData));

          // Redirect based on user role
          if (!res.data.userData.isAdmin) {
            navigate('/home');
          } else {
            navigate('/transport');
          }
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.error(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover" style={{backgroundImage: `url(${LoginImg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(5px)'}}>
        <h2 className="text-4xl font-bold text-center mb-6">Welcome Back</h2>
        <form className="max-w-[400px] mx-auto" onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="email" id="email" onChange={changeEmail} className="w-full rounded-lg bg-gray-200 py-2 px-4 focus:outline-none" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input type="password" id="password" onChange={changePassword} className="w-full rounded-lg bg-gray-200 py-2 px-4 focus:outline-none" />
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white font-bold py-2 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300">Login</button>
        </form>
        <p className="mt-4 text-center">Don't have an account? <Link to="/register" className="text-blue-500 underline">Sign up here</Link></p>
      </div>
    </div>
  );
};

export default Login;
