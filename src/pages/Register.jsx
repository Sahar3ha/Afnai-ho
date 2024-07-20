import React, { useState } from 'react';
import { createUserApi } from '../apis/Api';
import registerImg from '../images/Register.jpg';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const changeFirstname = (e) => {
    setFirstName(e.target.value);
  }

  const changeLastname = (e) => {
    setLastname(e.target.value);
  }

  const changeEmail = (e) => {
    setEmail(e.target.value);
  }

  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  const validateName = (name) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateName(firstname) || !validateName(lastname)) {
      toast.error("Names cannot contain numbers or special characters.");
      return;
    }

    const data = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password
    }

    createUserApi(data)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate('/login');
        }
      })
      .catch(err => {
        toast.error("Server error");
        console.error(err.message);
      });
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${registerImg})` }}></div>
      <div className="flex justify-center items-center md:w-1/2 p-8 bg-gray-200 bg-opacity-70 backdrop-filter backdrop-blur-lg">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-4xl font-bold text-center mb-6">Sign Up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstname" className="block text-gray-700">Firstname</label>
              <input onChange={changeFirstname} className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:outline-none" type="text" id="firstname" placeholder="Enter your firstname" required />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-gray-700">Lastname</label>
              <input onChange={changeLastname} className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:outline-none" type="text" id="lastname" placeholder="Enter your lastname" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input onChange={changeEmail} className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:outline-none" type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input onChange={changePassword} className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:outline-none" type="password" id="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" className="w-full mt-6 bg-teal-500 text-white font-bold py-2 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300">Sign Up</button>
            <p className="mt-4 text-center">Already have an account? <a href="/login" className="text-blue-500 underline">Sign in here</a></p>
            <p className="mt-4 text-center">Register as a service provider <a href="/provider" className="text-blue-500 underline">Sign in here</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
