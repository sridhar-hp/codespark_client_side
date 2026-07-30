import { createSlice } from '@reduxjs/toolkit';
import {
  fetchLeetCodeProfileThunk,
  fetchLeetCodeActivityThunk,
  fetchLeetCodeStatsThunk,
  syncLeetCodeThunk,
  connectLeetCodeThunk,
} from './leetcodeThunks';

const initialState = {
  connected: false,
  leetcodeUsername: '',
  profile: null,
  stats: null,
  submissions: [],
  submissionCalendar: {},
  loading: false,
  connecting: false,
  syncing: false,
  error: null,
  connectError: null,
};

const formatError = (payload, fallback) => {
  if (!payload) return fallback;
  if (typeof payload === 'string') return payload;
  if (typeof payload === 'object') return payload.message || fallback;
  return String(payload);
};

const leetcodeSlice = createSlice({
  name: 'leetcode',
  initialState,
  reducers: {
    clearLeetCodeErrors: (state) => {
      state.error = null;
      state.connectError = null;
    },
    disconnectLeetCode: (state) => {
      state.connected = false;
      state.leetcodeUsername = '';
      state.profile = null;
      state.stats = null;
      state.submissions = [];
      state.submissionCalendar = {};
    },
  },
  extraReducers: (builder) => {
    // Fetch Profile
    builder
      .addCase(fetchLeetCodeProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeetCodeProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.connected = action.payload.connected || false;
        state.leetcodeUsername = action.payload.leetcodeUsername || state.leetcodeUsername;
        state.profile = action.payload.profile || null;
        state.stats = action.payload.stats || null;
        state.submissions = action.payload.submissions || [];
        state.submissionCalendar = action.payload.submissionCalendar || {};
      })
      .addCase(fetchLeetCodeProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = formatError(action.payload, 'Failed to fetch LeetCode profile');
      });

    // Fetch Activity
    builder
      .addCase(fetchLeetCodeActivityThunk.fulfilled, (state, action) => {
        if (action.payload.submissions) state.submissions = action.payload.submissions;
        if (action.payload.submissionCalendar) state.submissionCalendar = action.payload.submissionCalendar;
      });

    // Fetch Stats
    builder
      .addCase(fetchLeetCodeStatsThunk.fulfilled, (state, action) => {
        if (action.payload.stats) state.stats = action.payload.stats;
      });

    // Sync Profile
    builder
      .addCase(syncLeetCodeThunk.pending, (state) => {
        state.syncing = true;
        state.error = null;
      })
      .addCase(syncLeetCodeThunk.fulfilled, (state, action) => {
        state.syncing = false;
        if (action.payload.connected) {
          state.connected = true;
          state.leetcodeUsername = action.payload.leetcodeUsername || state.leetcodeUsername;
          state.profile = action.payload.profile || state.profile;
          state.stats = action.payload.stats || state.stats;
          state.submissions = action.payload.submissions || state.submissions;
          state.submissionCalendar = action.payload.submissionCalendar || state.submissionCalendar;
        }
      })
      .addCase(syncLeetCodeThunk.rejected, (state, action) => {
        state.syncing = false;
        state.error = formatError(action.payload, 'Failed to sync LeetCode data');
      });

    // Connect Username
    builder
      .addCase(connectLeetCodeThunk.pending, (state) => {
        state.connecting = true;
        state.connectError = null;
      })
      .addCase(connectLeetCodeThunk.fulfilled, (state, action) => {
        state.connecting = false;
        if (action.payload.connected) {
          state.connected = true;
          state.leetcodeUsername = action.payload.leetcodeUsername || state.leetcodeUsername;
          state.profile = action.payload.profile || state.profile;
          state.stats = action.payload.stats || state.stats;
          state.submissions = action.payload.submissions || state.submissions;
          state.submissionCalendar = action.payload.submissionCalendar || state.submissionCalendar;
        }
      })
      .addCase(connectLeetCodeThunk.rejected, (state, action) => {
        state.connecting = false;
        state.connectError = formatError(action.payload, 'Failed to connect LeetCode username');
      });
  },
});

export const { clearLeetCodeErrors, disconnectLeetCode } = leetcodeSlice.actions;
export default leetcodeSlice.reducer;
