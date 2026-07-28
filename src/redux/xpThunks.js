import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Fetch the authenticated user's total XP from /users/profile
export const fetchUserXPThunk = createAsyncThunk(
  'xp/fetchUserXP',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/profile');
      // response.data -> { success: true, message, data: userObj }
      const totalXP = response.data?.data?.stats?.totalXP || 0;
      return totalXP;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch user XP';
      return rejectWithValue(message);
    }
  }
);
