import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Navbar = ({ setShowLogin, isLoggedIn }) => {
  const [menu, setMenu] = useState('home');

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt='Logo' className='logo' /></Link>
      
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
        <Link to='/akurana' onClick={() => setMenu('akurana')} className={menu === 'akurana' ? 'active' : ''}>Akurana</Link>
        <Link to='/about' onClick={() => setMenu('about')} className={menu === 'about' ? 'active' : ''}>About Us</Link>
        <Link to='/services' onClick={() => setMenu('services')} className={menu === 'services' ? 'active' : ''}>Our Services</Link>
      </ul>
 
      <div className='navbar-right'>
       

        {/* Only show Sign In button if the user is not logged in */}
        {!isLoggedIn && (
          <button onClick={() => { 
            console.log("Sign In clicked");
            setShowLogin(true);  // Show the login popup
          }}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
