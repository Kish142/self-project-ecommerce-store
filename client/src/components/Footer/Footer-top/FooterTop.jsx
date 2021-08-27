import React from 'react';

import './FooterTop.styles.scss';

import { FaFacebookSquare } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';

const FooterTop = () => {
  return (
    <div className='footer-top'>
      <div className='logo-text'>
        <h1 className='logo'>LOGO</h1>
        <p className='text'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non
          blanditiis reiciendis dicta quaerat doloremque amet?
        </p>
        <div className='social-icons'>
          <FaFacebookSquare />
          <FaInstagram />
          <FaYoutube />
          <FaTwitterSquare />
        </div>
      </div>

      <div className='quik-links'>
        <h3 className='title'>Quik Links</h3>
         <ul className='link'>
          <li>Men's Wears</li>
          <li>Women's Wears</li>
          <li>Kids</li>
          <li>Accessories</li>
          <li>Gifts</li>
          <li>Gadgets</li>
        </ul>
      </div>

      <div className='services'>
        <h3 className='title'>Services</h3>
         <ul className='link'>
          <li>My Account</li>
          <li>My Orders</li>
          <li>Our Guarantees</li>
          <li>Terms And Conditions</li>
          <li>Order Status</li>
        </ul>
      </div>

      <div className='about-us'>
        <h3 className='title'>About Us</h3>
         <ul className='link'>
          <li>About Us</li>
          <li>Customer Service</li>
          <li>Returns</li>
          <li>Terms & Conditions</li>
          <li>Return Policy</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      <div className='get-help'>
        <h3 className='title'>Get Help</h3>
         <ul className='link'>
          <li>Shipping & Delivery</li>
          <li>Brand</li>
          <li>Payment Options</li>
          <li>Returns & Claims</li>
          <li>Cancellation Policy</li>
        </ul>
      </div>
    </div>
  );
};

export default FooterTop;
