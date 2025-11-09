import React from 'react';
import { FiHeart, FiShield, FiAward, FiUsers, FiClock, FiStar } from 'react-icons/fi';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        {/* Our Story */}
        <section className="our-story">
          <div className="story-content">
            <div className="story-text">
              <h2 className="section-title">Our Story</h2>
              <p className="story-description">
                Swaad-e-Sehat was born out of a passion for pure, homemade sweets that remind you of your mother's kitchen. What started as a simple home experiment soon turned into a heartfelt journey to bring wholesome, preservative-free sweets to everyone who values both flavor and fitness.
              </p>
            </div>
            <div className="story-image">
              <img src="/images/CHANA (2).JPG" alt="Our Story" />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="our-values">
          <div className="values-header">
            <h2 className="section-title">Our Values</h2>
            <p className="section-description">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="values-grid">
            <div className="value-card">
              <FiHeart className="value-icon" />
              <h3 className="value-title">Homemade with Love</h3>
              <p className="value-description">
                Fresh preparation upon order, no factory production, no preservatives, and the warmth of home.
              </p>
            </div>
            
            <div className="value-card">
              <FiShield className="value-icon" />
              <h3 className="value-title">Pure Ingredients</h3>
              <p className="value-description">
                Premium dry fruits, super seeds, desi khaand, and desi ghee to ensure products are nutritious, rich, and authentic.
              </p>
            </div>
            
            <div className="value-card">
              <FiAward className="value-icon" />
              <h3 className="value-title">Healthy Indulgence</h3>
              <p className="value-description">
                Natural energy boosters, full of proteins, healthy fats, and essential nutrients, rather than just treats.
              </p>
            </div>
            
            <div className="value-card">
              <FiUsers className="value-icon" />
              <h3 className="value-title">Tradition Meets Modern Taste</h3>
              <p className="value-description">
                Recipes blend the wisdom of our grandmothers' recipes with today's health-conscious choices.
              </p>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="our-process">
          <div className="process-header">
            <h2 className="section-title">Our Process</h2>
            <p className="section-description">
              How we create our premium products
            </p>
          </div>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Careful Selection</h3>
                <p className="step-description">
                  We handpick the finest dry fruits and ingredients from trusted suppliers, 
                  ensuring only the best quality reaches our kitchen.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Traditional Preparation</h3>
                <p className="step-description">
                  Our skilled artisans prepare each product using traditional methods and 
                  age-old recipes, maintaining authenticity and taste.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Quality Control</h3>
                <p className="step-description">
                  Every batch undergoes rigorous quality checks to ensure consistency, 
                  freshness, and adherence to our high standards.
                </p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3 className="step-title">Fresh Delivery</h3>
                <p className="step-description">
                  We package our products carefully and deliver them fresh to your doorstep, 
                  maintaining the quality and taste you expect.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-us">
          <div className="choose-content">
            <div className="choose-text">
              <h2 className="section-title">Why Choose Swaad-E-Sehat?</h2>
              <div className="reasons-list">
                <div className="reason-item">
                  <FiStar className="reason-icon" />
                  <div className="reason-content">
                    <h3>Authentic Taste</h3>
                    <p>Experience the true flavors of traditional Indian sweets and dry fruits</p>
                  </div>
                </div>
                
                <div className="reason-item">
                  <FiClock className="reason-icon" />
                  <div className="reason-content">
                    <h3>Fresh Daily</h3>
                    <p>All our products are made fresh daily to ensure maximum freshness and taste</p>
                  </div>
                </div>
                
                <div className="reason-item">
                  <FiShield className="reason-icon" />
                  <div className="reason-content">
                    <h3>Health Benefits</h3>
                    <p>Our natural products provide essential nutrients and health benefits</p>
                  </div>
                </div>
                
                <div className="reason-item">
                  <FiAward className="reason-icon" />
                  <div className="reason-content">
                    <h3>Trusted Brand</h3>
                    <p>Join thousands of satisfied customers who trust us for quality products</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="choose-image">
              <img src="/images/CHANA DRYFRUIT PINNI.JPG" alt="Why Choose Us" />
            </div>
          </div>
        </section>

        {/* Our Promise */}
        <section className="our-promise">
          <div className="promise-content">
            <h2 className="section-title">Our Promise</h2>
            <div className="promise-text">
              <p className="promise-description">
                At Swaad-e-Sehat, every product is made with honesty, purity, and care — the same way we prepare food for our family.
              </p>
              <p className="promise-description">
                From ingredient selection to final packaging, we ensure freshness, hygiene, and love in every step.
              </p>
              <p className="promise-description">
                Whether you're gifting someone, satisfying a craving, or simply choosing a healthier lifestyle — Swaad-e-Sehat is here to make every moment a little sweeter, naturally.
              </p>
            </div>
          </div>
        </section>

        {/* From Our Home to Yours */}
        <section className="home-to-yours">
          <div className="home-content">
            <h2 className="section-title">From Our Home to Yours</h2>
            <p className="home-description">
              Thank you for being a part of our journey.
            </p>
            <p className="home-description">
              We hope our sweets bring you the same comfort, joy, and nourishment that we feel while making them. Because at Swaad-e-Sehat, it's not just about taste — it's about Sehat (Health), Swaad (Flavour), and pure Dil se (From the heart). 💛
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <div className="cta-content">
            <h2 className="cta-title">Experience the Difference</h2>
            <p className="cta-description">
              Join thousands of satisfied customers who have made Swaad-E-Sehat 
              their trusted choice for natural sweets and dry fruits.
            </p>
            <div className="cta-actions">
              <a href="/products" className="btn btn-primary">Shop Now</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
