import React from 'react';
import './OurServices.css';     
import banner1 from '../../assets/banner1.png';

const OurServices = () => {
  const services = ['Climate Predicting', 'Research', 'Survey', 'Soil Research', 'Waste Collection', 'Dumpster Rental'];

  return (
    <div>
      {/* Header Section */}
      <header className="header-section" style={{ backgroundImage: `url(${banner1})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
        <h1>Our Services</h1>
        <p>Home {'>'} Our Services</p>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Featured Services</h2>
        <h3>Explore our wide range of services</h3>

        <div className="service-cards">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="icon-placeholder">🌿</div>
              <h4>{service}</h4>
              <p>Providing reliable and efficient solutions for all your needs.</p>
       
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="logo"></div>
        <div className="subscribe">
          <label>Subscribe now</label>
          <input type="email" placeholder="Your email" />
          <button>Subscribe</button>
        </div>
      </section>
    </div>
  );
};

export default OurServices;
