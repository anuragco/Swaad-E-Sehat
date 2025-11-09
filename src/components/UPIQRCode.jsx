import React from 'react';
import './UPIQRCode.css';

const UPIQRCode = ({ amount, upiId, merchantName, orderId }) => {
  // Generate UPI payment URL
  const generateUPIURL = () => {
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Order ${orderId}`)}`;
    return upiUrl;
  };

  // Generate QR code using Google Charts API
  const generateQRCode = () => {
    const upiUrl = generateUPIURL();
    const qrCodeUrl = `https://chart.googleapis.com/chart?chs=300x300&chld=L|0&cht=qr&chl=${encodeURIComponent(upiUrl)}`;
    return qrCodeUrl;
  };

  const handleCopyUPIId = () => {
    navigator.clipboard.writeText(upiId);
    alert('UPI ID copied to clipboard!');
  };

  const handleOpenUPIApp = () => {
    const upiUrl = generateUPIURL();
    window.open(upiUrl, '_blank');
  };

  return (
    <div className="upi-qr-container">
      <div className="qr-header">
        <h3>Scan QR Code to Pay</h3>
        <p>Use any UPI app to scan and pay</p>
      </div>
      
      <div className="qr-code-section">
        <div className="qr-code-wrapper">
          <img 
            src={generateQRCode()} 
            alt="UPI QR Code" 
            className="qr-code-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="qr-fallback" style={{ display: 'none' }}>
            <div className="qr-placeholder">
              <div className="qr-placeholder-text">QR Code</div>
              <div className="qr-placeholder-amount">₹{amount}</div>
            </div>
          </div>
        </div>
        
        <div className="payment-details">
          <div className="detail-row">
            <span className="detail-label">Amount:</span>
            <span className="detail-value">₹{amount}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">UPI ID:</span>
            <span className="detail-value">{upiId}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Merchant:</span>
            <span className="detail-value">{merchantName}</span>
          </div>
        </div>
      </div>

      <div className="payment-actions">
        <button 
          className="btn btn-primary"
          onClick={handleOpenUPIApp}
        >
          Open UPI App
        </button>
        <button 
          className="btn btn-secondary"
          onClick={handleCopyUPIId}
        >
          Copy UPI ID
        </button>
      </div>

      <div className="payment-instructions">
        <h4>How to Pay:</h4>
        <ol>
          <li>Open any UPI app (PhonePe, Google Pay, Paytm, etc.)</li>
          <li>Scan the QR code above</li>
          <li>Enter the amount: ₹{amount}</li>
          <li>Complete the payment</li>
        </ol>
      </div>
    </div>
  );
};

export default UPIQRCode;
