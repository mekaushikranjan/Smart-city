import api from '../utils/api';

export const ComplaintService = {
  async getComplaints() {
    try {
      const response = await api.get('/complaints');
      return response.data;
    } catch (error) {
      console.error('Complaints API Error:', error.message);
      throw error; // Re-throw to handle in components
    }
  },

  async createComplaint(data) {
    try {
      const response = await api.post('/complaints', data);
      return response.data;
    } catch (error) {
      console.error('Create Complaint Error:', error.message);
      throw error;
    }
  }
  
  // Add other complaint-related methods here
};