import { useState, useEffect } from 'react';
import api from '../../services/api';

const SupportDesk = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, [filter]);

  const fetchInquiries = async () => {
    try {
      const params = filter ? `?status=${filter}` : '';
      const response = await api.get(`/inquiries${params}`);
      if (response.data.success) {
        setInquiries(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/inquiries/${id}`, { status: newStatus });
      fetchInquiries();
    } catch (error) {
      alert('Error updating status: ' + error.message);
    }
  };

  const handleSaveNotes = async () => {
    try {
      await api.put(`/inquiries/${selectedInquiry._id}`, { adminNotes });
      fetchInquiries();
      closeModal();
    } catch (error) {
      alert('Error saving notes: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await api.delete(`/inquiries/${id}`);
        fetchInquiries();
      } catch (error) {
        alert('Error deleting inquiry: ' + error.message);
      }
    }
  };

  const openModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setAdminNotes(inquiry.adminNotes || '');
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedInquiry(null);
    setShowModal(false);
    setAdminNotes('');
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
          <h1 className="text-3xl font-bold text-gray-900">Support Desk</h1>
          <p className="text-gray-600 mt-1">View and manage customer queries & contact form submissions</p>
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
              onClick={() => setFilter('new')}
              className={`px-4 py-2 rounded-lg ${filter === 'new' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              New
            </button>
            <button
              onClick={() => setFilter('responded')}
              className={`px-4 py-2 rounded-lg ${filter === 'responded' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Responded
            </button>
            <button
              onClick={() => setFilter('closed')}
              className={`px-4 py-2 rounded-lg ${filter === 'closed' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Closed
            </button>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
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
                {inquiries.length > 0 ? (
                  inquiries.map((inquiry) => (
                    <tr key={inquiry._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{inquiry.name}</p>
                          <p className="text-sm text-gray-600">{inquiry.email}</p>
                          <p className="text-sm text-gray-600">{inquiry.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{inquiry.subject}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900 max-w-xs truncate">{inquiry.message}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={inquiry.status}
                          onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border-0 ${
                            inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
                            inquiry.status === 'responded' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="responded">Responded</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openModal(inquiry)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(inquiry._id)}
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
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-600">
                      No inquiries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Inquiry Details</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900 text-3xl"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold">{selectedInquiry.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{selectedInquiry.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">{selectedInquiry.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold capitalize">{selectedInquiry.status}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Subject</p>
                  <p className="font-semibold">{selectedInquiry.subject}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Message</p>
                  <p className="font-semibold whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Submitted On</p>
                  <p className="font-semibold">
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Notes
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows="3"
                    className="input-field"
                    placeholder="Add notes about this inquiry..."
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex gap-4">
                <button
                  onClick={handleSaveNotes}
                  className="flex-1 btn-primary"
                >
                  Save Notes
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 font-semibold"
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

export default SupportDesk;
