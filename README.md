# Swaad-E-Sehat - E-commerce Website

A fully responsive, professional e-commerce website for Swaad-E-Sehat, specializing in 100% natural, homemade sweets and dry fruit products.

## 🌟 Features

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
- **Payment Gateway**: Razorpay integration for secure payments
- **Order Summary**: Detailed order review before payment
- **Payment Methods**: Cards, UPI, Net Banking, Digital Wallets
- **Order Confirmation**: Success page with order details and tracking

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

### Styling

- **CSS3**: Modern CSS with variables
- **Flexbox & Grid**: Responsive layouts
- **CSS Animations**: Smooth transitions and effects
- **Media Queries**: Responsive breakpoints
- **Custom Properties**: CSS variables for theming

### Payment Integration

- **Razorpay**: Secure payment processing
- **Multiple Payment Methods**: Cards, UPI, Net Banking
- **Order Management**: Complete order lifecycle
- **Security**: PCI DSS compliant

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
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Add your Razorpay keys:

   ```
   REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   └── ProductCard.jsx # Product display component
├── pages/              # Page components
│   ├── HomePage.jsx    # Landing page
│   ├── ProductsPage.jsx # Product listing
│   ├── ProductDetail.jsx # Product details
│   ├── CartPage.jsx    # Shopping cart
│   ├── CheckoutPage.jsx # Checkout process
│   ├── OrderConfirmation.jsx # Order success
│   └── AboutPage.jsx   # About us
├── context/            # React Context
│   └── CartContext.jsx # Shopping cart state
├── data/               # Data files
│   └── products.js     # Product data and utilities
├── App.jsx             # Main app component
├── App.css             # Global styles
└── index.jsx           # App entry point
```

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

#### Frontend

```env
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
REACT_APP_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

#### Backend

Copy `Backend/.env.example` to `Backend/.env` and configure the following:

```env
# Database Configuration
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# SMTP Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=officialcompany@gmail.com
SMTP_PASS=your_16_digit_app_password
SMTP_FROM=support@swaadesehat.in
ORDER_CONFIRMATION_ADMIN_EMAIL=admin@example.com

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_PUBLIC_KEY=your_jwt_public_key

# Server Configuration
EXPRESS_PORT=5000
API_BASE_URL=https://api.swaadesehat.in
```

### Gmail SMTP Setup

1. Enable 2-Step Verification on your Google Account
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Use the 16-character App Password as `SMTP_PASS`
4. Set `SMTP_USER` to your Gmail address
5. Set `SMTP_FROM` to your company's official domain email

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
