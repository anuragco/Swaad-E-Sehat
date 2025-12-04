import React, { useEffect, useState } from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiLoader, FiMail, FiPackage } from 'react-icons/fi';
// Make sure you import your API instance correctly

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);

  // 1. Get params from the URL (Sent by your Backend Redirect)
  const urlOrderId = searchParams.get('orderId');
  const urlStatus = searchParams.get('status'); // 'success' or 'failed'

  useEffect(() => {
    // If we have state (User navigated internally), use it
    if (location.state?.order) {
      setOrderDetails(location.state.order);
      setLoading(false);
      return;
    }

    // If we have URL params (User came from Payment Gateway -> Backend -> Here)
    if (urlOrderId) {
      // Optional: Fetch full order details to display (Items, Amount, etc.)
      // If you don't have a public API for this, you can just display the ID and Status.
      // Here is a simple implementation:
      setOrderDetails({
        orderId: urlOrderId,
        status: urlStatus === 'success' ? 'paid' : 'failed',
        // Default values since we don't have full data from a redirect
        amount: 'Check Email', 
        paymentMethod: 'Online' 
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [urlOrderId, urlStatus, location.state]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
        <FiLoader className="w-12 h-12 text-amber-500 animate-spin" />
        <p className="mt-4 text-slate-600 font-medium">Verifying your order...</p>
      </div>
    );
  }

  // Determine if Successful based on URL or State
  const isSuccess = urlStatus === 'success' || orderDetails?.status === 'paid';

  if (!orderDetails) {
    return (
      <div className="pt-24 pb-12 px-4 text-center">
        <FiXCircle className="w-16 h-16 text-red-500 mx-auto" />
        <h1 className="text-2xl font-bold mt-4">Order Not Found</h1>
        <Link to="/" className="text-amber-600 underline mt-2 inline-block">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          
          {/* Header Section */}
          <div className={`p-8 md:p-12 text-center border-b ${isSuccess ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto animate-pulse ${isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {isSuccess ? <FiCheckCircle className="w-12 h-12" /> : <FiXCircle className="w-12 h-12" />}
            </div>
            
            <h1 className="text-4xl font-bold font-serif text-slate-900 mt-6 mb-2">
              {isSuccess ? 'Order Confirmed!' : 'Payment Failed'}
            </h1>
            
            <p className="text-lg text-slate-600">
              {isSuccess 
                ? `Thank you! Your order #${orderDetails.orderId} has been placed.` 
                : `Order #${orderDetails.orderId} could not be processed.`}
            </p>
          </div>

          {/* Details Section (Only show if success) */}
          {isSuccess && (
            <div className="p-8 md:p-12">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">Order Summary</h2>
              
              <div className="space-y-4 border border-slate-200 rounded-lg p-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="font-semibold">{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Status:</span>
                  <span className="text-green-600 font-bold uppercase">PAID</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50 text-blue-800 rounded-lg">
                  <FiMail className="w-5 h-5" />
                  <span className="text-sm font-medium">A confirmation email has been sent.</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="p-8 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
            <Link 
              to="/products"
              className="w-full text-center px-6 py-3 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all"
            >
              {isSuccess ? 'Continue Shopping' : 'Try Again'}
            </Link>
            <Link 
              to="/account"
              className="w-full text-center px-6 py-3 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-100"
            >
              View My Orders
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;