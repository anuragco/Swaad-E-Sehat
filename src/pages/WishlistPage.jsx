import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2, FiLoader } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { getProductBySlug } from '../data/products';

// Helper function to normalize product price from different data structures
const normalizeProductPrice = (product) => {
  // Check for base_price first (from product list API), then fall back to first variant price (from single product API)
  const firstVariant = product.variants?.[0];
  const price = product.base_price || product.salePrice || product.price || firstVariant?.price || 0;
  // For originalPrice, use the same source as price to ensure consistent discount calculations
  const originalPrice = product.base_original_price || product.originalPrice || firstVariant?.originalPrice || price;
  return { price, originalPrice, hasDiscount: originalPrice > price };
};

const WishlistPage = () => {
  const { wishlistRefs, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRemoveInvalidProduct = useCallback((productId) => {
    removeFromWishlist(productId);
  }, [removeFromWishlist]);

  // Fetch fresh product data from API when wishlist refs change
  useEffect(() => {
    const fetchProducts = async () => {
      if (wishlistRefs.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Fetch all products in parallel
        const productPromises = wishlistRefs.map(ref => getProductBySlug(ref.slug));
        const fetchedProducts = await Promise.all(productPromises);
        
        // Filter out null results (products that no longer exist)
        const validProducts = fetchedProducts.filter(product => product !== null);
        
        // Collect invalid product IDs first, then remove them
        const validProductIds = new Set(validProducts.map(p => p.id));
        const invalidRefs = wishlistRefs.filter(ref => !validProductIds.has(ref.id));
        invalidRefs.forEach(ref => handleRemoveInvalidProduct(ref.id));
        
        setProducts(validProducts);
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [wishlistRefs, handleRemoveInvalidProduct]);

  // --- Handlers ---
  const handleAddToCart = (e, product, quantity = 1) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, quantity);
    removeFromWishlist(product.id);
  };

  const handleRemoveFromWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromWishlist(productId);
  };

  // --- Loading State ---
  if (loading) {
    return (
      <div className="w-full bg-slate-50 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col items-center justify-center text-center bg-white p-12 rounded-xl shadow-sm">
            <FiLoader className="w-12 h-12 text-amber-500 animate-spin mb-4" />
            <p className="text-lg text-slate-500">Loading your wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  // --- 1. Empty Wishlist State ---
  if (products.length === 0) {
    return (
      <div className="w-full bg-slate-50 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col items-center justify-center text-center bg-white p-12 rounded-xl shadow-sm border border-dashed border-slate-300">
            <FiHeart className="w-20 h-20 text-red-300 mb-6" />
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-lg text-slate-500 mb-8 max-w-md">
              You haven't added any products to your wishlist yet. Start browsing to find items you'll love.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. Populated Wishlist State ---
  return (
    <div className="w-full bg-slate-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-4xl font-bold font-serif text-slate-900">My Wishlist</h1>
            <p className="text-lg text-slate-500 mt-2">
              {products.length} {products.length === 1 ? 'item' : 'items'} in your wishlist
            </p>
          </div>
          <button 
            className="flex items-center justify-center sm:justify-start gap-2 px-5 py-2.5 font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all"
            onClick={clearWishlist}
          >
            <FiTrash2 className="w-5 h-5" />
            <span>Clear Wishlist</span>
          </button>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <WishlistItem 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
              onRemove={handleRemoveFromWishlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Helper Component for each Wishlist Item ---
const WishlistItem = ({ product, onAddToCart, onRemove }) => {
  const [quantity, setQuantity] = useState(1);
  
  // Initialize selectedVariant with the first variant or null
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || null
  );
  
  // Get price from selected variant, or fall back to normalized price
  const variantPrice = selectedVariant?.price;
  const variantOriginalPrice = selectedVariant?.originalPrice ?? variantPrice;
  const { price: normalizedPrice, originalPrice: normalizedOriginalPrice } = normalizeProductPrice(product);
  
  const price = variantPrice ?? normalizedPrice;
  const originalPrice = variantOriginalPrice ?? normalizedOriginalPrice;
  const hasDiscount = originalPrice > price;
  
  // Get stock from selected variant or product level
  const currentStock = selectedVariant?.stock ?? product.stock ?? 0;
  const isOutOfStock = currentStock === 0;

  const handleQuantityChange = (delta) => {
    const maxStock = currentStock || 999; // Default to 999 if stock not defined
    setQuantity(prev => {
      const newQty = prev + delta;
      return Math.max(1, Math.min(newQty, maxStock));
    });
  };

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setQuantity(1); // Reset quantity when variant changes
  };

  const handleAddToCartWithQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Pass product with selected variant data for cart
    const productForCart = {
      ...product,
      price: price,
      originalPrice: originalPrice,
      variant: selectedVariant?.variant_id_str || selectedVariant?.id || 'default',
      variantName: selectedVariant?.name || null,
    };
    onAddToCart(e, productForCart, quantity);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      
      {/* Image */}
      <div className="relative md:w-1/4 lg:w-1/5 flex-shrink-0">
        <Link to={`/product/${product.slug || product.id}`}>
          <img 
            src={product.images?.[0] || product.image} 
            alt={product.name}
            className="w-full h-48 md:h-full object-cover"
          />
        </Link>
        <button 
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-white"
          onClick={(e) => onRemove(e, product.id)}
          aria-label="Remove from wishlist"
        >
          <FiHeart className="w-5 h-5 fill-current" />
        </button>
      </div>

      {/* Info */}
      <div className="p-6 flex-1 flex flex-col">
        <Link to={`/product/${product.slug || product.id}`}>
          <h2 className="text-xl font-semibold text-slate-800 hover:text-amber-600 mb-2">
            {product.name}
          </h2>
        </Link>
        
        {/* Description (optional) */}
        {product.description && (
          <p className="text-sm text-slate-500 mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Variant Selection (Size/Weight Options) */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-slate-700 mb-2">
              Select Size: <span className="font-semibold text-slate-800">{selectedVariant?.name || 'N/A'}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant, index) => (
                <button
                  key={variant.id || index}
                  className={`px-3 py-1.5 rounded-md border text-sm transition-all ${
                    selectedVariant?.id === variant.id
                      ? 'bg-amber-100 border-amber-500 ring-1 ring-amber-500 text-slate-800'
                      : 'bg-white border-slate-300 hover:border-slate-500 text-slate-700'
                  }`}
                  onClick={() => handleVariantChange(variant)}
                >
                  <span className="font-medium">{variant.name}</span>
                  <span className="text-slate-600 ml-1.5">₹{variant.price}</span>
                  {variant.originalPrice != null && variant.originalPrice > variant.price && (
                    <span className="text-slate-400 line-through ml-1">₹{variant.originalPrice}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-slate-900">₹{price}</span>
          {hasDiscount && (
            <span className="text-md text-slate-500 line-through">₹{originalPrice}</span>
          )}
        </div>

        {/* Stock Status */}
        {isOutOfStock && (
          <p className="font-semibold text-red-600 mb-4">
            Currently Out of Stock
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto pt-4 border-t border-slate-100">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <button 
              className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-slate-300 text-slate-700 hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1 || isOutOfStock}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-12 text-center font-semibold text-lg text-slate-900">
              {quantity}
            </span>
            <button 
              className="w-9 h-9 flex items-center justify-center rounded-lg border-2 border-slate-300 text-slate-700 hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              onClick={() => handleQuantityChange(1)}
              disabled={isOutOfStock || quantity >= (currentStock || 999)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          
          <button 
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAddToCartWithQuantity}
            disabled={isOutOfStock}
          >
            <FiShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
          <Link 
            to={`/product/${product.slug || product.id}`}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 font-semibold text-amber-600 border-2 border-amber-500 rounded-lg hover:bg-amber-50 transition-all"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;