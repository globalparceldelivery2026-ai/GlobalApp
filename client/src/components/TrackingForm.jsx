import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrackingForm = ({ compact = false }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      navigate(`/tracking?number=${trackingNumber.toUpperCase()}`);
    }
  };

  return (
    <div className={compact ? '' : 'bg-white rounded-lg shadow-xl p-8'}>
      <form onSubmit={handleSubmit}>
        <div className={compact ? 'flex gap-2' : 'space-y-4'}>
          <div className="flex-grow">
            <label htmlFor="trackingNumber" className={compact ? 'sr-only' : 'block text-sm font-medium text-gray-700 mb-2'}>
              Tracking Number
            </label>
            <input
              type="text"
              id="trackingNumber"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter your tracking number (e.g., GPD123456789)"
              className={compact ? 'input-field' : 'input-field text-lg'}
              required
            />
          </div>
          <button
            type="submit"
            className={compact ? 'btn-primary whitespace-nowrap' : 'btn-primary w-full text-lg py-4'}
          >
            Track Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrackingForm;
