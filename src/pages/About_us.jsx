import React from 'react';
import mission from '../images/mission.png'; // Add an appropriate mission image here
import vision from '../images/vision.jpg'; // Add an appropriate vision image here
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gray-100 py-28" style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto text-center bg-opacity-50 bg-gray-900 py-16 rounded-lg">
          <h1 className="text-4xl font-bold mb-8 text-white">About Us</h1>
          <p className="text-lg text-gray-200 mb-8">Get to know more about Afnai Ho, our mission, vision, and the team behind the platform.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="mission-content">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                At Afnai Ho, our mission is to provide a reliable and efficient platform that connects users with trusted local service providers. We aim to make finding and booking home services simple, quick, and hassle-free.
              </p>
              <p className="text-gray-700">
                We believe in supporting local businesses and fostering community connections, ensuring that users receive high-quality services while contributing to the local economy.
              </p>
            </div>
            <div className="mission-image">
              <img src={mission} alt="Our Mission" className="mx-auto max-w-full rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="vision-image">
              <img src={vision} alt="Our Vision" className="mx-auto max-w-full rounded-lg shadow-md" />
            </div>
            <div className="vision-content">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Vision</h2>
              <p className="text-gray-700 mb-6">
                Our vision is to become the leading platform for home services, known for our reliability, quality, and commitment to customer satisfaction. We strive to continuously improve our services and expand our offerings to meet the evolving needs of our users.
              </p>
              <p className="text-gray-700">
                By leveraging technology and innovation, we aim to create a seamless and personalized experience for every user, making Afnai Ho the go-to solution for all home service needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      

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
    </div>
  );
};

export default AboutUs;
