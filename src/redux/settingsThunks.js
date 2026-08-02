import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchSettingsThunk = createAsyncThunk(
  'settings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/settings');
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch settings';
      return rejectWithValue(message);
    }
  }
);

export const updateSettingsThunk = createAsyncThunk(
  'settings/updateSettings',
  async (settingsData, { rejectWithValue }) => {
    try {
      const response = await api.put('/settings', settingsData);
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to update settings';
      return rejectWithValue(message);
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
  'settings/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.put('/settings/profile', profileData);
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to update profile';
      return rejectWithValue(message);
    }
  }
);

export const changePasswordThunk = createAsyncThunk(
  'settings/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await api.put('/settings/password', passwordData);
      return response.data?.message || 'Password updated successfully';
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to change password';
      return rejectWithValue(message);
    }
  }
);

export const updatePreferencesThunk = createAsyncThunk(
  'settings/updatePreferences',
  async (notificationSettings, { rejectWithValue }) => {
    try {
      const response = await api.put('/settings/preferences', notificationSettings);
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to update notification preferences';
      return rejectWithValue(message);
    }
  }
);

export const updateThemeThunk = createAsyncThunk(
  'settings/updateTheme',
  async (themeData, { rejectWithValue }) => {
    try {
      const response = await api.put('/settings/theme', themeData);
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to update theme';
      return rejectWithValue(message);
    }
  }
);

export const updatePrivacyThunk = createAsyncThunk(
  'settings/updatePrivacy',
  async (privacySettings, { rejectWithValue }) => {
    try {
      const response = await api.put('/settings/privacy', privacySettings);
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to update privacy settings';
      return rejectWithValue(message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'settings/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/settings/logout');
      return true;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to logout';
      return rejectWithValue(message);
    }
  }
);

export const logoutAllThunk = createAsyncThunk(
  'settings/logoutAll',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/settings/logout-all');
      return true;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to logout from all devices';
      return rejectWithValue(message);
    }
  }
);
