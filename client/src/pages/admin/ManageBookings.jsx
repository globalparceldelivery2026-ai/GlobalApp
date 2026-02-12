import { useState, useEffect } from 'react';
import { getAllBookings, updateBooking, deleteBooking } from '../../services/bookingService';
import { BOOKING_STATUS } from '../../utils/constants';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingPrice, setEditingPrice] = useState(null);
  const [priceValue, setPriceValue] = useState('');

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      const params = filter ? { status: filter } : {};
      const response = await getAllBookings(params);
      if (response.success) {
        setBookings(response.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateBooking(id, { status: newStatus });
      fetchBookings();
    } catch (error) {
      alert('Error updating status: ' + error.message);
    }
  };

  const handlePriceSave = async (id) => {
    try {
      await updateBooking(id, { estimatedCost: parseFloat(priceValue) || 0 });
      setEditingPrice(null);
      setPriceValue('');
      fetchBookings();
    } catch (error) {
      alert('Error updating price: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(id);
        fetchBookings();
      } catch (error) {
        alert('Error deleting booking: ' + error.message);
      }
    }
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setShowModal(false);
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
          <h1 className="text-3xl font-bold text-gray-900">Manage Bookings</h1>
          <p className="text-gray-600 mt-1">View and manage all booking requests</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <label className="font-semibold text-gray-700">Filter by Status:</label>
            <button
              onClick={() => setFilter('')}
              className={`px-4 py-2 rounded-lg ${!filter ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`px-4 py-2 rounded-lg ${filter === 'confirmed' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`px-4 py-2 rounded-lg ${filter === 'cancelled' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Cancelled
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono font-semibold text-primary-600">
                          {booking.bookingCode || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{booking.name}</p>
                          <p className="text-sm text-gray-600">{booking.email}</p>
                          <p className="text-sm text-gray-600">{booking.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{booking.serviceType}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{booking.origin}</p>
                        <p className="text-xs text-gray-600">↓</p>
                        <p className="text-sm text-gray-900">{booking.destination}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{booking.weight} kg</span>
                      </td>
                      <td className="px-6 py-4">
                        {editingPrice === booking._id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={priceValue}
                              onChange={(e) => setPriceValue(e.target.value)}
                              className="w-24 px-2 py-1 border rounded text-sm"
                              min="0"
                              step="0.01"
                              autoFocus
                            />
                            <button
                              onClick={() => handlePriceSave(booking._id)}
                              className="text-green-600 hover:text-green-800 text-sm font-medium"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => { setEditingPrice(null); setPriceValue(''); }}
                              className="text-gray-400 hover:text-gray-600 text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <span
                            onClick={() => { setEditingPrice(booking._id); setPriceValue(booking.estimatedCost || ''); }}
                            className="text-sm text-gray-900 cursor-pointer hover:text-primary-600"
                            title="Click to edit price"
                          >
                            {booking.estimatedCost ? `₹${booking.estimatedCost}` : 'Set price'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border-0 ${
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openModal(booking)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(booking._id)}
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
                    <td colSpan="8" className="px-6 py-8 text-center text-gray-600">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900 text-3xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Booking Code</p>
                    <p className="font-semibold font-mono text-primary-600">{selectedBooking.bookingCode || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold">{selectedBooking.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{selectedBooking.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">{selectedBooking.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Service Type</p>
                    <p className="font-semibold">{selectedBooking.serviceType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Origin</p>
                    <p className="font-semibold">{selectedBooking.origin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Destination</p>
                    <p className="font-semibold">{selectedBooking.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="font-semibold">{selectedBooking.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-semibold">{selectedBooking.estimatedCost ? `₹${selectedBooking.estimatedCost}` : 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold capitalize">{selectedBooking.status}</p>
                  </div>
                </div>

                {selectedBooking.description && (
                  <div>
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="font-semibold">{selectedBooking.description}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600">Created At</p>
                  <p className="font-semibold">
                    {new Date(selectedBooking.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="w-full btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
