import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Register user
export const registerThunk = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const payload = response.data.data;

      localStorage.setItem('accessToken', payload.accessToken);
      localStorage.setItem('refreshToken', payload.refreshToken);
      localStorage.setItem('user', JSON.stringify(payload.user));

      return payload;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Registration failed';
      return rejectWithValue(message);
    }
  }
);

// Login user
export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      // response.data -> { success: true, message, data: { user, accessToken, refreshToken } }
      const payload = response.data.data;
      
      // Store in localStorage for persistence
      localStorage.setItem('accessToken', payload.accessToken);
      localStorage.setItem('refreshToken', payload.refreshToken);
      localStorage.setItem('user', JSON.stringify(payload.user));

      return payload;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

// Logout user
export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken || localStorage.getItem('accessToken');
      if (token) {
        await api.post('/auth/logout', null, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (err) {
      // Ignore network/server logout errors during local cleanup
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  }
);

// Refresh access token
export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    try {
      const refreshToken = getState().auth.refreshToken || localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/auth/refresh', { refreshToken });
      const payload = response.data.data; // { accessToken, refreshToken }

      localStorage.setItem('accessToken', payload.accessToken);
      if (payload.refreshToken) {
        localStorage.setItem('refreshToken', payload.refreshToken);
      }

      return payload;
    } catch (err) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      const message = err.response?.data?.message || err.message || 'Token refresh failed';
      return rejectWithValue(message);
    }
  }
);

// Fetch user profile
export const fetchProfileThunk = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/profile');
      // response.data -> { success: true, message, data: user }
      const user = response.data.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch profile';
      return rejectWithValue(message);
    }
  }
);
