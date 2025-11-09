import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter, FiMessageCircle } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/images/sticker.jpg" alt="Swaad-E-Sehat" className="footer-logo-img" />
              <h3 className="footer-title">Swaad-E-Sehat</h3>
            </div>
            <p className="footer-description">
              Premium quality natural sweets and dry fruit products made with traditional recipes 
              and organic ingredients. Experience the authentic taste of homemade goodness.
            </p>
            <div className="social-links">
              <a href="https://instagram.com/swaad_e._sehat" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiInstagram />
              </a>
              <a href="https://facebook.com/swaad-e-sehat" target="_blank" rel="noopener noreferrer" className="social-link">
                <FiFacebook />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/products" className="footer-link">Products</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Customer Service</h4>
            <ul className="footer-links">
              <li><Link to="/shipping" className="footer-link">Shipping Policy</Link></li>
              <li><Link to="/returns" className="footer-link">Returns & Refunds</Link></li>
              <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact Information</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FiPhone className="contact-icon" />
                <a href="tel:+918178063094" className="contact-link">+91 81780 63094</a>
              </div>
              <div className="contact-item">
                <FiMessageCircle className="contact-icon" />
                <a href="https://wa.me/918178063094" target="_blank" rel="noopener noreferrer" className="contact-link">WhatsApp Business</a>
              </div>
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <a href="mailto:brothersfoodie1@gmail.com" className="contact-link">brothersfoodie1@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="payment-methods">
          <h4 className="payment-title">We Accept</h4>
          <div className="payment-icons">
            <div className="payment-icon" title="Credit/Debit Cards">💳</div>
            <div className="payment-icon" title="Net Banking">🏦</div>
            <div className="payment-icon" title="UPI">📱</div>
            <div className="payment-icon" title="Digital Wallets">💰</div>
            <div className="payment-icon" title="Razorpay">🛒</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2024 Swaad-E-Sehat. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy" className="footer-bottom-link">Privacy</Link>
              <Link to="/terms" className="footer-bottom-link">Terms</Link>
              <Link to="/sitemap" className="footer-bottom-link">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
