import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchLeetCodeProfileThunk = createAsyncThunk(
  'leetcode/fetchProfile',
  async (forceSync = false, { rejectWithValue }) => {
    try {
      const url = forceSync ? '/leetcode/profile?forceSync=true' : '/leetcode/profile';
      const response = await api.get(url);
      return response.data?.data || { connected: false, profile: null, stats: null, submissions: [], submissionCalendar: {} };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch LeetCode profile';
      return rejectWithValue(message);
    }
  }
);

export const fetchLeetCodeActivityThunk = createAsyncThunk(
  'leetcode/fetchActivity',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/leetcode/activity');
      return response.data?.data || { connected: false, submissions: [], submissionCalendar: {} };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch LeetCode activity';
      return rejectWithValue(message);
    }
  }
);

export const fetchLeetCodeStatsThunk = createAsyncThunk(
  'leetcode/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/leetcode/stats');
      return response.data?.data || { connected: false, stats: null };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch LeetCode statistics';
      return rejectWithValue(message);
    }
  }
);

export const syncLeetCodeThunk = createAsyncThunk(
  'leetcode/syncProfile',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/leetcode/sync');
      return response.data?.data || {};
    } catch (err) {
      dispatch(fetchLeetCodeProfileThunk(true));
      const message = err.response?.data?.message || err.message || 'Failed to sync LeetCode profile';
      return rejectWithValue(message);
    }
  }
);

export const connectLeetCodeThunk = createAsyncThunk(
  'leetcode/connectUsername',
  async (leetcodeUsername, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/leetcode/connect', { leetcodeUsername });
      dispatch(fetchLeetCodeProfileThunk(true));
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to connect LeetCode account';
      return rejectWithValue(message);
    }
  }
);
