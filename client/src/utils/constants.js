// Company Information
export const COMPANY_INFO = {
  name: 'Global Parcel Delivery',
  tagline: 'Your Trusted Partner in Global Logistics',
  address: 'Fakira Market, Opp. Jama Masjid, Sector-15, Nerul, Navi Mumbai - 400706',
  phones: ['8591640143', '7506469492'],
  email: 'info@globalparceldelivery.in',
  website: 'www.globalparceldelivery.in',
};

// Services
export const SERVICES = [
  {
    id: 'domestic-courier',
    title: 'Domestic Courier',
    description: 'Fast and reliable courier services across India',
    icon: '🚚',
    features: ['Same-day delivery', 'Door-to-door service', 'Real-time tracking', 'Secure handling']
  },
  {
    id: 'international-courier',
    title: 'International Courier',
    description: 'Worldwide shipping to 20+ countries',
    icon: '✈️',
    features: ['Express delivery', 'Customs clearance', 'Insurance coverage', 'Global tracking']
  },
  {
    id: 'movers-packers',
    title: 'Movers & Packers',
    description: 'Professional packing and moving services',
    icon: '📦',
    features: ['Expert packing', 'Safe transportation', 'Unpacking service', 'Insurance available']
  },
  {
    id: 'express-delivery',
    title: 'Express Delivery',
    description: 'Urgent deliveries with guaranteed timing',
    icon: '⚡',
    features: ['Same-day delivery', 'Time-definite service', 'Priority handling', 'SMS alerts']
  }
];

// Countries Served
export const COUNTRIES = [
  { name: 'USA', flag: '🇺🇸', region: 'Americas' },
  { name: 'Canada', flag: '🇨🇦', region: 'Americas' },
  { name: 'UK', flag: '🇬🇧', region: 'Europe' },
  { name: 'France', flag: '🇫🇷', region: 'Europe' },
  { name: 'Germany', flag: '🇩🇪', region: 'Europe' },
  { name: 'Belgium', flag: '🇧🇪', region: 'Europe' },
  { name: 'Austria', flag: '🇦🇹', region: 'Europe' },
  { name: 'Australia', flag: '🇦🇺', region: 'Oceania' },
  { name: 'Japan', flag: '🇯🇵', region: 'Asia' },
  { name: 'Malaysia', flag: '🇲🇾', region: 'Asia' },
  { name: 'UAE', flag: '🇦🇪', region: 'Middle East' },
  { name: 'Saudi Arabia', flag: '🇸🇦', region: 'Middle East' },
  { name: 'Bahrain', flag: '🇧🇭', region: 'Middle East' },
  { name: 'Qatar', flag: '🇶🇦', region: 'Middle East' },
  { name: 'Kuwait', flag: '🇰🇼', region: 'Middle East' },
  { name: 'South Africa', flag: '🇿🇦', region: 'Africa' },
  { name: 'Kenya', flag: '🇰🇪', region: 'Africa' },
  { name: 'Tanzania', flag: '🇹🇿', region: 'Africa' },
  { name: 'Nigeria', flag: '🇳🇬', region: 'Africa' },
  { name: 'Mauritius', flag: '🇲🇺', region: 'Africa' },
];

// Tracking Status
export const TRACKING_STATUS = {
  'booked': { label: 'Booked', color: 'blue', icon: '📋' },
  'picked-up': { label: 'Picked Up', color: 'indigo', icon: '📤' },
  'in-transit': { label: 'In Transit', color: 'yellow', icon: '🚛' },
  'out-for-delivery': { label: 'Out for Delivery', color: 'orange', icon: '🚚' },
  'delivered': { label: 'Delivered', color: 'green', icon: '✅' },
  'cancelled': { label: 'Cancelled', color: 'red', icon: '❌' }
};

// Booking Status
export const BOOKING_STATUS = {
  'pending': { label: 'Pending', color: 'yellow' },
  'confirmed': { label: 'Confirmed', color: 'green' },
  'cancelled': { label: 'Cancelled', color: 'red' },
  'completed': { label: 'Completed', color: 'blue' }
};

// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Track', path: '/tracking' },
  { name: 'Book Now', path: '/booking' },
  { name: 'Contact', path: '/contact' },
  { name: 'About', path: '/about' },
];

// Why Choose Us
export const WHY_CHOOSE_US = [
  {
    title: 'Global Reach',
    description: 'Serving 20+ countries worldwide',
    icon: '🌍'
  },
  {
    title: 'Fast Delivery',
    description: 'Express shipping options available',
    icon: '⚡'
  },
  {
    title: 'Safe & Secure',
    description: 'Insurance and secure handling',
    icon: '🔒'
  },
  {
    title: 'Real-time Tracking',
    description: 'Track your shipment anytime',
    icon: '📍'
  },
  {
    title: '24/7 Support',
    description: 'Customer support always available',
    icon: '💬'
  },
  {
    title: 'Best Rates',
    description: 'Competitive pricing guaranteed',
    icon: '💰'
  }
];
