import React from 'react';
import { Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal, 
    getCartItemsCount,
    clearCart 
  } = useCart();

  const handleQuantityChange = (id, variant, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id, variant);
    } else {
      updateQuantity(id, newQuantity, variant);
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const calculateDiscount = () => {
    return items.reduce((total, item) => {
      if (item.originalPrice > item.price) {
        return total + ((item.originalPrice - item.price) * item.quantity);
      }
      return total;
    }, 0);
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-header">
            <h1 className="page-title">Shopping Cart</h1>
            <Link to="/products" className="continue-shopping">
              <FiArrowLeft />
              Continue Shopping
            </Link>
          </div>
          
          <div className="empty-cart">
            <div className="empty-cart-content">
              <FiShoppingBag className="empty-cart-icon" />
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              
              {/* Featured Muscle Laddu */}
              <div className="featured-product">
                <div className="featured-product-image">
                  <img src="/images/MUSCLELADDU.jpg" alt="Muscle Laddu" />
                </div>
                <div className="featured-product-info">
                  <h3>Try Our Premium Muscle Laddu</h3>
                  <p>Packed with protein and premium dry fruits</p>
                  <Link to="/products" className="btn btn-primary">
                    Add to Cart
                  </Link>
                </div>
              </div>
              
              <Link to="/products" className="btn btn-secondary">
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1 className="page-title">Shopping Cart ({getCartItemsCount()} items)</h1>
          <Link to="/products" className="continue-shopping">
            <FiArrowLeft />
            Continue Shopping
          </Link>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map((item, index) => (
              <div key={`${item.id}-${item.variant}-${index}`} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.image || (item.images && item.images[0]) || '/images/placeholder.jpg'} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.onerror = null;
                    }}
                    loading="lazy"
                  />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  {item.variantName && item.variantName !== 'Default' && (
                    <p className="item-variant">Size: {item.variantName}</p>
                  )}
                  
                  <div className="item-pricing">
                    <span className="current-price">₹{item.price}</span>
                    {item.originalPrice > item.price && (
                      <span className="original-price">₹{item.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="item-quantity">
                  <label htmlFor={`quantity-${index}`}>Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.variant, item.quantity - 1)}
                    >
                      <FiMinus />
                    </button>
                    <input
                      id={`quantity-${index}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, item.variant, parseInt(e.target.value) || 1)}
                      className="quantity-input"
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.variant, item.quantity + 1)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                <div className="item-total">
                  <span className="total-price">₹{item.price * item.quantity}</span>
                </div>

                <div className="item-actions">
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id, item.variant)}
                    aria-label="Remove item"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal ({getCartItemsCount()} items)</span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                
                {calculateDiscount() > 0 && (
                  <div className="summary-row discount">
                    <span>Discount</span>
                    <span>-₹{calculateDiscount().toFixed(2)}</span>
                  </div>
                )}
                
                <div className="summary-row">
                  <span>GST (18%)</span>
                  <span>₹{calculateTax().toFixed(2)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-shipping">FREE</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="summary-actions">
                <Link to="/checkout" className="btn btn-primary btn-large">
                  Proceed to Checkout
                </Link>
                <button 
                  className="btn btn-outline"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>

              <div className="summary-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">🚚</span>
                  <span>Free shipping on orders above ₹500</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🔒</span>
                  <span>Secure payment processing</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">↩️</span>
                  <span>Easy returns within 7 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
