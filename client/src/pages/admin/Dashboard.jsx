import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getBookingStats } from '../../services/bookingService';
import api from '../../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch booking stats
      const statsResponse = await getBookingStats();
      if (statsResponse.success) {
        setStats(statsResponse.data);
      }

      // Fetch recent bookings
      const bookingsResponse = await api.get('/bookings?limit=5');
      if (bookingsResponse.data.success) {
        setRecentBookings(bookingsResponse.data.data);
      }

      // Fetch recent inquiries
      const inquiriesResponse = await api.get('/inquiries?limit=5');
      if (inquiriesResponse.data.success) {
        setRecentInquiries(inquiriesResponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.username}!</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Bookings</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <span className="text-3xl">📦</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <span className="text-3xl">⏳</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Confirmed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <span className="text-3xl">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.completed}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <span className="text-3xl">🎉</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Cancelled</p>
                  <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <span className="text-3xl">❌</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/bookings"
            className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-all text-center"
          >
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-lg font-bold text-gray-900">Manage Bookings</h3>
            <p className="text-gray-600 text-sm mt-2">View and manage all bookings</p>
          </Link>

          <Link
            to="/admin/tracking"
            className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-all text-center"
          >
            <div className="text-4xl mb-3">📍</div>
            <h3 className="text-lg font-bold text-gray-900">Manage Tracking</h3>
            <p className="text-gray-600 text-sm mt-2">Update tracking information</p>
          </Link>

          <Link
            to="/admin/support"
            className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-all text-center"
          >
            <div className="text-4xl mb-3">🎧</div>
            <h3 className="text-lg font-bold text-gray-900">Support Desk</h3>
            <p className="text-gray-600 text-sm mt-2">View customer queries & inquiries</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
            </div>
            <div className="p-6">
              {recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking._id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">{booking.name}</p>
                          {booking.bookingCode && (
                            <p className="text-xs font-mono text-primary-600">{booking.bookingCode}</p>
                          )}
                          <p className="text-sm text-gray-600">
                            {booking.origin} → {booking.destination}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-4">No recent bookings</p>
              )}
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recent Inquiries</h2>
            </div>
            <div className="p-6">
              {recentInquiries.length > 0 ? (
                <div className="space-y-4">
                  {recentInquiries.map((inquiry) => (
                    <div key={inquiry._id} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">{inquiry.name}</p>
                          <p className="text-sm text-gray-600">{inquiry.subject}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          inquiry.status === 'responded' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {inquiry.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-4">No recent inquiries</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
