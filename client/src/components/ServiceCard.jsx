import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  return (
    <div className="card hover:transform hover:-translate-y-2">
      <div className="text-5xl mb-4">{service.icon}</div>
      <h3 className="text-2xl font-bold mb-3 text-gray-900">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <ul className="space-y-2 mb-6">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <span className="text-green-500 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        to="/booking"
        className="inline-block w-full text-center bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-all"
      >
        Book Now
      </Link>
    </div>
  );
};

export default ServiceCard;
