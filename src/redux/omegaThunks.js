// src/redux/omegaThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import { fetchUserXPThunk } from './xpThunks';
import { fetchNotificationsThunk } from './notificationThunks';
import { fetchRecentActivitiesThunk } from './activityThunks';
import { fetchCommunicationStatsThunk } from './communicationThunks';

export const fetchOmegaStatsThunk = createAsyncThunk(
  'omega/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/omega/stats');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch Omega statistics');
    }
  }
);

export const fetchOmegaHistoryThunk = createAsyncThunk(
  'omega/fetchHistory',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/omega/history', { params });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch Omega history');
    }
  }
);

export const startOmegaSessionThunk = createAsyncThunk(
  'omega/startSession',
  async (sessionData, { rejectWithValue }) => {
    try {
      const response = await api.post('/omega/session/start', sessionData);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to start Omega session');
    }
  }
);

export const endOmegaSessionThunk = createAsyncThunk(
  'omega/endSession',
  async (sessionData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/omega/session/end', sessionData);
      const data = response.data.data;

      // Automatically refresh full ecosystem Redux states
      dispatch(fetchOmegaStatsThunk());
      dispatch(fetchCommunicationStatsThunk());
      dispatch(fetchUserXPThunk());
      dispatch(fetchNotificationsThunk());
      dispatch(fetchRecentActivitiesThunk(5));

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to end Omega session');
    }
  }
);
