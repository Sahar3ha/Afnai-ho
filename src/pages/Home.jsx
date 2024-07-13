import React from 'react';
import plumber from '../images/plumber.jpg';
import electrician from '../images/electrician.jpg';
import homepage from '../images/homepage.jpg';
import services from '../images/services.png';
import painter from '../images/painter.jpg';
import gardener from '../images/gardener.jpg';
import cleaner from '../images/cleaner.jpg';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      <Navbar />

      {/* Hero section */}
      <section className="relative bg-gray-100 py-28" style={{ backgroundImage: `url(${homepage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto text-center bg-opacity-50 bg-gray-900 py-16 rounded-lg">
          <h1 className="text-4xl font-bold mb-8 text-white">Find Trusted Local Services</h1>
          <p className="text-lg text-gray-200 mb-8">Discover skilled professionals for all your home service needs</p>
          <Link to="/services" className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold transition duration-300">Get Started</Link>
        </div>
      </section>

      {/* About Us section */}
      <section className="bg-white py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="about-us-content">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Afnai Ho?</h2>
              <p className="text-gray-700 mb-6">
                Afnai Ho connects you with trusted local service providers quickly and effortlessly. We offer a range of services from plumbing and electrical work to painting, gardening, and cleaning. Each provider is thoroughly vetted to ensure quality and reliability, giving you peace of mind. Our platform supports local businesses and fosters community connections. Choose Afnai Ho for a seamless and personalized service experience.
              </p>
            </div>
            <div className="about-us-image">
              <img src={services} alt="About Us" className="mx-auto max-w-full rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Service Card */}
            {[
              { image: plumber, title: "Plumber Services", description: "Expert plumbing services to fix leaks, install fixtures, and more." },
              { image: electrician, title: "Electrician Services", description: "Professional electrical services for safe and efficient solutions." },
              { image: painter, title: "Painter Services", description: "Quality painting services to beautify your home or office." },
              { image: gardener, title: "Gardener Services", description: "Skilled gardening services to maintain and enhance your garden." },
              { image: cleaner, title: "House Cleaning Services", description: "Reliable house cleaning services for a spotless home." }
            ].map((service, index) => (
              <div key={index} className="service flex border border-gray-200 rounded-lg p-6 bg-white shadow-lg">
                <div className="service-image flex-none mr-6">
                  <img src={service.image} alt={service.title} className="w-40 h-auto rounded-lg" />
                </div>
                <div className="service-description">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-700">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Now button section */}
      <section className="bg-blue-500 py-10 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book a Service?</h2>
          <Link to="/services" className="inline-block bg-white hover:bg-gray-200 text-blue-500 py-3 px-8 rounded-lg font-semibold transition duration-300">Book Now</Link>
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

export default Home;
