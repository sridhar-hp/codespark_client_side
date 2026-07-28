import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Fetch the authenticated user's total XP and level from /users/profile
export const fetchUserXPThunk = createAsyncThunk(
  'xp/fetchUserXP',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/profile');
      const stats = response.data?.data?.stats || {};
      return {
        totalXP: stats.totalXP || 0,
        level: stats.level || 1,
      };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch user XP';
      return rejectWithValue(message);
    }
  }
);
