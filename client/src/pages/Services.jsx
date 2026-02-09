import ServiceCard from '../components/ServiceCard';
import { SERVICES } from '../utils/constants';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl">
            Comprehensive logistics and courier solutions tailored to your needs
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Additional Services */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold mb-2">Packaging Solutions</h3>
              <p className="text-gray-600">
                Professional packaging materials and services to ensure safe delivery
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl mb-4">🛂</div>
              <h3 className="text-xl font-bold mb-2">Customs Clearance</h3>
              <p className="text-gray-600">
                Expert assistance with international shipping documentation and customs
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-2">Insurance Coverage</h3>
              <p className="text-gray-600">
                Comprehensive insurance options for valuable and fragile shipments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-lg mb-6">
            Contact us for specialized logistics services tailored to your business
          </p>
          <Link
            to="/contact"
            className="inline-block bg-secondary-400 text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-secondary-500 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
