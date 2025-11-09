import React from 'react';
import ContactForm from '../components/ContactForm';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="container">
        {/* Contact Form Section */}
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
