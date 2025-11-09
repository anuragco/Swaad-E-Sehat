import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiTruck, FiShield, FiHeart, FiMessageCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../data/products';
import './HomePage.css';

const HomePage = () => {
  const { addToCart } = useCart();
  const featuredProducts = getFeaturedProducts();

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = '8849978818'; // Updated WhatsApp number
    const message = 'Hi! I\'m interested in your natural sweets and dry fruits. Can you help me with more information?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Premium Natural Sweets & 
                <span className="highlight"> Dry Fruits</span>
              </h1>
              <p className="hero-description">
                Experience the authentic taste of traditional homemade sweets and premium dry fruits. 
                Made with 100% natural ingredients and age-old recipes passed down through generations.
              </p>
              <div className="hero-actions">
                <Link to="/products" className="btn btn-primary">
                  Shop Now →
                </Link>
                <Link to="/about" className="btn btn-secondary">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img src="/images/2J1A5029.JPG" alt="Premium Natural Sweets & Dry Fruits" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-description">
              Our best-selling natural sweets and dry fruit products
            </p>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          <div className="section-footer">
            <Link to="/products" className="btn btn-outline">
              View All Products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <FiHeart className="feature-icon" />
              <h3>100% Natural</h3>
              <p>Made with pure, organic ingredients without any artificial preservatives</p>
            </div>
            <div className="feature-item">
              <FiShield className="feature-icon" />
              <h3>Premium Quality</h3>
              <p>Handpicked ingredients ensuring the highest quality standards</p>
            </div>
            <div className="feature-item">
              <FiTruck className="feature-icon" />
              <h3>Free Shipping</h3>
              <p>Free delivery on orders above ₹500 across India</p>
            </div>
            <div className="feature-item">
              <FiStar className="feature-icon" />
              <h3>Traditional Recipes</h3>
              <p>Authentic recipes passed down through generations</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Launch Section */}
      <section className="new-launch">
        <div className="container">
          <div className="new-launch-content">
            <div className="new-launch-text">
              <span className="new-badge">New Launch</span>
              <h2 className="new-launch-title">Dry Fruit Khajur Pak</h2>
              <p className="new-launch-description">
                Our latest creation combines the sweetness of dates with the richness of premium dry fruits. 
                Made using traditional methods and pure ghee, this khajur pak is a perfect blend of taste and health.
              </p>
              <div className="new-launch-features">
                <div className="feature-point">
                  <FiStar className="feature-point-icon" />
                  <span>Made with premium dates</span>
                </div>
                <div className="feature-point">
                  <FiStar className="feature-point-icon" />
                  <span>No artificial sweeteners</span>
                </div>
                <div className="feature-point">
                  <FiStar className="feature-point-icon" />
                  <span>Rich in natural nutrients</span>
                </div>
              </div>
              <Link to="/product/2" className="btn btn-primary">
                Try Now →
              </Link>
            </div>
                <div className="new-launch-image">
                  <img src="/images/MUSCLELADDU.jpg" alt="Dry Fruit Khajur Pak" />
                </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-description">
              Real feedback from our satisfied customers
            </p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"The quality of dry fruits is exceptional. Fresh, natural, and exactly as described. Highly recommended!"</p>
              </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">PS</div>
                    <div className="author-info">
                      <h4>Priya Sharma</h4>
                      <span>Delhi</span>
                    </div>
                  </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"The khajur pak is absolutely delicious! It reminds me of my grandmother's recipe. Will definitely order again."</p>
              </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">RK</div>
                    <div className="author-info">
                      <h4>Rajesh Kumar</h4>
                      <span>Mumbai</span>
                    </div>
                  </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                <p>"Fast delivery and excellent packaging. The products arrived fresh and the taste is authentic. Great service!"</p>
              </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">AS</div>
                    <div className="author-info">
                      <h4>Anita Singh</h4>
                      <span>Bangalore</span>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Experience Natural Goodness?</h2>
            <p className="cta-description">
              Order now and get 10% off on your first purchase. Free shipping on orders above ₹500.
            </p>
            <div className="cta-actions">
              <Link to="/products" className="btn btn-primary btn-large">
                Shop Now <FiArrowRight />
              </Link>
              <Link to="/about" className="btn btn-outline btn-large">
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <div className="whatsapp-float" onClick={handleWhatsAppContact}>
        <FiMessageCircle className="whatsapp-icon" />
        <span className="whatsapp-text">Chat with us</span>
      </div>
    </div>
  );
};

export default HomePage;
