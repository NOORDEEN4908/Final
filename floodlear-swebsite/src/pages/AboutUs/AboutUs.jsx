import React from 'react'
import banner2 from '../../assets/freepik__retouch__83993.png';

const AboutUs = () => {
  return (
    <div>
    {/* Hero Section */}
    <div className="hero-section" style={{ backgroundImage: `url(${banner2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1>A Reliable Flood Alert System for Akurana</h1>
      <p >Stay safe with real-time updates, rainfall monitoring, and instant alerts.</p>
      <button>Learn More</button>
    </div>

    {/* Call to Action Section */}
    <div className="cta-section" >
      <h2>You Have the Power to Stay Safe!</h2>
      <p>Act now and be prepared for unexpected floods.</p>
      <button>Sign Up for Alerts</button>
    </div>

    {/* Service Grid Section */}
    <div className="services-grid">
      <div className="service-card">
        <h3>Real-time Weather Updates</h3>
        <p>Accurate weather updates to keep you informed.</p>
      </div>
      <div className="service-card">
        <h3>Rainfall Monitoring</h3>
        <p>Track rainfall patterns with detailed data.</p>
      </div>
      <div className="service-card">
        <h3>Flood Alerts</h3>
        <p>Get instant flood alerts using Twilio notifications.</p>
      </div>
      <div className="service-card">
        <h3>Community Support</h3>
        <p>Connect with others and share information during emergencies.</p>
      </div>
    </div>

    {/* Community Section */}
    <div className="community-section">
      <h2>Join Our Community Effort</h2>

    </div>

    {/* Internal CSS */}
    <style>{`
      .hero-section {

        color: white;
        padding: 100px 20px;
        text-align: center;
             font-size: 40px;
      }
            .hero-section  p{
             padding-top: 90px;
            }    

      .cta-section {
        background-color: #f0f4f8;
        padding: 60px 20px;
        text-align: center;
      }

      .services-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin: 40px 20px;
      }

      .service-card {
        background-color: #e0f7fa;
        padding: 20px;
        border-radius: 12px;
      }

      .community-section {
        margin-top: 60px;
        text-align: center;
        padding-bottom: 40px;
      }

      img {
        width: 80%;
        border-radius: 12px;
      }

      button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 8px;
      }
    `}</style>
  </div>
  )
}

export default AboutUs
