import React, { useState } from 'react';
import { createProviderApi, createUserApi } from '../apis/Api';
import registerImg from '../images/Register.jpg';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ServiceProvider = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [service, setService] = useState('');
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

  const changeService = (e) => {
    setService(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
      service: service
    }

    createUserApi(data)
      .then((res) => {
        if (res.data.success === false) {
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
    <div className="flex justify-end h-screen bg-cover bg-center" style={{ backgroundImage: `url(${registerImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <div className="bg-gray-200 bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-6">Sign Up</h2>
        <form className="max-w-[400px] mx-auto">
          <label htmlFor="firstname" className="block text-gray-700">Firstname</label>
          <input onChange={changeFirstname} className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:outline-none" type="text" id="firstname" placeholder="Enter your firstname" />
          <label htmlFor="lastname" className="block text-gray-700 mt-4">Lastname</label>
          <input onChange={changeLastname} className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:outline-none" type="text" id="lastname" placeholder="Enter your lastname" />
          <label htmlFor="email" className="block text-gray-700 mt-4">Email</label>
          <input onChange={changeEmail} className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:outline-none" type="email" id="email" placeholder="Enter your email" />
          <label htmlFor="password" className="block text-gray-700 mt-4">Password</label>
          <input onChange={changePassword} className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:outline-none" type="password" id="password" placeholder="Enter your password" />
          <label htmlFor="service" className="block text-gray-700 mt-4">Service</label>
          <select onChange={changeService} className="w-full rounded-lg bg-gray-100 mt-2 p-2 focus:outline-none" id="service">
            <option value="">Select Service</option>
            <option value="plumber">Plumber</option>
            <option value="electrician">Electrician</option>
            <option value="cleaner">Cleaner</option>
          </select>
          <button onClick={handleSubmit} className="w-full mt-6 bg-teal-500 text-white font-bold py-2 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300">Sign Up</button>
          <p className="mt-4 text-center">Already have an account? <a href="/login" className="text-blue-500 underline">Sign in here</a></p>
        </form>
      </div>
    </div>
  );
}

export default ServiceProvider;
