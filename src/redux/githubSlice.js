import { createSlice } from '@reduxjs/toolkit';
import { fetchGithubProfileThunk, connectGithubThunk } from './githubThunks';

const initialState = {
  connected: false,
  profile: null,
  repos: [],
  loading: false,
  connecting: false,
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
      })
      .addCase(fetchGithubProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = formatError(action.payload, 'Failed to fetch GitHub profile');
      });

    builder
      .addCase(connectGithubThunk.pending, (state) => {
        state.connecting = true;
        state.connectError = null;
      })
      .addCase(connectGithubThunk.fulfilled, (state) => {
        state.connecting = false;
      })
      .addCase(connectGithubThunk.rejected, (state, action) => {
        state.connecting = false;
        state.connectError = formatError(action.payload, 'Failed to connect GitHub username');
      });
  },
});

export const { clearGithubErrors, disconnectGithub } = githubSlice.actions;
export default githubSlice.reducer;
