import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="wishlist-empty">
            <div className="empty-icon">
              <FiHeart />
            </div>
            <h2>Your Wishlist is Empty</h2>
            <p>Add some products to your wishlist to see them here.</p>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p className="wishlist-count">{wishlist.length} item(s) in your wishlist</p>
          <button 
            className="btn btn-secondary clear-wishlist-btn"
            onClick={clearWishlist}
          >
            <FiTrash2 />
            Clear Wishlist
          </button>
        </div>

        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div key={product.id} className="wishlist-item">
              <div className="wishlist-item-image">
                <img 
                  src={product.images?.[0] || product.image} 
                  alt={product.name}
                />
                <button 
                  className="remove-wishlist-btn"
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  aria-label="Remove from wishlist"
                >
                  <FiHeart className="filled" />
                </button>
              </div>
              
              <div className="wishlist-item-info">
                <h3 className="wishlist-item-name">{product.name}</h3>
                <p className="wishlist-item-description">{product.description}</p>
                
                <div className="wishlist-item-pricing">
                  {product.salePrice < product.price ? (
                    <>
                      <span className="current-price">₹{product.salePrice}</span>
                      <span className="original-price">₹{product.price}</span>
                    </>
                  ) : (
                    <span className="current-price">₹{product.price}</span>
                  )}
                </div>

                <div className="wishlist-item-actions">
                  <button 
                    className="btn btn-primary add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FiShoppingCart />
                    Add to Cart
                  </button>
                  <Link 
                    to={`/product/${product.slug || product.id}`}
                    className="btn btn-outline view-product-btn"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
