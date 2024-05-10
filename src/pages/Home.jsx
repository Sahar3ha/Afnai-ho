import React from 'react';
import plumber from '../images/plumber.jpg';
import electrician from '../images/electrician.jpg';
import homepage from '../images/homepage.jpg';

import Example from '../components/Navbar';

const Home = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <Example />

      {/* Hero section */}
      <section style={{ backgroundColor: '#f7f7f7', padding: '100px 0' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '40px' }}>Find Trusted Local Services</h1>
          <p style={{ fontSize: '1.2rem', textAlign: 'center', color: '#555', marginBottom: '40px' }}>Discover skilled professionals for all your home service needs</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={homepage} alt="Placeholder" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        </div>
      </section>

      {/* Services section */}
      <section style={{ padding: '100px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px' }}>Our Services</h2>
          <div className="service" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px', border: '1px solid #ccc', borderRadius: '5px', padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
            <div className="service-image" style={{ flex: '0 0 30%', marginRight: '20px' }}>
              <img src={plumber} alt="Plumber" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            <div className="service-description" style={{ flex: '1' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Plumber Services</h3>
              <p style={{ fontSize: '1.2rem', color: '#555' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla risus a libero pharetra tincidunt.</p>
            </div>
          </div>
          <div className="service" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '40px', border: '1px solid #ccc', borderRadius: '5px', padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
            <div className="service-image" style={{ flex: '0 0 30%', marginRight: '20px' }}>
              <img src={electrician} alt="Electrician" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
            <div className="service-description" style={{ flex: '1' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Electrician Services</h3>
              <p style={{ fontSize: '1.2rem', color: '#555' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla risus a libero pharetra tincidunt.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#333', color: '#fff', padding: '50px 0', textAlign: 'center' }}>
        <p>&copy; 2024 Afnai Ho. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
