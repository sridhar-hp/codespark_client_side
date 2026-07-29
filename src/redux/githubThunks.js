import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Fetch GitHub profile and recent repos from GET /api/v1/github/profile
export const fetchGithubProfileThunk = createAsyncThunk(
  'github/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/github/profile');
      return response.data?.data || { connected: false, profile: null, repos: [] };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch GitHub profile';
      return rejectWithValue(message);
    }
  }
);

// Connect or update GitHub username via POST /api/v1/github/connect
export const connectGithubThunk = createAsyncThunk(
  'github/connectUsername',
  async (githubUsername, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/github/connect', { githubUsername });
      // Refetch profile & repos after connecting
      dispatch(fetchGithubProfileThunk());
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to connect GitHub account';
      return rejectWithValue(message);
    }
  }
);
