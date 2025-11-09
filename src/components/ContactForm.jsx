import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // EmailJS Configuration - Replace these with your EmailJS credentials
  // Get these from https://www.emailjs.com/
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
  // Recipient email - all contact form submissions will be sent here
  const RECIPIENT_EMAIL = 'maazzafar156@gmail.com';

  // Note: EmailJS v3+ doesn't require initialization
  // The public key is passed directly to the send() method

  // Check if EmailJS is configured
  const isEmailJSConfigured = () => {
    return EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' && 
           EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' && 
           EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if EmailJS is configured
    if (!isEmailJSConfigured()) {
      toast.error('Email service not configured. Please set up EmailJS credentials. Check EMAILJS_SETUP.md for instructions.', {
        position: 'top-right',
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('EmailJS not configured. Please set up REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID, and REACT_APP_EMAILJS_PUBLIC_KEY in .env file');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare email template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: formData.subject || 'General Inquiry',
        message: formData.message,
        to_email: RECIPIENT_EMAIL,
        reply_to: formData.email
      };

      // Debug: Log configuration (remove in production)
      console.log('EmailJS Config:', {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY ? `${EMAILJS_PUBLIC_KEY.substring(0, 5)}...` : 'Not set'
      });

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS Response:', response);

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Show success toast message
      toast.success('Message sent successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } catch (error) {
      console.error('Email sending failed:', error);
      console.error('Error details:', {
        status: error.status,
        text: error.text,
        message: error.message
      });
      
      // Provide more specific error messages
      let errorMessage = 'Failed to send message. ';
      
      if (error.text) {
        errorMessage += error.text;
      } else if (error.message) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMessage += 'Network error. Please check your internet connection and EmailJS service status.';
        } else {
          errorMessage += error.message;
        }
      } else if (error.status) {
        errorMessage += `Error ${error.status}: ${error.text || 'Please verify your EmailJS credentials are correct.'}`;
      } else {
        errorMessage += 'Please verify your EmailJS configuration in the .env file and restart the server.';
      }
      
      // Show error toast message
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section">
      <div className="container">
        <div className="contact-form-content">
          <div className="contact-form-header">
            <h2 className="contact-form-title">Get in Touch</h2>
            <p className="contact-form-subtitle">
              Have questions about our products? Want to place a custom order? 
              We'd love to hear from you!
            </p>
          </div>

          <div className="contact-form-wrapper">
            <div className="contact-info-side">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <FiPhone />
                </div>
                <div className="contact-info-text">
                  <h4>Phone</h4>
                  <p>+91 8849978818</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <FiMail />
                </div>
                <div className="contact-info-text">
                  <h4>Email</h4>
                  <p>info@swaad-e-sehat.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <FiMapPin />
                </div>
                <div className="contact-info-text">
                  <h4>Address</h4>
                  <p>Manufacturing & Office Address<br />Delhi, India</p>
                </div>
              </div>
            </div>

            <div className="contact-form-side">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Related</option>
                      <option value="custom">Custom Order</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
