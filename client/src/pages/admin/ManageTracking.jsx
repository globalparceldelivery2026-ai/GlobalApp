import { useState, useEffect } from 'react';
import { createTracking, getAllTracking, updateTracking, deleteTracking } from '../../services/trackingService';
import { getAllBookings } from '../../services/bookingService';
import { TRACKING_STATUS } from '../../utils/constants';

const ManageTracking = () => {
  const [trackings, setTrackings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTracking, setSelectedTracking] = useState(null);

  const [createForm, setCreateForm] = useState({
    senderName: '',
    receiverName: '',
    origin: '',
    destination: '',
    bookingRef: '',
    estimatedDelivery: ''
  });

  const [updateForm, setUpdateForm] = useState({
    status: '',
    location: '',
    description: '',
    currentLocation: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [trackingResponse, bookingResponse] = await Promise.all([
        getAllTracking(),
        getAllBookings({ status: 'confirmed' })
      ]);

      if (trackingResponse.success) {
        setTrackings(trackingResponse.data);
      }

      if (bookingResponse.success) {
        setBookings(bookingResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTracking(createForm);
      if (response.success) {
        alert('Tracking created successfully!');
        setShowCreateModal(false);
        setCreateForm({
          senderName: '',
          receiverName: '',
          origin: '',
          destination: '',
          bookingRef: '',
          estimatedDelivery: ''
        });
        fetchData();
      }
    } catch (error) {
      alert('Error creating tracking: ' + error.message);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateTracking(selectedTracking._id, updateForm);
      if (response.success) {
        alert('Tracking updated successfully!');
        setShowUpdateModal(false);
        setUpdateForm({ status: '', location: '', description: '', currentLocation: '' });
        fetchData();
      }
    } catch (error) {
      alert('Error updating tracking: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tracking?')) {
      try {
        await deleteTracking(id);
        fetchData();
      } catch (error) {
        alert('Error deleting tracking: ' + error.message);
      }
    }
  };

  const openUpdateModal = (tracking) => {
    setSelectedTracking(tracking);
    setUpdateForm({
      status: tracking.status,
      location: '',
      description: '',
      currentLocation: tracking.currentLocation
    });
    setShowUpdateModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Tracking</h1>
              <p className="text-gray-600 mt-1">Create and update tracking information</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              Create New Tracking
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tracking Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tracking Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trackings.length > 0 ? (
                  trackings.map((tracking) => (
                    <tr key={tracking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{tracking.trackingNumber}</p>
                        <p className="text-sm text-gray-600">{tracking.senderName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{tracking.origin}</p>
                        <p className="text-xs text-gray-600">↓</p>
                        <p className="text-sm text-gray-900">{tracking.destination}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          tracking.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          tracking.status === 'in-transit' ? 'bg-yellow-100 text-yellow-800' :
                          tracking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {TRACKING_STATUS[tracking.status]?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{tracking.currentLocation}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openUpdateModal(tracking)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDelete(tracking._id)}
                            className="text-red-600 hover:text-red-800 font-medium text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-600">
                      No tracking entries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create New Tracking</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-600 hover:text-gray-900 text-3xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sender Name *
                    </label>
                    <input
                      type="text"
                      value={createForm.senderName}
                      onChange={(e) => setCreateForm({ ...createForm, senderName: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Receiver Name *
                    </label>
                    <input
                      type="text"
                      value={createForm.receiverName}
                      onChange={(e) => setCreateForm({ ...createForm, receiverName: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Origin *
                    </label>
                    <input
                      type="text"
                      value={createForm.origin}
                      onChange={(e) => setCreateForm({ ...createForm, origin: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Destination *
                    </label>
                    <input
                      type="text"
                      value={createForm.destination}
                      onChange={(e) => setCreateForm({ ...createForm, destination: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link to Booking (Optional)
                    </label>
                    <select
                      value={createForm.bookingRef}
                      onChange={(e) => setCreateForm({ ...createForm, bookingRef: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Select Booking</option>
                      {bookings.map((booking) => (
                        <option key={booking._id} value={booking._id}>
                          {booking.name} - {booking.origin} to {booking.destination}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Delivery
                    </label>
                    <input
                      type="date"
                      value={createForm.estimatedDelivery}
                      onChange={(e) => setCreateForm({ ...createForm, estimatedDelivery: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button type="submit" className="flex-1 btn-primary">
                    Create Tracking
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && selectedTracking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Update Tracking: {selectedTracking.trackingNumber}
                </h2>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="text-gray-600 hover:text-gray-900 text-3xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={updateForm.status}
                    onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                    className="input-field"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="booked">Booked</option>
                    <option value="picked-up">Picked Up</option>
                    <option value="in-transit">In Transit</option>
                    <option value="out-for-delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={updateForm.location}
                    onChange={(e) => setUpdateForm({ ...updateForm, location: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Mumbai Distribution Center"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={updateForm.description}
                    onChange={(e) => setUpdateForm({ ...updateForm, description: e.target.value })}
                    className="input-field"
                    rows="3"
                    placeholder="e.g., Package received at distribution center"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Location
                  </label>
                  <input
                    type="text"
                    value={updateForm.currentLocation}
                    onChange={(e) => setUpdateForm({ ...updateForm, currentLocation: e.target.value })}
                    className="input-field"
                    placeholder="Update current location if needed"
                  />
                </div>

                <div className="flex space-x-4">
                  <button type="submit" className="flex-1 btn-primary">
                    Add Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUpdateModal(false)}
                    className="flex-1 btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTracking;
