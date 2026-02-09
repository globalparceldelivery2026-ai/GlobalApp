import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import CountryList from '../components/CountryList';
import TrackingForm from '../components/TrackingForm';
import { SERVICES, WHY_CHOOSE_US } from '../utils/constants';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Quick Tracking Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-16 relative z-10">
        <TrackingForm />
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">
            Comprehensive logistics solutions for all your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Your trusted partner in logistics and delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl transition-all">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Countries Section */}
      <CountryList />

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Ship?</h2>
          <p className="text-xl mb-8">
            Get a quote instantly and book your shipment today
          </p>
          <Link
            to="/booking"
            className="inline-block bg-secondary-400 text-gray-900 px-12 py-4 rounded-lg text-lg font-bold hover:bg-secondary-500 transition-all transform hover:scale-105 shadow-lg"
          >
            Get Quote Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
