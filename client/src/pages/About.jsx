import { COMPANY_INFO, WHY_CHOOSE_US } from '../utils/constants';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl">Your Trusted Partner in Global Logistics</p>
        </div>
      </div>

      {/* Company Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              {COMPANY_INFO.name} is a leading logistics and courier service provider based in Navi Mumbai,
              specializing in domestic and international parcel delivery services.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              With years of experience in the industry, we have built a reputation for reliability,
              speed, and customer satisfaction. Our comprehensive network spans across 20+ countries,
              making us your ideal partner for all shipping needs.
            </p>
            <p className="text-lg text-gray-700">
              From individual parcel delivery to large-scale movers and packers services,
              we handle every shipment with utmost care and professionalism.
            </p>
          </div>
          <div className="bg-primary-50 rounded-lg p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-500 p-4 rounded-lg">
                  <span className="text-4xl text-white">🚚</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">10,000+</h3>
                  <p className="text-gray-600">Shipments Delivered</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-primary-500 p-4 rounded-lg">
                  <span className="text-4xl text-white">🌍</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">20+</h3>
                  <p className="text-gray-600">Countries Served</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-primary-500 p-4 rounded-lg">
                  <span className="text-4xl text-white">⭐</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">98%</h3>
                  <p className="text-gray-600">Customer Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To provide reliable, efficient, and cost-effective logistics solutions
                that connect people and businesses worldwide. We strive to exceed customer
                expectations through innovation, dedication, and exceptional service.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-5xl mb-4">👁️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To become the most trusted and preferred logistics partner globally,
                known for our commitment to quality, innovation, and customer satisfaction.
                We envision a future where distance is no barrier to commerce and connection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="font-bold text-gray-900 mb-2">Integrity</h3>
              <p className="text-sm text-gray-600">Honest and transparent in all dealings</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-sm text-gray-600">Committed to delivering the best</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">💪</div>
              <h3 className="font-bold text-gray-900 mb-2">Reliability</h3>
              <p className="text-sm text-gray-600">Dependable service every time</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🌟</div>
              <h3 className="font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-sm text-gray-600">Embracing new technologies</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-lg mb-6">
            Join thousands of satisfied customers who trust us with their shipments
          </p>
          <Link
            to="/booking"
            className="inline-block bg-secondary-400 text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-secondary-500 transition-all"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
