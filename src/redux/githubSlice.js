import { createSlice } from '@reduxjs/toolkit';
import { fetchGithubProfileThunk, connectGithubThunk, syncGithubThunk } from './githubThunks';

const initialState = {
  connected: false,
  profile: null,
  repos: [],
  contributions: null,
  analytics: null,
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

const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    clearGithubErrors: (state) => {
      state.error = null;
      state.connectError = null;
    },
    disconnectGithub: (state) => {
      state.connected = false;
      state.profile = null;
      state.repos = [];
      state.contributions = null;
      state.analytics = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGithubProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGithubProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.connected = action.payload.connected || false;
        state.profile = action.payload.profile || null;
        state.repos = action.payload.repos || [];
        state.contributions = action.payload.contributions || null;
        state.analytics = action.payload.analytics || null;
      })
      .addCase(fetchGithubProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = formatError(action.payload, 'Failed to fetch GitHub profile');
      });

    builder
      .addCase(syncGithubThunk.pending, (state) => {
        state.syncing = true;
        state.error = null;
      })
      .addCase(syncGithubThunk.fulfilled, (state, action) => {
        state.syncing = false;
        if (action.payload.connected) {
          state.connected = true;
          state.profile = action.payload.profile || state.profile;
          state.repos = action.payload.repos || state.repos;
          state.contributions = action.payload.contributions || state.contributions;
          state.analytics = action.payload.analytics || state.analytics;
        }
      })
      .addCase(syncGithubThunk.rejected, (state, action) => {
        state.syncing = false;
        state.error = formatError(action.payload, 'Failed to sync GitHub profile');
      });

    builder
      .addCase(connectGithubThunk.pending, (state) => {
        state.connecting = true;
        state.connectError = null;
      })
      .addCase(connectGithubThunk.fulfilled, (state, action) => {
        state.connecting = false;
        if (action.payload.connected) {
          state.connected = true;
          state.profile = action.payload.profile || state.profile;
          state.repos = action.payload.repos || state.repos;
          state.contributions = action.payload.contributions || state.contributions;
          state.analytics = action.payload.analytics || state.analytics;
        }
      })
      .addCase(connectGithubThunk.rejected, (state, action) => {
        state.connecting = false;
        state.connectError = formatError(action.payload, 'Failed to connect GitHub username');
      });
  },
});

export const { clearGithubErrors, disconnectGithub } = githubSlice.actions;
export default githubSlice.reducer;
