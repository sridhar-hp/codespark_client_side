import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Fetch today's progress by date (YYYY-MM-DD)
export const fetchTodayProgressThunk = createAsyncThunk(
  'dailyProgress/fetchTodayProgress',
  async (dateString, { rejectWithValue }) => {
    try {
      const targetDate = dateString || new Date().toISOString().split('T')[0];
      const response = await api.get(`/daily-progress/date?date=${targetDate}`);
      // response.data -> { success: true, message, data: { ... } }
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch daily progress';
      return rejectWithValue(message);
    }
  }
);

// Record daily progress update
export const recordDailyProgressThunk = createAsyncThunk(
  'dailyProgress/recordDailyProgress',
  async ({ date, tasksCompleted, xpEarned }, { rejectWithValue }) => {
    try {
      const targetDate = date || new Date().toISOString().split('T')[0];
      const response = await api.post('/daily-progress', {
        date: targetDate,
        tasksCompleted: tasksCompleted || 0,
        xpEarned: xpEarned || 0,
      });
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to record daily progress';
      return rejectWithValue(message);
    }
  }
);
