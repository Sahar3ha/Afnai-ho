import React from 'react';
import plumber from '../images/plumber.jpg';
import electrician from '../images/electrician.jpg';
import homepage from '../images/homepage.jpg';

import Example from '../components/Navbar';

const Home = () => {
  return (
    <div className="font-sans">
      <Example />

      {/* Hero section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Find Trusted Local Services</h1>
          <p className="text-lg text-gray-700 mb-8">Discover skilled professionals for all your home service needs</p>
          <img src={homepage} alt="Placeholder" className="mx-auto max-w-full" />
        </div>
      </section>

      {/* Services section */}
      <section className="bg-white py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Plumber service */}
            <div className="service flex border border-gray-200 rounded-lg p-6">
              <div className="service-image flex-none mr-6">
                <img src={plumber} alt="Plumber" className="w-40 h-auto" />
              </div>
              <div className="service-description">
                <h3 className="text-xl font-semibold mb-3">Plumber Services</h3>
                <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla risus a libero pharetra tincidunt.</p>
              </div>
            </div>

            {/* Electrician service */}
            <div className="service flex border border-gray-200 rounded-lg p-6">
              <div className="service-image flex-none mr-6">
                <img src={electrician} alt="Electrician" className="w-40 h-auto" />
              </div>
              <div className="service-description">
                <h3 className="text-xl font-semibold mb-3">Electrician Services</h3>
                <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla risus a libero pharetra tincidunt.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 text-center">
        <p>&copy; 2024 Afnai Ho. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
