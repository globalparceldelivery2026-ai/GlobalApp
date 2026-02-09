import { Link } from 'react-router-dom';
import { COMPANY_INFO, NAV_LINKS, COUNTRIES } from '../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{COMPANY_INFO.name}</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner in global logistics and courier services.
            </p>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-primary-400">📍</span>
              <p className="text-sm text-gray-400">{COMPANY_INFO.address}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              {COMPANY_INFO.phones.map((phone) => (
                <li key={phone} className="flex items-center space-x-2">
                  <span className="text-primary-400">📞</span>
                  <a href={`tel:${phone}`} className="text-gray-400 hover:text-white transition-colors">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center space-x-2">
                <span className="text-primary-400">✉️</span>
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-gray-400 hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-primary-400">🌐</span>
                <a href={`https://${COMPANY_INFO.website}`} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  {COMPANY_INFO.website}
                </a>
              </li>
            </ul>
          </div>

          {/* Countries Served */}
          <div>
            <h3 className="text-lg font-semibold mb-4">We Serve</h3>
            <div className="grid grid-cols-5 gap-2">
              {COUNTRIES.slice(0, 20).map((country) => (
                <span key={country.name} title={country.name} className="text-2xl">
                  {country.flag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-2">20+ Countries Worldwide</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Domestic & International Courier | Movers & Packers India Services
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
