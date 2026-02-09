import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../utils/constants';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 fade-in">
            {COMPANY_INFO.name}
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-yellow-300 font-semibold">
            {COMPANY_INFO.tagline}
          </p>
          <p className="text-xl md:text-2xl mb-8">
            Domestic & International Courier | Movers & Packers India Services
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              to="/booking"
              className="bg-secondary-400 text-gray-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-secondary-500 transition-all transform hover:scale-105 shadow-lg"
            >
              Book Now
            </Link>
            <Link
              to="/tracking"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Track Shipment
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-2">🌍</div>
              <h3 className="font-bold mb-1">20+ Countries</h3>
              <p className="text-sm">Global Reach</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="font-bold mb-1">Express Delivery</h3>
              <p className="text-sm">Fast & Reliable</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-2">📍</div>
              <h3 className="font-bold mb-1">Real-time Tracking</h3>
              <p className="text-sm">Track Anytime</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-2">🔒</div>
              <h3 className="font-bold mb-1">Safe & Secure</h3>
              <p className="text-sm">Insured Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Shape */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
