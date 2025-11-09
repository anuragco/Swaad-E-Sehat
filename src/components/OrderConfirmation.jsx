import React from 'react';
import { FiCheckCircle, FiMail, FiPhone, FiPackage } from 'react-icons/fi';
import './OrderConfirmation.css';

const OrderConfirmation = ({ orderData, onClose }) => {
  if (!orderData) return null;

  return (
    <div className="order-confirmation-overlay">
      <div className="order-confirmation-modal">
        <div className="confirmation-header">
          <FiCheckCircle className="success-icon" />
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase</p>
        </div>

        <div className="confirmation-content">
          <div className="order-details">
            <h3>Order Details</h3>
            <div className="detail-row">
              <span className="label">Order ID:</span>
              <span className="value">{orderData.orderId}</span>
            </div>
            <div className="detail-row">
              <span className="label">Amount:</span>
              <span className="value">₹{orderData.amount?.toFixed(2) || orderData.total?.toFixed(2)}</span>
            </div>
            <div className="detail-row">
              <span className="label">Payment Method:</span>
              <span className="value">{orderData.paymentMethod || 'QR Code Payment'}</span>
            </div>
          </div>

          <div className="confirmation-message">
            <div className="message-item">
              <FiMail className="message-icon" />
              <span>Confirmation email sent to your registered email</span>
            </div>
            <div className="message-item">
              <FiPhone className="message-icon" />
              <span>SMS confirmation sent to your mobile number</span>
            </div>
            <div className="message-item">
              <FiPackage className="message-icon" />
              <span>Your order will be processed and shipped soon</span>
            </div>
          </div>

          <div className="confirmation-actions">
            <button className="btn btn-primary" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
