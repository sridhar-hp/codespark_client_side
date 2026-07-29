import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Fetch analytics summary metrics from GET /api/v1/analytics
export const fetchAnalyticsThunk = createAsyncThunk(
  'analytics/fetchAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/analytics');
      // response.data -> { success: true, message, data: analyticsObj }
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch analytics';
      return rejectWithValue(message);
    }
  }
);
