import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiMail, FiPhone, FiPackage } from 'react-icons/fi';
import './OrderConfirmation.css';

const OrderConfirmation = ({ orderData, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-close after 7 seconds
    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      } else {
        navigate('/');
      }
    }, 7000);

    return () => clearTimeout(timer);
  }, [onClose, navigate]);

  if (!orderData) {
    return null;
  }

  const { orderId, amount, paymentMethod } = orderData;

  return (
    <div className="order-confirmation-overlay">
      <div className="order-confirmation-modal">
        <div className="confirmation-content">
          <div className="success-icon-container">
            <div className="success-icon-circle">
              <FiCheckCircle className="success-icon" />
            </div>
          </div>
          
          <div className="confirmation-text">
            <h1 className="confirmation-title">Order Confirmed!</h1>
            <p className="confirmation-subtitle">Thank you for your purchase</p>
          </div>

          <div className="order-details-section">
            <h2 className="order-details-title">Order Details</h2>
            <div className="order-info">
              <div className="info-row">
                <span className="info-label">Order ID:</span>
                <span className="info-value">{orderId}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Amount:</span>
                <span className="info-value">₹{amount.toFixed(2)}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Payment Method:</span>
                <span className="info-value">{paymentMethod}</span>
              </div>
            </div>
          </div>

          <div className="confirmation-messages-box">
            <div className="confirmation-message">
              <FiMail className="message-icon" />
              <span>Confirmation email sent to your registered email</span>
            </div>
            <div className="confirmation-message">
              <FiPhone className="message-icon" />
              <span>SMS confirmation sent to your mobile number</span>
            </div>
            <div className="confirmation-message">
              <FiPackage className="message-icon" />
              <span>Your order will be processed and shipped soon</span>
            </div>
          </div>

          <div className="confirmation-actions">
            <button 
              className="btn btn-primary"
              onClick={() => {
                if (onClose) {
                  onClose();
                } else {
                  navigate('/');
                }
              }}
            >
              Continue Shopping
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                if (onClose) {
                  onClose();
                } else {
                  navigate('/');
                }
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
