import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiUser, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const { wishlistCount } = useWishlist();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src="/images/sticker.jpg" alt="Swaad-E-Sehat" className="logo-img" />
            <span className="logo-text">Swaad-E-Sehat</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <ul className="nav-list">
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/products" className="nav-link">Products</Link></li>
              <li><Link to="/about" className="nav-link">About Us</Link></li>
              <li><Link to="/contact" className="nav-link">Contact</Link></li>
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            {/* User Account */}
            <Link to="/account" className="header-icon" aria-label="Account">
              <FiUser />
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="header-icon wishlist-icon" aria-label="Wishlist">
              <FiHeart />
              {wishlistCount > 0 && (
                <span className="wishlist-badge">{wishlistCount}</span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="header-icon cart-icon" aria-label="Shopping Cart">
              <FiShoppingCart />
              {getCartItemsCount() > 0 && (
                <span className="cart-badge">{getCartItemsCount()}</span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle" 
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="nav-mobile">
            <ul className="nav-mobile-list">
              <li><Link to="/" className="nav-mobile-link" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/products" className="nav-mobile-link" onClick={toggleMenu}>Products</Link></li>
              <li><Link to="/about" className="nav-mobile-link" onClick={toggleMenu}>About Us</Link></li>
              <li><Link to="/contact" className="nav-mobile-link" onClick={toggleMenu}>Contact</Link></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
