import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TrackingForm from '../components/TrackingForm';
import { getTrackingByNumber } from '../services/trackingService';
import { TRACKING_STATUS } from '../utils/constants';

const Tracking = () => {
  const [searchParams] = useSearchParams();
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const number = searchParams.get('number');
    if (number) {
      fetchTracking(number);
    }
  }, [searchParams]);

  const fetchTracking = async (trackingNumber) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTrackingByNumber(trackingNumber);
      if (response.success) {
        setTrackingData(response.data);
      }
    } catch (err) {
      setError(err.message);
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Track Your Shipment</h1>
          <p className="text-xl">Enter your tracking number to get real-time updates</p>
        </div>
      </div>

      {/* Tracking Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12 relative z-10">
        <TrackingForm />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <div className="flex">
              <span className="text-3xl mr-4">⚠️</span>
              <div>
                <h3 className="text-xl font-bold text-red-800 mb-2">Tracking Not Found</h3>
                <p className="text-red-700">{error}</p>
                <p className="text-red-600 mt-2">Please check your tracking number and try again.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tracking Results */}
      {trackingData && !loading && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {/* Status Card */}
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Tracking Number: {trackingData.trackingNumber}
                </h2>
                <p className="text-gray-600">
                  {trackingData.origin} → {trackingData.destination}
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">
                  {TRACKING_STATUS[trackingData.status]?.icon}
                </div>
                <span className={`px-4 py-2 rounded-full text-white font-semibold bg-${TRACKING_STATUS[trackingData.status]?.color}-500`}>
                  {TRACKING_STATUS[trackingData.status]?.label}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6">
              <div>
                <p className="text-gray-600 mb-1">Sender</p>
                <p className="font-semibold text-gray-900">{trackingData.senderName}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Receiver</p>
                <p className="font-semibold text-gray-900">{trackingData.receiverName}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Current Location</p>
                <p className="font-semibold text-gray-900">{trackingData.currentLocation}</p>
              </div>
            </div>

            {trackingData.estimatedDelivery && (
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">
                  <span className="font-semibold">Estimated Delivery:</span>{' '}
                  {new Date(trackingData.estimatedDelivery).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Shipment History</h3>
            <div className="space-y-6">
              {trackingData.updates && trackingData.updates.length > 0 ? (
                trackingData.updates.map((update, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-primary-500' : 'bg-gray-300'}`}></div>
                      {index !== trackingData.updates.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-300 my-1"></div>
                      )}
                    </div>
                    <div className="flex-grow pb-6">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-gray-900">{update.status}</h4>
                        <span className="text-sm text-gray-600">
                          {new Date(update.timestamp).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-gray-600">{update.description}</p>
                      <p className="text-sm text-gray-500 mt-1">📍 {update.location}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No tracking updates available yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      {!trackingData && !loading && !error && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Track Your Shipment</h3>
            <div className="text-left space-y-4 max-w-2xl mx-auto">
              <p className="flex items-start">
                <span className="text-primary-500 font-bold mr-2">1.</span>
                Enter your tracking number in the search box above
              </p>
              <p className="flex items-start">
                <span className="text-primary-500 font-bold mr-2">2.</span>
                Your tracking number starts with "GPD" followed by 12 digits (e.g., GPD123456789012)
              </p>
              <p className="flex items-start">
                <span className="text-primary-500 font-bold mr-2">3.</span>
                View real-time updates on your shipment's location and status
              </p>
              <p className="flex items-start">
                <span className="text-primary-500 font-bold mr-2">4.</span>
                For assistance, contact us at 8591640143 or 7506469492
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracking;
