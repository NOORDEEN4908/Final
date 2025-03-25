import React from 'react'

const Footer = () => {
  return (
    <footer className="footer-container">
    <div className="footer-links">
      <div className="footer-section">
    
        <a href="/contact">Contact Us</a>
        <a href="/support">Support Forum</a>
        <a href="/trial">Free Trial</a>
      </div>
      <div className="footer-section">
      
        <a href="/careers">Careers</a>
        <a href="/blog">Our Blog</a>
        <a href="/affiliates">Affiliates</a>
      </div>
      <div className="footer-section">
       
        <a href="/eula">EULA</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms & Conditions</a>
      </div>
      <div className="footer-section contact-info">
        <h4>Contact Us</h4>
        <p>6A Hampstead High Street, London, UK</p>
        <p>+44 7859 20 801</p>
        <p>Email: support@akuranafloodalerts.lk</p>
      </div>
    </div>
    <div className="footer-socials">
      <a href="#"><i className="fab fa-facebook"></i></a>
      <a href="#"><i className="fab fa-twitter"></i></a>
      <a href="#"><i className="fab fa-instagram"></i></a>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2025 Akurana Flood Alert System. All rights reserved.</p>
    </div>

    {/* Internal CSS */}
    <style>{`
      .footer-container {
        background-color: #013220;
        color: white;
        padding: 40px 20px;
      }

      .footer-links {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
      }

      .footer-section h4 {
        margin-bottom: 10px;
      }

      .footer-section a {
        display: block;
        color: #b0e57c;
        margin-bottom: 8px;
        text-decoration: none;
      }

      .footer-socials a {
        color: white;
        margin: 0 10px;
        font-size: 20px;
      }

      .footer-bottom {
        text-align: center;
        margin-top: 20px;
      }
    `}</style>
  </footer>
  )
}

export default Footer
