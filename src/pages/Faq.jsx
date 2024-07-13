import React, { useState } from 'react';
import Example from '../components/Navbar'; // Assuming you have a Navbar component
import faqImage from '../images/faq.jpg'; // Import your FAQ background image
import { Link } from 'react-router-dom'; // Import Link for navigation

const faqs = [
  {
    question: "What is Afnai Ho?",
    answer: "Afnai Ho is a platform that connects users with local service providers for various home services, including plumbing, cleaning, electrical work, and more. Our goal is to make finding reliable service providers easy and convenient."
  },
  {
    question: "How does Afnai Ho work?",
    answer: "Users can browse through a list of service providers, view their profiles and reviews, and request services directly through the app. Service providers can accept or reject requests based on their availability."
  },
  {
    question: "Is Afnai Ho available in my area?",
    answer: "Afnai Ho is continually expanding its service areas. You can check if we are available in your area by entering your location on our website or app."
  },
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Example />
      <div className="bg-gray-100 min-h-screen">
        <div
          className="bg-cover bg-center"
          style={{ backgroundImage: `url(${faqImage})`, minHeight: '300px' }}
        >
          <div className="bg-black bg-opacity-50 h-80 flex items-center justify-center text-center">
            <h2 className="text-4xl font-semibold text-white">Frequently Asked Questions (FAQ)</h2>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-8 bg-white rounded-md shadow-lg -mt-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">FAQs</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6">
              <button
                className="w-full text-left py-3 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
                onClick={() => handleToggle(index)}
              >
                {faq.question}
              </button>
              {activeIndex === index && (
                <div className="p-4 mt-2 bg-gray-100 rounded-md shadow-md">
                  <p className="text-gray-800">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
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

export default FaqPage;
