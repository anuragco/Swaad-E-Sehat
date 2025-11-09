import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiEye, FiPackage } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, viewMode = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [quantity, setQuantity] = useState(0);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productToAdd = {
      ...product,
      price: selectedVariant?.price || product.salePrice || product.price,
      originalPrice: selectedVariant?.originalPrice || product.price,
      variant: selectedVariant?.id || 'default',
      variantName: selectedVariant?.name || 'Default',
      image: product.images?.[0] || product.image || '/images/placeholder.jpg'
    };
    
    onAddToCart(productToAdd, quantity);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setQuantity(0); // Reset quantity when variant changes
  };

  const handleQuantityChange = (newQuantity) => {
    const maxQuantity = selectedVariant?.stock || product.stock || 10;
    if (newQuantity >= 0 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const discountPercentage = Math.round(((product.price - product.salePrice) / product.price) * 100);
  const currentPrice = selectedVariant?.price || product.salePrice || product.price;
  const originalPrice = selectedVariant?.originalPrice || product.price;
  const currentStock = selectedVariant?.stock || product.stock || 0;

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''} ${viewMode}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.slug || product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.images?.[0] || product.image} 
            alt={product.name}
            className="product-image"
          />
          
          {/* Badges */}
          <div className="product-badges">
            {product.isNew && <span className="badge badge-new">New</span>}
            {product.isBestSeller && <span className="badge badge-bestseller">Best Seller</span>}
            {discountPercentage > 0 && (
              <span className="badge badge-discount">{discountPercentage}% OFF</span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="product-actions">
            <button 
              className="action-btn wishlist-btn"
              onClick={handleWishlist}
              aria-label="Add to Wishlist"
            >
              <FiHeart className={isWishlisted ? 'filled' : ''} />
            </button>
            <button 
              className="action-btn quick-view-btn"
              aria-label="Quick View"
            >
              <FiEye />
            </button>
          </div>
        </div>

        <div className="product-info">
          <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            
            {/* Stock Information */}
            <div className="stock-info">
              <FiPackage className="stock-icon" />
              <span className={`stock-text ${currentStock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {currentStock > 0 ? `${currentStock} in stock` : 'Out of stock'}
              </span>
            </div>
            
            {/* Pricing */}
            <div className="product-pricing">
              {currentPrice < originalPrice ? (
                <>
                  <span className="current-price">₹{currentPrice}</span>
                  <span className="original-price">₹{originalPrice}</span>
                </>
              ) : (
                <span className="current-price">₹{currentPrice}</span>
              )}
            </div>

            {/* Quantity Selector */}
            {currentStock > 0 && (
              <div className="quantity-selector">
                <label className="quantity-label">Qty:</label>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleQuantityChange(quantity - 1);
                    }}
                    disabled={quantity <= 0}
                  >
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleQuantityChange(quantity + 1);
                    }}
                    disabled={quantity >= currentStock}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <button 
              className={`add-to-cart-btn ${currentStock === 0 ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={currentStock === 0}
            >
              <FiShoppingCart />
              {currentStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
