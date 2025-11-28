import React, { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const WISHLIST_STORAGE_KEY = 'swaad_wishlist';
const WISHLIST_EXPIRY_DAYS = 30; // Wishlist data expires after 30 days

const getStoredWishlist = () => {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!stored) return [];
    
    const { items, expiry } = JSON.parse(stored);
    
    // Check if wishlist has expired
    if (expiry && new Date().getTime() > expiry) {
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
      return [];
    }
    
    return items || [];
  } catch (error) {
    console.error('Error loading wishlist from localStorage:', error);
    return [];
  }
};

const saveWishlistToStorage = (items) => {
  try {
    const expiry = new Date().getTime() + (WISHLIST_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify({ items, expiry }));
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
      return [...state, action.payload];
    
    case 'REMOVE_FROM_WISHLIST':
      return state.filter(item => item.id !== action.payload);
    
    case 'CLEAR_WISHLIST':
      return [];
    
    case 'LOAD_WISHLIST':
      return action.payload;
    
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, [], getStoredWishlist);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    saveWishlistToStorage(wishlist);
  }, [wishlist]);

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
    return wishlist.some(item => item.id === productId);
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    wishlistCount: wishlist.length
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
