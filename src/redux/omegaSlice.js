// src/redux/omegaSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchOmegaStatsThunk,
  fetchOmegaHistoryThunk,
  startOmegaSessionThunk,
  endOmegaSessionThunk,
} from './omegaThunks';

const initialState = {
  currentSession: null,
  history: [],
  stats: {
    lastPracticeDate: 'No practice yet',
    lastPracticeTime: '0m',
    totalPracticeDuration: '0 mins',
    todayPracticeDuration: '0 mins',
    totalOmegaSessions: 0,
    longestSession: '0 mins',
    currentPracticeStreak: '0 Days',
    bestStreak: '0 Days',
    avgSessionDuration: '0 mins',
    todaySessionsCount: 0,
    totalConversationsCount: 0,
    hasData: false,
    lastSync: null,
  },
  loading: false,
  error: null,
  lastSync: null,
};

const omegaSlice = createSlice({
  name: 'omega',
  initialState,
  reducers: {
    clearOmegaError: (state) => {
      state.error = null;
    },
    setCurrentSession: (state, action) => {
      state.currentSession = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Stats
    builder
      .addCase(fetchOmegaStatsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOmegaStatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.stats = { ...state.stats, ...action.payload };
          state.lastSync = new Date().toISOString();
        }
      })
      .addCase(fetchOmegaStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch Omega stats';
      });

    // Fetch History
    builder
      .addCase(fetchOmegaHistoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOmegaHistoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload || [];
      })
      .addCase(fetchOmegaHistoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch Omega history';
      });

    // Start Session
    builder
      .addCase(startOmegaSessionThunk.fulfilled, (state, action) => {
        state.currentSession = action.payload;
      });

    // End Session
    builder
      .addCase(endOmegaSessionThunk.fulfilled, (state) => {
        state.currentSession = null;
        state.lastSync = new Date().toISOString();
      });
  },
});

export const { clearOmegaError, setCurrentSession } = omegaSlice.actions;
export default omegaSlice.reducer;
