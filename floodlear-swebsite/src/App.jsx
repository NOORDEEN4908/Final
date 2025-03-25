import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Akurana from './pages/Akurana/Akurana';
import AboutUs from './pages/AboutUs/AboutUs';
import OurServices from './pages/OurServices/OurServices';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Footer from './components/Footer/Footer';




const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);  // Update login status after successful login
    setShowLogin(false);  // Close the login popup
  };

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} onLoginSuccess={handleLoginSuccess} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/akurana" element={<Akurana />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<OurServices />} />
        </Routes>
   <Footer />
      </div>
    </>
  );
};

export default App;
