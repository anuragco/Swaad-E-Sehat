import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCreditCard, FiLock, FiSmartphone, FiGrid, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'razorpay' // Default to Razorpay instead of COD
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('Razorpay script loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Razorpay payment functions
  const initiateRazorpayPayment = async () => {
    setIsProcessing(true);
    
    try {
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        setIsProcessing(false);
        alert('Payment gateway not loaded. Please refresh the page and try again.');
        return;
      }

      const totalAmount = getCartTotal();
      const orderId = `ORDER_${Date.now()}`;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag', // Replace with your live key // Test key - replace with your live key for production
        amount: totalAmount * 100, // Amount in paise
        currency: 'INR',
        name: 'Swaad-E-Sehat',
        description: 'Premium Dry Fruits & Sweets',
        image: '/images/sticker.jpg',
        // Remove order_id to let Razorpay create the order automatically
        handler: function (response) {
          console.log('Payment successful:', response);
          setIsProcessing(false);
          
          // Send order confirmation
          sendOrderConfirmation();
          
          // Payment successful
          const orderData = {
            orderId: response.razorpay_order_id || orderId,
            amount: totalAmount,
            paymentMethod: 'Razorpay',
            paymentId: response.razorpay_payment_id,
            customerInfo: formData,
            items: items
          };
          
          // Clear cart and navigate to homepage
          clearCart();
          navigate('/');
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: process.env.REACT_APP_MERCHANT_PHONE || '8849978818'
        },
        notes: {
          address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
          order_id: orderId,
          merchant_name: process.env.REACT_APP_MERCHANT_NAME || 'Swaad-E-Sehat',
          merchant_phone: process.env.REACT_APP_MERCHANT_PHONE || '8849978818',
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_email: formData.email,
          customer_phone: formData.phone
        },
        theme: {
          color: '#28a745'
        },
        retry: {
          enabled: true,
          max_count: 3
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
            setIsProcessing(false);
          }
        },
        method: {
          netbanking: true,
          wallet: true,
          emi: true,
          upi: true,
          card: true
        }
      };

      console.log('Opening Razorpay with options:', {
        key: options.key,
        amount: options.amount,
        currency: options.currency,
        name: options.name,
        description: options.description,
        merchant_name: 'Swaad-E-Sehat'
      });

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        setIsProcessing(false);
        
        // Specific handling for UPI errors
        if (response.error.code === 'BAD_REQUEST_ERROR' && response.error.description.includes('UPI')) {
          alert('UPI payment failed. This might be due to test environment limitations. Please try using Card payment or Cash on Delivery for now.');
        } else if (response.error.description && response.error.description.includes('invalid UPI ID')) {
          alert('UPI payment is not available in test mode. Please use Card payment or Cash on Delivery instead.');
        } else {
          alert(`Payment failed: ${response.error.description || 'Unknown error occurred'}`);
        }
      });

      razorpay.on('payment.authorized', function (response) {
        console.log('Payment authorized:', response);
      });

      razorpay.open();
    } catch (error) {
      console.error('Error opening Razorpay:', error);
      setIsProcessing(false);
      alert('Failed to open payment gateway. Please try again.');
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const sendOrderConfirmation = async () => {
    try {
        const orderData = {
          orderId: `QR_${Date.now()}`,
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          amount: calculateTotal(),
          items: items,
          paymentMethod: qrPaymentMethod,
          upiId: '8849978818@ptyes',
          timestamp: new Date().toISOString()
        };

      // Send confirmation email (simulated - in real app, call your backend API)
      console.log('Sending order confirmation:', orderData);
      
      // Simulate sending confirmation message
      if (formData.email) {
        // In a real application, you would send an email via your backend
        console.log(`Email sent to ${formData.email} with order confirmation`);
      }
      
      if (formData.phone) {
        // In a real application, you would send SMS via your backend
        console.log(`SMS sent to ${formData.phone} with order confirmation`);
      }

      // Store order in localStorage for demo purposes
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

    } catch (error) {
      console.error('Error sending confirmation:', error);
    }
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      if (formData.paymentMethod === 'razorpay') {
        // Handle Razorpay payment
        await initiateRazorpayPayment();
        setIsProcessing(false);
        return;
      } else {
        // Handle COD payment
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Send order confirmation
        sendOrderConfirmation();
        
        // Clear cart and redirect to home page
        clearCart();
        navigate('/');
      }
    } catch (error) {
      console.error('Order processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1 className="page-title">Checkout</h1>
          <p className="page-description">Complete your order securely</p>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <form className="checkout-form">
              {/* Personal Information */}
              <div className="form-section">
                <h3 className="section-title">
                  <FiUser className="section-icon" />
                  Personal Information
                </h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? 'error' : ''}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'error' : ''}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="form-section">
                <h3 className="section-title">
                  <FiMapPin className="section-icon" />
                  Shipping Address
                </h3>
                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? 'error' : ''}
                    placeholder="Enter your complete address"
                    rows="3"
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'error' : ''}
                      placeholder="Enter your city"
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={errors.state ? 'error' : ''}
                      placeholder="Enter your state"
                    />
                    {errors.state && <span className="error-message">{errors.state}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="pincode">Pincode *</label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={errors.pincode ? 'error' : ''}
                      placeholder="Enter pincode"
                    />
                    {errors.pincode && <span className="error-message">{errors.pincode}</span>}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="form-section">
                <h3 className="section-title">
                  <FiCreditCard className="section-icon" />
                  Payment Method
                </h3>
                
                <div className="payment-options">
                  {/* Razorpay - Active */}
                  <div 
                    className={`payment-option ${formData.paymentMethod === 'razorpay' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'razorpay' }))}
                  >
                    <div className="payment-option-header">
                      <div className="payment-icon">💳</div>
                      <div className="payment-details">
                        <h4>Razorpay</h4>
                        <p>Pay with cards, wallets, net banking</p>
                      </div>
                      <div className="payment-status">
                        <span className="status-check">✓</span>
                        <span className="status-text">Available</span>
                      </div>
                    </div>
                    <div className="razorpay-benefits">
                      <span className="benefit">✓ Secure online payments</span>
                      <span className="benefit">✓ Multiple payment options</span>
                      <span className="benefit">✓ Instant confirmation</span>
                    </div>
                  </div>

                  {/* Cash on Delivery - Working */}
                  <div 
                    className={`payment-option ${formData.paymentMethod === 'cod' ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                  >
                    <div className="payment-option-header">
                      <div className="payment-icon">💰</div>
                      <div className="payment-details">
                        <h4>Cash on Delivery (COD)</h4>
                        <p>Pay when your order arrives at your doorstep</p>
                      </div>
                      <div className="payment-status">
                        <span className="status-check">✓</span>
                        <span className="status-text">Available</span>
                      </div>
                    </div>
                    <div className="cod-benefits">
                      <span className="benefit">✓ No online payment required</span>
                      <span className="benefit">✓ Pay with cash or card</span>
                      <span className="benefit">✓ Safe and secure</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="order-summary-section">
            <div className="order-summary">
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="order-items">
                {items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-info">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-details">
                        <h4 className="item-name">{item.name}</h4>
                        <p className="item-quantity">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>GST (18%)</span>
                  <span>₹{calculateTax().toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span className="free-shipping">FREE</span>
                </div>
                <div className="total-divider"></div>
                <div className="total-row final-total">
                  <span>Total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                className="btn btn-primary btn-large checkout-btn"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <FiLock />
                    Processing Order...
                  </>
                ) : (
                  <>
                    <FiCreditCard />
                    Place Order (COD) - ₹{calculateTotal().toFixed(2)}
                  </>
                )}
              </button>

              <div className="security-info">
                <FiLock className="security-icon" />
                <span>Your order information is secure and encrypted</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
