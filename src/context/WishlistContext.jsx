import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';

const WishlistContext = createContext();

const WISHLIST_STORAGE_KEY = 'swaad_wishlist';
const WISHLIST_EXPIRY_DAYS = 30; // Wishlist data expires after 30 days
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

// Store only product references (id and slug) to keep data fresh
const getStoredWishlistRefs = () => {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    const items = parsed?.items;
    const expiry = parsed?.expiry;
    
    // Check if wishlist has expired
    if (expiry && Date.now() > expiry) {
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
      return [];
    }
    
    return Array.isArray(items) ? items : [];
  } catch (error) {
    console.error('Error loading wishlist from localStorage:', error);
    return [];
  }
};

const saveWishlistRefsToStorage = (items) => {
  try {
    const expiry = Date.now() + (WISHLIST_EXPIRY_DAYS * MILLISECONDS_PER_DAY);
    // Store only id and slug references, not full product data
    const refs = items.map(item => ({ id: item.id, slug: item.slug }));
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify({ items: refs, expiry }));
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error);
  }
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Item already in wishlist
      }
      // Store only id and slug reference
      return [...state, { id: action.payload.id, slug: action.payload.slug }];
    
    case 'REMOVE_FROM_WISHLIST':
      return state.filter(item => item.id !== action.payload);
    
    case 'CLEAR_WISHLIST':
      return [];
    
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlistRefs, dispatch] = useReducer(wishlistReducer, undefined, getStoredWishlistRefs);
  const isInitialMount = useRef(true);

  // Save wishlist refs to localStorage whenever they change (skip initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    saveWishlistRefsToStorage(wishlistRefs);
  }, [wishlistRefs]);

  const addToWishlist = (product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (productId) => {
    return wishlistRefs.some(item => item.id === productId);
  };

  const value = {
    wishlistRefs, // Product references (id, slug) for fetching fresh data
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    wishlistCount: wishlistRefs.length
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
