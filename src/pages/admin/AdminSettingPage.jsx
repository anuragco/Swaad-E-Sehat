import React, { useState, useEffect } from 'react';
import { FiSave, FiBell, FiLock, FiGlobe, FiDollarSign, FiCreditCard } from 'react-icons/fi';
import { toast } from 'react-toastify';
import ClientApiInstance from '../../api/axiosIntercepter';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    storeName: 'Swaad-E-Sehat',
    storeEmail: 'brothersfoodie1@gmail.com',
    storePhone: '+91 81780 63094',
    storeAddress: 'Gurgaon, Sector 8',
    storeCity: 'Gurgaon',
    storeState: 'Haryana',
    storePincode: '122001',
    currency: 'INR',
    taxPercentage: 18,
    shippingCost: 50,
    freeShippingAbove: 500,
    enableNotifications: true,
    enableSMS: true,
    enableEmail: true,
    maintenanceMode: false,
    allowGuestCheckout: true,
    enableCoupon: true,
  });

  const [paymentSettings, setPaymentSettings] = useState({
    cod_enabled: false,
    online_payment_enabled: true
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch payment settings on component mount
  useEffect(() => {
    const fetchPaymentSettings = async () => {
      try {
        const response = await ClientApiInstance.get('/payment/api/payment-settings');
        if (response.data.success) {
          setPaymentSettings(response.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch payment settings:', err);
        toast.error('Failed to load payment settings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setSettings(prev => ({ ...prev, [name]: val }));
  };

  const handlePaymentSettingsChange = (e) => {
    const { name, checked } = e.target;
    setPaymentSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleSave = async () => {
    // Validate that at least one payment method is enabled
    if (!paymentSettings.cod_enabled && !paymentSettings.online_payment_enabled) {
      toast.error('At least one payment method must be enabled!');
      return;
    }

    setIsSaving(true);
    try {
      const response = await ClientApiInstance.post('/payment/api/admin/payment-settings', paymentSettings);
      if (response.data.success) {
        toast.success('Payment settings updated successfully!');
      } else {
        toast.error(response.data.message || 'Failed to update settings');
      }
    } catch (err) {
      console.error('Failed to save payment settings:', err);
      toast.error(err.response?.data?.message || 'Failed to save payment settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
        <h1 className="text-3xl font-bold text-amber-900">⚙️ Settings</h1>
        <p className="text-amber-700 mt-2">Manage your store configuration and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Store Information */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2 border-b-2 border-amber-200 pb-4">
            🏪 Store Information
          </h2>
          
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Store Name</label>
                <input 
                  type="text" 
                  name="storeName"
                  value={settings.storeName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Store Email</label>
                <input 
                  type="email" 
                  name="storeEmail"
                  value={settings.storeEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Store Phone</label>
                <input 
                  type="tel" 
                  name="storePhone"
                  value={settings.storePhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Currency</label>
                <select 
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                >
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Store Address</label>
              <input 
                type="text" 
                name="storeAddress"
                value={settings.storeAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                <input 
                  type="text" 
                  name="storeCity"
                  value={settings.storeCity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
                <input 
                  type="text" 
                  name="storeState"
                  value={settings.storeState}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
                <input 
                  type="text" 
                  name="storePincode"
                  value={settings.storePincode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications & Security */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2 border-b-2 border-amber-200 pb-3">
              <FiBell size={20} /> Notifications
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="enableNotifications"
                  checked={settings.enableNotifications}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 rounded"
                />
                <span className="text-sm font-medium text-slate-700">Enable All Notifications</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="enableEmail"
                  checked={settings.enableEmail}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 rounded"
                />
                <span className="text-sm font-medium text-slate-700">Email Notifications</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="enableSMS"
                  checked={settings.enableSMS}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 rounded"
                />
                <span className="text-sm font-medium text-slate-700">SMS Notifications</span>
              </label>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2 border-b-2 border-amber-200 pb-3">
              <FiLock size={20} /> System
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 rounded"
                />
                <span className="text-sm font-medium text-slate-700">Maintenance Mode</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="allowGuestCheckout"
                  checked={settings.allowGuestCheckout}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 rounded"
                />
                <span className="text-sm font-medium text-slate-700">Allow Guest Checkout</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="enableCoupon"
                  checked={settings.enableCoupon}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 rounded"
                />
                <span className="text-sm font-medium text-slate-700">Enable Coupon System</span>
              </label>
            </div>
          </div>

          {/* Payment Methods Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2 border-b-2 border-amber-200 pb-3">
              <FiCreditCard size={20} /> Payment Methods
            </h3>
            
            {isLoading ? (
              <div className="text-center py-4 text-slate-500">Loading...</div>
            ) : (
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="online_payment_enabled"
                    checked={paymentSettings.online_payment_enabled}
                    onChange={handlePaymentSettingsChange}
                    className="h-4 w-4 text-amber-600 rounded"
                  />
                  <span className="text-sm font-medium text-slate-700">Enable Online Payment</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="cod_enabled"
                    checked={paymentSettings.cod_enabled}
                    onChange={handlePaymentSettingsChange}
                    className="h-4 w-4 text-amber-600 rounded"
                  />
                  <span className="text-sm font-medium text-slate-700">Enable Cash on Delivery (COD)</span>
                </label>
                
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-800">
                    ⚠️ At least one payment method must be enabled
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Billing & Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2 border-b-2 border-amber-200 pb-3">
            <FiDollarSign size={20} /> Billing
          </h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tax Percentage (%)</label>
              <input 
                type="number" 
                name="taxPercentage"
                value={settings.taxPercentage}
                onChange={handleChange}
                step="0.1"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Shipping Cost (₹)</label>
              <input 
                type="number" 
                name="shippingCost"
                value={settings.shippingCost}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Free Shipping Above (₹)</label>
              <input 
                type="number" 
                name="freeShippingAbove"
                value={settings.freeShippingAbove}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2 border-b-2 border-amber-200 pb-3">
            <FiGlobe size={20} /> Preferences
          </h2>
          
          <div className="space-y-5">
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-800"><span className="font-semibold">Theme:</span> Light Mode</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-800"><span className="font-semibold">Language:</span> English</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-800"><span className="font-semibold">Timezone:</span> IST (UTC+5:30)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg shadow-md hover:shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSave size={20} />
          <span>{isSaving ? 'Saving...' : 'Save Payment Settings'}</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;