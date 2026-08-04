import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import { fetchUserXPThunk } from './xpThunks';
import { fetchNotificationsThunk } from './notificationThunks';
import { fetchRecentActivitiesThunk } from './activityThunks';

export const fetchCommunicationsThunk = createAsyncThunk(
  'communication/fetchCommunications',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.append('search', params.search);
      if (params.communicationType && params.communicationType !== 'All') queryParams.append('communicationType', params.communicationType);
      if (params.status && params.status !== 'All') queryParams.append('status', params.status);
      if (params.priority && params.priority !== 'All') queryParams.append('priority', params.priority);
      if (params.platform && params.platform !== 'All') queryParams.append('platform', params.platform);
      if (params.timeframe && params.timeframe !== 'All') queryParams.append('timeframe', params.timeframe);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);

      const url = `/communication${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await api.get(url);
      const data = response.data?.data || {};
      return {
        communications: data.communications || [],
        count: data.count || 0,
      };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch communications';
      return rejectWithValue(message);
    }
  }
);

export const fetchCommunicationStatsThunk = createAsyncThunk(
  'communication/fetchCommunicationStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/communication/stats');
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch communication stats';
      return rejectWithValue(message);
    }
  }
);

export const fetchCommunicationThunk = createAsyncThunk(
  'communication/fetchCommunication',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/communication/${id}`);
      return response.data?.data || null;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch communication record';
      return rejectWithValue(message);
    }
  }
);

export const createCommunicationThunk = createAsyncThunk(
  'communication/createCommunication',
  async (commData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/communication', commData);
      const newComm = response.data?.data;

      dispatch(fetchCommunicationStatsThunk());
      dispatch(fetchUserXPThunk());
      dispatch(fetchNotificationsThunk());
      dispatch(fetchRecentActivitiesThunk(5));

      return newComm;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to create communication record';
      return rejectWithValue(message);
    }
  }
);

export const updateCommunicationThunk = createAsyncThunk(
  'communication/updateCommunication',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/communication/${id}`, data);
      const updatedComm = response.data?.data;

      dispatch(fetchRecentActivitiesThunk(5));
      return updatedComm;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to update communication record';
      return rejectWithValue(message);
    }
  }
);

export const deleteCommunicationThunk = createAsyncThunk(
  'communication/deleteCommunication',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/communication/${id}`);
      dispatch(fetchCommunicationStatsThunk());
      dispatch(fetchRecentActivitiesThunk(5));
      return id;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to delete communication record';
      return rejectWithValue(message);
    }
  }
);

export const markCompletedThunk = createAsyncThunk(
  'communication/markCompleted',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.patch(`/communication/${id}/complete`);
      const updatedComm = response.data?.data;
      dispatch(fetchCommunicationStatsThunk());
      dispatch(fetchUserXPThunk());
      dispatch(fetchNotificationsThunk());
      dispatch(fetchRecentActivitiesThunk(5));
      return updatedComm;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to mark communication completed';
      return rejectWithValue(message);
    }
  }
);

export const markMissedThunk = createAsyncThunk(
  'communication/markMissed',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.patch(`/communication/${id}/missed`);
      const updatedComm = response.data?.data;
      dispatch(fetchCommunicationStatsThunk());
      dispatch(fetchNotificationsThunk());
      dispatch(fetchRecentActivitiesThunk(5));
      return updatedComm;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to mark communication missed';
      return rejectWithValue(message);
    }
  }
);
