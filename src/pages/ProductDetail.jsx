import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiShare2, FiMinus, FiPlus, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { getProductBySlug, getProductById } from '../data/products';
import { toast } from 'react-toastify';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const product = getProductBySlug(id) || getProductById(parseInt(id));

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="product-not-found">
            <h1>Product Not Found</h1>
            <p>The product you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/products')} className="btn btn-primary">
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (quantity <= 0) {
      toast.error('Please select a quantity greater than 0');
      return;
    }
    const variant = product.variants[selectedVariant];
    const productToAdd = {
      ...product,
      price: variant.price,
      salePrice: variant.price,
      originalPrice: variant.originalPrice,
      variant: variant.id,
      variantName: variant.name,
      image: product.images?.[0] || product.image || '/images/placeholder.jpg'
    };
    
    addToCart(productToAdd, quantity);
    toast.success(`${product.name} (${variant.name}) added to cart!`);
  };

  const handleBuyNow = () => {
    if (quantity <= 0) {
      toast.error('Please select a quantity greater than 0');
      return;
    }
    handleAddToCart();
    navigate('/cart');
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    const maxStock = product.variants[selectedVariant]?.stock || product.stock || 10;
    if (newQuantity >= 0 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
    }
  };

  const discountPercentage = Math.round(((product.price - product.salePrice) / product.price) * 100);
  const currentStock = product.variants[selectedVariant]?.stock || product.stock || 0;

  return (
    <div className="product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/products">Products</a>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="product-main-image"
              />
              {discountPercentage > 0 && (
                <div className="discount-badge">{discountPercentage}% OFF</div>
              )}
            </div>
            
            <div className="thumbnail-images">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <div className="product-badges">
                {product.isNew && <span className="badge badge-new">New</span>}
                {product.isBestSeller && <span className="badge badge-bestseller">Best Seller</span>}
              </div>
              
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                    />
                  ))}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Variants */}
            <div className="product-variants">
              <h3 className="variants-title">Select Size:</h3>
              <div className="variants-list">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    className={`variant-btn ${selectedVariant === index ? 'active' : ''}`}
                    onClick={() => setSelectedVariant(index)}
                  >
                    <span className="variant-name">{variant.name}</span>
                    <span className="variant-price">₹{variant.price}</span>
                    {variant.originalPrice > variant.price && (
                      <span className="variant-original-price">₹{variant.originalPrice}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="product-pricing">
              <div className="current-price">₹{product.variants[selectedVariant].price}</div>
              {product.variants[selectedVariant].originalPrice > product.variants[selectedVariant].price && (
                <div className="original-price">₹{product.variants[selectedVariant].originalPrice}</div>
              )}
            </div>

            {/* Quantity and Add to Cart Section */}
            <div className="quantity-cart-section">
              <div className="product-quantity">
                <h3 className="quantity-title">Quantity:</h3>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 0}
                  >
                    <FiMinus />
                  </button>
                  <input
                    type="number"
                    min="0"
                    max={currentStock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                    className="quantity-input"
                  />
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= currentStock}
                  >
                    <FiPlus />
                  </button>
                </div>
                <span className="stock-info">
                  {currentStock} items in stock
                </span>
              </div>

              <div className="product-actions-main">
                <button 
                  className="btn btn-primary btn-large btn-add-to-cart" 
                  onClick={handleAddToCart}
                  disabled={quantity <= 0}
                >
                  <FiShoppingCart />
                  Add to Cart
                </button>
                <button className="btn btn-secondary btn-large" onClick={handleBuyNow} disabled={quantity <= 0}>
                  Buy Now
                </button>
                <button 
                  className={`btn btn-outline ${isWishlisted ? 'wishlisted' : ''}`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <FiHeart />
                  {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                </button>
                <button className="btn btn-outline">
                  <FiShare2 />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Section with Features */}
        <div className="product-description-section">
          <div className="description-content">
            <h2>Description</h2>
            <p className="description-text">{product.detailedDescription || product.description}</p>
          </div>
          
          {/* Feature Highlights */}
          <div className="product-features-highlights">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FiTruck className="feature-icon" />
              </div>
              <span className="feature-text">Free shipping on orders above ₹500</span>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FiShield className="feature-icon" />
              </div>
              <span className="feature-text">100% natural ingredients</span>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FiRefreshCw className="feature-icon" />
              </div>
              <span className="feature-text">Easy returns within 7 days</span>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button 
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-header ${activeTab === 'ingredients' ? 'active' : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
            <button 
              className={`tab-header ${activeTab === 'benefits' ? 'active' : ''}`}
              onClick={() => setActiveTab('benefits')}
            >
              Benefits
            </button>
            <button 
              className={`tab-header ${activeTab === 'nutrition' ? 'active' : ''}`}
              onClick={() => setActiveTab('nutrition')}
            >
              Nutrition Facts
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <p>{product.detailedDescription}</p>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="tab-panel">
                <h3>Ingredients:</h3>
                <ul className="ingredients-list">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="tab-panel">
                <h3>Health Benefits:</h3>
                <ul className="benefits-list">
                  <li>Rich in essential vitamins and minerals</li>
                  <li>Natural source of energy</li>
                  <li>Supports heart health</li>
                  <li>Boosts immune system</li>
                  <li>No artificial preservatives</li>
                </ul>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="tab-panel">
                <h3>Nutrition Facts (per 100g):</h3>
                <div className="nutrition-facts">
                  <div className="nutrition-item">
                    <span className="nutrition-label">Calories</span>
                    <span className="nutrition-value">{product.nutritionalInfo.calories}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Protein</span>
                    <span className="nutrition-value">{product.nutritionalInfo.protein}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Fat</span>
                    <span className="nutrition-value">{product.nutritionalInfo.fat}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Carbohydrates</span>
                    <span className="nutrition-value">{product.nutritionalInfo.carbs}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-label">Fiber</span>
                    <span className="nutrition-value">{product.nutritionalInfo.fiber}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
