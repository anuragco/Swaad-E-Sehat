import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiBox, FiClipboard, FiUsers, FiSettings, FiLogOut, FiMenu, FiX, FiHome, FiTrendingUp, FiShoppingBag } from 'react-icons/fi';
import { Candy, Sparkles, Package, Star, Heart, Zap } from 'lucide-react';
import ClientApiInstance from '../../api/axiosIntercepter';
import { toast } from 'react-toastify';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await ClientApiInstance.get('/api/admin/stats');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (err) {
      toast.error("Failed to fetch stats.");
      console.error(err);
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const formatRevenue = (revenue) => {
    if (!revenue) return '₹0';
    return `₹${revenue.toLocaleString('en-IN')}`;
  };

  const formatCount = (count) => {
    if (!count) return '0';
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-60 -left-40 w-96 h-96 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
        
        {/* Floating Candy Icons */}
        <div className="absolute top-1/4 left-1/4 animate-float opacity-10">
          <Candy className="w-20 h-20 text-pink-400" />
        </div>
        <div className="absolute top-3/4 right-1/3 animate-float-delayed opacity-10">
          <Heart className="w-16 h-16 text-rose-400" />
        </div>
        <div className="absolute top-1/2 right-1/4 animate-float-slow opacity-10">
          <Star className="w-24 h-24 text-amber-400" />
        </div>
      </div>

      <div className="relative pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Premium Header */}
          <div className="mb-10">
            <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/40">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-5">
                  {/* Logo with Animation */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl blur-xl opacity-60 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 p-4 rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300">
                      <Candy className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 bg-clip-text text-transparent leading-tight">
                      Swaad E Sehat
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                      <p className="text-slate-600 font-semibold text-sm">Admin Control Center</p>
                      <Zap className="w-4 h-4 text-orange-500 animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Back to Shop - Desktop */}
                  <button
                    onClick={() => navigate('/')}
                    className="hidden sm:flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold group"
                  >
                    <FiHome className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Visit Shop</span>
                    <Sparkles className="w-4 h-4" />
                  </button>

                  {/* Mobile Menu Toggle */}
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden bg-gradient-to-br from-pink-500 to-orange-500 text-white p-3 rounded-xl shadow-lg"
                  >
                    {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                  </button>
                </div>
              </div>

              {/* Enhanced Stats Dashboard */}
              {isLoadingStats ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-slate-100 rounded-2xl p-5 animate-pulse">
                      <div className="h-12 bg-slate-200 rounded-xl mb-3"></div>
                      <div className="h-8 bg-slate-200 rounded mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard 
                    icon={<Package />} 
                    label="Total Products" 
                    value={formatCount(stats.totalProducts)} 
                    color="from-pink-500 to-rose-500"
                    bgColor="from-pink-50 to-rose-50"
                  />
                  <StatCard 
                    icon={<FiClipboard />} 
                    label="Active Orders" 
                    value={formatCount(stats.totalOrders)} 
                    color="from-purple-500 to-pink-500"
                    bgColor="from-purple-50 to-pink-50"
                  />
                  <StatCard 
                    icon={<FiUsers />} 
                    label="Happy Customers" 
                    value={formatCount(stats.totalUsers)} 
                    color="from-amber-500 to-orange-500"
                    bgColor="from-amber-50 to-orange-50"
                  />
                  <StatCard 
                    icon={<FiTrendingUp />} 
                    label="Total Revenue" 
                    value={formatRevenue(stats.totalRevenue)} 
                    color="from-green-500 to-emerald-500"
                    bgColor="from-green-50 to-emerald-50"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Enhanced Sidebar - Desktop */}
            <aside className="hidden lg:block lg:col-span-1">
              <nav className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 sticky top-28 border border-white/40">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Quick Access
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  <AdminNavItem to="/admin/products" icon={<FiBox />} badge={stats.totalProducts}>
                    Products
                  </AdminNavItem>
                  <AdminNavItem to="/admin/orders" icon={<FiClipboard />} badge={stats.totalOrders} highlight>
                    Orders
                  </AdminNavItem>
                  <AdminNavItem to="/admin/users" icon={<FiUsers />} badge={formatCount(stats.totalUsers)}>
                    Customers
                  </AdminNavItem>
                  
                  <li className="my-4">
                    <div className="border-t border-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
                  </li>
                  
                  <AdminNavItem to="/admin/settings" icon={<FiSettings />}>
                    Settings
                  </AdminNavItem>
                  
                  <li className="pt-4">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 text-slate-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 hover:text-red-600 font-bold group border-2 border-transparent hover:border-red-200"
                    >
                      <FiLogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>

                {/* Quick Action Card */}
                <div className="mt-6 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl p-4 text-white">
                  <FiShoppingBag className="w-8 h-8 mb-2" />
                  <h3 className="font-bold mb-1">Need Help?</h3>
                  <p className="text-xs text-white/80 mb-3">Check our admin guide</p>
                  <button className="w-full bg-white text-pink-600 px-3 py-2 rounded-xl text-sm font-bold hover:bg-pink-50 transition-all">
                    Learn More
                  </button>
                </div>
              </nav>
            </aside>

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
              <div 
                className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <nav 
                  className="absolute left-0 top-0 bottom-0 w-80 bg-white/95 backdrop-blur-2xl shadow-2xl p-6 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-pink-500 to-orange-500 p-2 rounded-xl">
                        <Candy className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-xl font-black text-slate-800">Menu</h2>
                    </div>
                    <button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Back to Shop - Mobile */}
                  <button
                    onClick={() => {
                      navigate('/');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-5 py-4 mb-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl shadow-lg font-bold"
                  >
                    <FiHome className="w-5 h-5" />
                    <span>Visit Shop</span>
                    <Sparkles className="w-4 h-4 ml-auto" />
                  </button>
                  
                  <ul className="space-y-2">
                    <AdminNavItem to="/admin/products" icon={<FiBox />} badge={stats.totalProducts}>
                      Products
                    </AdminNavItem>
                    <AdminNavItem to="/admin/orders" icon={<FiClipboard />} badge={stats.totalOrders} highlight>
                      Orders
                    </AdminNavItem>
                    <AdminNavItem to="/admin/users" icon={<FiUsers />} badge={formatCount(stats.totalUsers)}>
                      Customers
                    </AdminNavItem>
                    
                    <li className="my-4 border-t border-slate-200"></li>
                    
                    <AdminNavItem to="/admin/settings" icon={<FiSettings />}>
                      Settings
                    </AdminNavItem>
                    
                    <li className="pt-4">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 text-slate-600 hover:bg-red-50 hover:text-red-600 font-bold border-2 border-transparent hover:border-red-200"
                      >
                        <FiLogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}

            {/* Premium Content Area */}
            <main className="lg:col-span-4">
              <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/40 min-h-[700px]">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-5deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const AdminNavItem = ({ to, icon, children, badge, highlight }) => (
  <li>
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
          isActive
            ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white font-bold shadow-xl shadow-pink-500/30 scale-105'
            : 'text-slate-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 hover:text-pink-600 font-semibold hover:scale-102'
        }`
      }
    >
      <div className="flex items-center gap-3">
        {React.cloneElement(icon, { 
          className: `w-5 h-5 transition-transform group-hover:scale-110 ${highlight ? 'animate-pulse' : ''}` 
        })}
        <span>{children}</span>
      </div>
      {badge && (
        <span className={`text-xs px-2 py-1 rounded-full font-bold ${
          highlight 
            ? 'bg-orange-500 text-white animate-pulse' 
            : 'bg-slate-200 text-slate-600 group-hover:bg-pink-200 group-hover:text-pink-700'
        }`}>
          {badge}
        </span>
      )}
    </NavLink>
  </li>
);

const StatCard = ({ icon, label, value, color, bgColor }) => {
  return (
    <div className={`relative bg-gradient-to-br ${bgColor} rounded-2xl shadow-lg p-5 border border-white/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden`}>
      {/* Animated Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg group-hover:scale-110 transition-transform`}>
            {React.cloneElement(icon, { className: 'w-6 h-6 text-white' })}
          </div>
        </div>
        <p className="text-3xl font-black text-slate-800 mb-1">{value}</p>
        <p className="text-xs text-slate-600 font-bold uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
};

export default AdminLayout;