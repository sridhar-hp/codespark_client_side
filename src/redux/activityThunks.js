import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchTimelineThunk = createAsyncThunk(
  'activity/fetchTimeline',
  async (moduleFilter, { rejectWithValue }) => {
    try {
      const url = moduleFilter && moduleFilter !== 'All'
        ? `/activity?module=${encodeURIComponent(moduleFilter)}`
        : '/activity';
      const response = await api.get(url);
      const data = response.data?.data || {};
      return {
        activities: data.activities || [],
        count: data.count || 0,
      };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch activity timeline';
      return rejectWithValue(message);
    }
  }
);

export const fetchRecentActivitiesThunk = createAsyncThunk(
  'activity/fetchRecent',
  async (limit = 5, { rejectWithValue }) => {
    try {
      const response = await api.get(`/activity/recent?limit=${limit}`);
      const data = response.data?.data || {};
      return data.activities || [];
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch recent activities';
      return rejectWithValue(message);
    }
  }
);

export const clearActivityThunk = createAsyncThunk(
  'activity/clearActivity',
  async (_, { rejectWithValue }) => {
    try {
      await api.delete('/activity/clear');
      return true;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to clear activity timeline';
      return rejectWithValue(message);
    }
  }
);
