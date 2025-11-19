# Swaad-E-Sehat - E-commerce Website

A fully responsive, professional e-commerce website for Swaad-E-Sehat, specializing in 100% natural, homemade sweets and dry fruit products.

## 🌟 Features

### 🆕 Dynamic Payment Options (New!)

- **Admin Control Panel**: Toggle payment methods without code deployment
- **Database-Driven Settings**: Payment methods controlled via settings table
- **Visual Indicators**: Disabled payment options show clear ❌ icons
- **Backend Validation**: Server-side verification prevents bypassing disabled methods
- **Security Features**: Rate limiting and authentication on all payment endpoints
- **Flexible Configuration**: Enable/disable COD and Online Payment independently
- **User-Friendly UI**: Greyed-out disabled options with "Not Available" messaging
- **Documentation**: Comprehensive guides (see FEATURE_DOCUMENTATION.md, TESTING.md)

### 🏠 Homepage

- **Hero Banner**: Showcases natural and homemade sweets with compelling visuals
- **Best-selling Products**: Highlighted featured products section
- **Promotional Banner**: "Buy Now – 10% Discount on Prepaid Orders"
- **Features Section**: 100% Natural, Premium Quality, Free Shipping, Traditional Recipes
- **New Launch Section**: Featured new products with special highlighting
- **Testimonials**: Customer reviews and feedback
- **Call-to-Action**: Encouraging users to shop and learn more

### 🛍️ Products Page

- **Product Display**: Grid and list view options
- **Advanced Filtering**: By category, price range, rating, and stock availability
- **Sorting Options**: Name, price, rating, newest, bestsellers
- **Search Functionality**: Real-time product search
- **Product Cards**: With images, descriptions, pricing, ratings, and add-to-cart
- **Variant Selection**: Different sizes and weights
- **Stock Management**: Real-time stock availability

### 🛒 Shopping Cart

- **Cart Management**: Add, update, and remove items
- **Quantity Controls**: Easy quantity adjustment with stock limits
- **Price Calculations**: Subtotal, taxes (GST), discounts, and total
- **Variant Display**: Shows selected product variants
- **Cart Summary**: Order summary with shipping information
- **Promotional Benefits**: Free shipping, secure payment, easy returns

### 💳 Checkout & Payment

- **Secure Checkout**: Comprehensive form validation
- **Shipping Information**: Complete address collection
- **Dynamic Payment Options**: Admin-controlled payment method availability
  - **Online Payment**: Cards, UPI, Net Banking, Digital Wallets (Razorpay)
  - **Cash on Delivery**: Configurable COD option with visual status indicators
- **Payment Method Controls**: Database-driven enable/disable settings
- **Disabled Method Indicators**: Clear visual feedback (❌) for unavailable methods
- **Payment Gateway**: Razorpay integration for secure online payments
- **Order Summary**: Detailed order review before payment
- **Order Confirmation**: Success page with order details and tracking
- **Backend Validation**: Prevents malicious payment method requests
- **Rate Limiting**: Protected against abuse with request limits

### 📱 Product Detail Page

- **Image Gallery**: Multiple product images with zoom functionality
- **Product Information**: Detailed descriptions, ingredients, benefits
- **Variant Selection**: Size and weight options with pricing
- **Stock Availability**: Real-time stock information
- **Quantity Selector**: With stock limits
- **Add to Cart/Buy Now**: Quick purchase options
- **Wishlist**: Save products for later
- **Share Functionality**: Social sharing options
- **Tabs**: Description, Ingredients, Benefits, Nutrition Facts

### ℹ️ About Us Page

- **Brand Story**: Company history and mission
- **Our Values**: Core principles and commitments
- **Our Process**: How products are made
- **Why Choose Us**: Key differentiators
- **Team Section**: Meet the team behind the brand
- **Call-to-Action**: Encouraging engagement

### 📞 Contact & Footer

- **Contact Information**: Phone, WhatsApp, Email
- **Addresses**: Manufacturing unit and office locations
- **Social Media**: Instagram, Facebook, Twitter links
- **Quick Links**: Navigation and policy links
- **Payment Methods**: Accepted payment options
- **Policies**: Privacy, Terms, Shipping, Returns

## 🎨 Design Features

### 🎨 Visual Design

- **Warm Color Palette**: Natural browns, golds, and earth tones
- **Modern Typography**: Poppins and Playfair Display fonts
- **High-Quality Images**: Professional product photography
- **Clean Layout**: User-friendly interface design
- **Consistent Branding**: Cohesive visual identity

### 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect tablet experience
- **Desktop Optimization**: Full desktop functionality
- **Cross-Browser**: Compatible with all modern browsers
- **Touch-Friendly**: Mobile-optimized interactions

### ⚡ Performance

- **Fast Loading**: Optimized images and code
- **SEO Optimized**: Meta tags, structured data, sitemaps
- **PWA Ready**: Progressive Web App features
- **Accessibility**: WCAG compliant design
- **Performance Monitoring**: Built-in performance tracking

## 🛠️ Technical Stack

### Frontend

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Context API**: Global state management
- **React Icons**: Beautiful icon library
- **React Toastify**: User notifications

### Backend

- **Node.js**: Server-side runtime
- **Express**: Web application framework
- **MySQL**: Relational database
- **express-rate-limit**: Rate limiting middleware
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT authentication

### Styling

- **CSS3**: Modern CSS with variables
- **Flexbox & Grid**: Responsive layouts
- **CSS Animations**: Smooth transitions and effects
- **Media Queries**: Responsive breakpoints
- **Custom Properties**: CSS variables for theming

### Payment Integration

- **Razorpay**: Secure payment processing
- **DevCraftor**: Alternative payment gateway
- **Dynamic Payment Methods**: Database-controlled availability
- **Multiple Payment Options**: Cards, UPI, Net Banking, Cash on Delivery
- **Order Management**: Complete order lifecycle tracking
- **Security**: PCI DSS compliant, rate-limited endpoints
- **Backend Validation**: Payment method verification before order processing

### Development Tools

- **Create React App**: Development environment
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Git**: Version control

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/swaad-e-sehat.git
   cd swaad-e-sehat
   ```

2. **Install dependencies**

   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd Backend
   npm install
   cd ..
   ```

3. **Set up the database**

   ```bash
   # Run the settings migration
   mysql -u your_username -p your_database < Backend/migrations/create_settings_table.sql
   ```

4. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Add your Razorpay keys and database credentials:

   ```
   REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
   
   # Backend environment (Backend/.env)
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DEVCRAFTER_KEY=your_payment_gateway_key
   DEVCRAFTER_SECRET=your_payment_gateway_secret
   ```

5. **Start the development servers**

   ```bash
   # Terminal 1 - Start backend
   cd Backend
   npm start
   
   # Terminal 2 - Start frontend
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
swaad-e-sehat/
├── Backend/                    # Backend server
│   ├── Controller/            # API route controllers
│   │   ├── PaymentSettings.js # Payment settings API (NEW)
│   │   ├── CreateOrder.js     # Order creation (UPDATED)
│   │   └── ...
│   ├── Middleware/            # Authentication & validation
│   ├── Config/                # Database configuration
│   └── migrations/            # Database migrations (NEW)
│       ├── create_settings_table.sql
│       └── README.md
├── src/                       # Frontend source
│   ├── components/            # Reusable components
│   │   ├── Header.jsx        # Navigation header
│   │   ├── Footer.jsx        # Site footer
│   │   └── ProductCard.jsx   # Product display component
│   ├── pages/                # Page components
│   │   ├── CheckoutPage.jsx  # Checkout process (UPDATED)
│   │   ├── admin/
│   │   │   └── AdminSettingPage.jsx # Admin settings (UPDATED)
│   │   └── ...
│   ├── context/              # React Context
│   │   └── CartContext.jsx   # Shopping cart state
│   └── ...
├── FEATURE_DOCUMENTATION.md  # Technical docs (NEW)
├── TESTING.md                # Testing guide (NEW)
├── IMPLEMENTATION_SUMMARY.md # Implementation overview (NEW)
└── README.md                 # This file
```

## 📚 Documentation

This project includes comprehensive documentation:

- **[FEATURE_DOCUMENTATION.md](FEATURE_DOCUMENTATION.md)**: Complete technical documentation for the dynamic payment options feature, including architecture, API docs, and troubleshooting
- **[TESTING.md](TESTING.md)**: Comprehensive testing guide with 11 detailed test cases and security considerations
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)**: Visual implementation overview with flow diagrams and deployment guide
- **[Backend/migrations/README.md](Backend/migrations/README.md)**: Database migration instructions

## 🎯 Key Features Implementation

### Shopping Cart Management

- **Add to Cart**: Products with variants and quantities
- **Update Quantities**: Real-time quantity adjustment
- **Remove Items**: Easy item removal
- **Persistent Cart**: Cart state maintained across sessions
- **Price Calculations**: Automatic totals and taxes

### Product Management

- **Variant System**: Multiple sizes and weights
- **Stock Tracking**: Real-time inventory management
- **Image Gallery**: Multiple product images
- **Detailed Information**: Comprehensive product data
- **Search & Filter**: Advanced product discovery

### Payment Processing

- **Razorpay Integration**: Secure payment gateway
- **Multiple Methods**: Cards, UPI, Net Banking
- **Order Management**: Complete order lifecycle
- **Confirmation**: Detailed order confirmation

### User Experience

- **Responsive Design**: Mobile-first approach
- **Fast Loading**: Optimized performance
- **Intuitive Navigation**: Easy-to-use interface
- **Accessibility**: WCAG compliant
- **SEO Optimized**: Search engine friendly

## 🔧 Configuration

### Environment Variables

```env
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
REACT_APP_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Razorpay Setup

1. Create a Razorpay account
2. Get your API keys from the dashboard
3. Add keys to environment variables
4. Test with Razorpay test keys

## 📱 Mobile Optimization

- **Touch-Friendly**: Large buttons and touch targets
- **Responsive Images**: Optimized for different screen sizes
- **Mobile Navigation**: Collapsible mobile menu
- **Fast Loading**: Optimized for mobile networks
- **PWA Features**: Installable web app

## 🎨 Customization

### Colors

Update CSS variables in `src/App.css`:

```css
:root {
  --primary-color: #8b4513;
  --secondary-color: #d2691e;
  --accent-color: #cd853f;
  /* ... more variables */
}
```

### Fonts

Change fonts in `public/index.html`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### Products

Add/modify products in `src/data/products.js`:

```javascript
export const products = [
  {
    id: 1,
    name: "Product Name",
    price: 100,
    salePrice: 90,
    // ... more properties
  },
];
```

## 🚀 Deployment

### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables
5. Deploy!

### Vercel

1. Import your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Add environment variables
5. Deploy!

### Manual Deployment

1. Run `npm run build`
2. Upload `build` folder to your web server
3. Configure server for SPA routing
4. Set up SSL certificate

## 🔒 Security

- **HTTPS**: Secure data transmission
- **Input Validation**: Form validation and sanitization
- **Payment Security**: PCI DSS compliant Razorpay
- **Environment Variables**: Sensitive data protection
- **Content Security Policy**: XSS protection

## 📊 Performance

- **Image Optimization**: Compressed and responsive images
- **Code Splitting**: Lazy loading of components
- **Caching**: Browser caching strategies
- **CDN Ready**: Content delivery network support
- **Bundle Analysis**: Optimized JavaScript bundles

## 🧪 Testing

### Manual Testing

- **Cross-Browser**: Chrome, Firefox, Safari, Edge
- **Device Testing**: Mobile, tablet, desktop
- **Payment Testing**: Test transactions
- **User Flow**: Complete purchase journey

### Automated Testing

```bash
npm test
```

## 📈 Analytics

### Google Analytics

Add tracking code to `public/index.html`:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- **Email**: support@swaad-e-sehat.com
- **Phone**: +91 98765 43210
- **WhatsApp**: [Contact via WhatsApp](https://wa.me/919876543210)

## 🙏 Acknowledgments

- **Razorpay**: Payment gateway integration
- **React Community**: Amazing React ecosystem
- **Design Inspiration**: Modern e-commerce trends
- **Open Source**: Community-driven development

---

**Swaad-E-Sehat** - Bringing you the authentic taste of natural goodness! 🌰🍯
