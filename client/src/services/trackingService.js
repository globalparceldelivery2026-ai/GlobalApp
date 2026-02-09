import api from './api';

// Create tracking (admin)
export const createTracking = async (trackingData) => {
  const response = await api.post('/tracking', trackingData);
  return response.data;
};

// Get tracking by tracking number (public)
export const getTrackingByNumber = async (trackingNumber) => {
  const response = await api.get(`/tracking/${trackingNumber}`);
  return response.data;
};

// Get all tracking entries (admin)
export const getAllTracking = async (params = {}) => {
  const response = await api.get('/tracking', { params });
  return response.data;
};

// Update tracking (admin)
export const updateTracking = async (id, updateData) => {
  const response = await api.put(`/tracking/${id}/update`, updateData);
  return response.data;
};

// Delete tracking (admin)
export const deleteTracking = async (id) => {
  const response = await api.delete(`/tracking/${id}`);
  return response.data;
};
