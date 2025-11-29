import axios from 'axios';

const API_BASE_URL = `https://api.swaadesehat.in`; 

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined. Please check your .env file.');
}

const ClientApiInstance = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials: true, 
});

ClientApiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ClientApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Logging out...");
      
      // Only redirect if not already on the login page to prevent loops
      if (window.location.pathname !== '/account') {
        // Clear all auth-related data from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        
        // Set flag to prevent login page from auto-redirecting back
        sessionStorage.setItem('session_expired', 'true');
        
        // Redirect to login page
        window.location.href = '/account'; 
      }
    }
    return Promise.reject(error);
  }
);

export default ClientApiInstance;
