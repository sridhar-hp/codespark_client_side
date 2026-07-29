import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Fetch achievements from GET /api/v1/achievements
export const fetchAchievementsThunk = createAsyncThunk(
  'achievements/fetchAchievements',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/achievements');
      // response.data -> { success: true, message, data: { unlockedCount, totalCount, achievements: [...] } }
      return response.data?.data || { unlockedCount: 0, totalCount: 0, achievements: [] };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch achievements';
      return rejectWithValue(message);
    }
  }
);

// Trigger checking and unlocking achievements via POST /api/v1/achievements/check
export const checkAchievementsThunk = createAsyncThunk(
  'achievements/checkAchievements',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/achievements/check');
      return response.data?.data || { unlockedCount: 0, totalCount: 0, achievements: [] };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to check achievements';
      return rejectWithValue(message);
    }
  }
);
