import { COUNTRIES } from '../utils/constants';

const CountryList = () => {
  // Group countries by region
  const groupedCountries = COUNTRIES.reduce((acc, country) => {
    if (!acc[country.region]) {
      acc[country.region] = [];
    }
    acc[country.region].push(country);
    return acc;
  }, {});

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Countries We Serve
          </h2>
          <p className="text-xl text-gray-600">
            Delivering excellence across 20+ countries worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedCountries).map(([region, countries]) => (
            <div key={region} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-primary-600 mb-4">{region}</h3>
              <div className="space-y-2">
                {countries.map((country) => (
                  <div
                    key={country.name}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded transition-colors"
                  >
                    <span className="text-3xl">{country.flag}</span>
                    <span className="text-gray-800 font-medium">{country.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountryList;
