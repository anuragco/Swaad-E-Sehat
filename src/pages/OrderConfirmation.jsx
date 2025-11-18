import React, { useEffect } from 'react'; // <-- Add useEffect
import { useLocation, useNavigate, Link, Navigate } from 'react-router-dom';
import { FiCheckCircle, FiMail, FiPackage, FiPhone } from 'react-icons/fi';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- START OF NEW LOGIC ---

  // 1. Try to get data from navigation state
  let orderData = location.state?.order;

  // 2. If state is empty (due to refresh), try to get from sessionStorage
  if (!orderData) {
    const savedOrder = sessionStorage.getItem('lastOrderData');
    if (savedOrder) {
      orderData = JSON.parse(savedOrder);
    }
  }

  useEffect(() => {
    // 3. Clean up sessionStorage when the user leaves this page
    return () => {
      sessionStorage.removeItem('lastOrderData');
    };
  }, []); // Empty array means this runs only on mount and unmount

  // 4. If there is STILL no data, NOW we redirect.
  if (!orderData) {
    // This will now only happen if the user tries to visit
    // /order-confirmation directly without a recent purchase.
    return <Navigate to="/" replace />;
  }
  
  // --- END OF NEW LOGIC ---

  // Deconstruct the data for easy use
  const { orderId, amount, paymentMethod, customerInfo } = orderData;
  const customerEmail = customerInfo?.email || 'your email';
  const customerName = customerInfo?.firstName || 'customer';

  // ... the rest of your component's JSX stays exactly the same ...
  // (The part starting with `return ( <div className="w-full bg-slate-50 pt-20"> ... )`)
  
  return (
    <div className="w-full bg-slate-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Main Confirmation Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          
          {/* 1. Header with Success Icon */}
          <div className="p-8 md:p-12 text-center bg-green-50 border-b border-green-200">
            
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <FiCheckCircle className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-bold font-serif text-slate-900 mt-6 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-lg text-slate-600">
              Thank you for your purchase, {customerName}!
            </p>
          </div>

          {/* 2. Order Details */}
          <div className="p-8 md:p-12">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">
              Your Order Details
            </h2>
            {/* Details Box */}
            <div className="space-y-4 border border-slate-200 rounded-lg p-6">
              <InfoRow label="Order ID:" value={orderId} />
              <InfoRow label="Total Amount:" value={`₹${amount.toFixed(2)}`} />
              <InfoRow label="Payment Method:" value={paymentMethod} />
            </div>

            {/* Next Steps */}
            <div className="mt-8 space-y-4">
              <MessageItem 
                icon={<FiMail />} 
                text={`A confirmation email has been sent to ${customerEmail}.`} 
              />
              <MessageItem 
                icon={<FiPackage />} 
                text="Your order will be processed and shipped soon."
              />
            </div>

            {/* Contact Support Section */}
            <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FiMail className="w-5 h-5 text-amber-600" />
                  <a href="mailto:brothersfoodie1@gmail.com" className="text-slate-700 hover:text-amber-600 transition-colors">
                    brothersfoodie1@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="w-5 h-5 text-amber-600" />
                  <a href="tel:+918178063094" className="text-slate-700 hover:text-amber-600 transition-colors">
                    +91 81780 63094
                  </a>
                </div>
              </div>
              <a 
                href="https://wa.me/918178063094"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Contact Support on WhatsApp
              </a>
            </div>
          </div>

          {/* 3. Action Buttons */}
          <div className="p-8 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
            <Link 
              to="/products"
              className="w-full text-center px-6 py-3 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all"
            >
              Continue Shopping
            </Link>
            <Link 
              to="/account/orders"
              className="w-full text-center px-6 py-3 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-100 transition-all"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm font-medium text-slate-500">{label}</span>
    <span className="text-base font-semibold text-slate-800 text-right">{value}</span>
  </div>
);

const MessageItem = ({ icon, text }) => (
  <div className="flex items-center gap-3 p-4 bg-blue-50 text-blue-800 rounded-lg">
    <div className="flex-shrink-0 text-blue-600">
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
    </div>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default OrderConfirmation;