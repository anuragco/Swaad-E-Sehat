import React, { useState, useEffect } from 'react';
import { FiGrid, FiList, FiSearch, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { 
  products, 
  sortOptions, 
  sortProducts,
  searchProducts
} from '../data/products';
import './ProductsPage.css';

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    let result = [...products];

    // Apply search
    if (searchTerm.trim()) {
      result = searchProducts(result, searchTerm);
    }

    // Apply sorting
    result = sortProducts(result, sortBy);

    setFilteredProducts(result);
  }, [sortBy, searchTerm]);

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Our Products</h1>
          <p className="page-description">
            Discover our premium collection of natural sweets and dry fruits
          </p>
        </div>

        {/* Controls Section */}
        <div className="products-controls">
          <div className="search-section">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="clear-search-btn"
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>

          <div className="controls-section">
            <div className="sort-controls">
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
              >
                <FiGrid />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List View"
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-section">
          <div className="products-info">
            <p className="products-count">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
          
          <div className={`products-grid ${viewMode}`}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                viewMode={viewMode}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
