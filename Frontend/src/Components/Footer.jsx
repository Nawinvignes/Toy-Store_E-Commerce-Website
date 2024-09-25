import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about-us">
          <h2>About Us</h2>
          <p>We are a toy store dedicated to providing the best toys for kids of all ages. Explore our range of products and find the perfect toy for your little one!</p>
        </div>
        <div className="footer-section contact-us">
          <h2>Contact Us</h2>
          <ul>
            <li>Email: <a href="mailto:nawinvignesh2005@gmail.com">nawinvignesh2005@gmail.com</a></li>
            <li>Phone: <a href="tel:+917871784499">+91 7871784499</a></li>
            <li>Address: Plot No: 95, Venkatesa Nagar 5th Street, Lion City EXTN Thirunagar, Madurai-625006</li>
          </ul>
        </div>
        <div className="footer-section follow-us">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
        <div className="footer-section contact-form">
          <h2>Send Us a Message</h2>
          <form className="form">
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Toy Store. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;