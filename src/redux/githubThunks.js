import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchGithubProfileThunk = createAsyncThunk(
  'github/fetchProfile',
  async (forceSync = false, { rejectWithValue }) => {
    try {
      const url = forceSync ? '/github/profile?forceSync=true' : '/github/profile';
      const response = await api.get(url);
      return response.data?.data || { connected: false, profile: null, repos: [], analytics: null, contributions: null };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch GitHub profile';
      return rejectWithValue(message);
    }
  }
);

export const syncGithubThunk = createAsyncThunk(
  'github/syncProfile',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/github/sync');
      return response.data?.data || {};
    } catch (err) {
      // Fallback to forceSync GET if POST /sync failover occurs
      dispatch(fetchGithubProfileThunk(true));
      const message = err.response?.data?.message || err.message || 'Failed to sync GitHub profile';
      return rejectWithValue(message);
    }
  }
);

export const connectGithubThunk = createAsyncThunk(
  'github/connectUsername',
  async (githubUsername, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/github/connect', { githubUsername });
      dispatch(fetchGithubProfileThunk(true));
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to connect GitHub account';
      return rejectWithValue(message);
    }
  }
);
