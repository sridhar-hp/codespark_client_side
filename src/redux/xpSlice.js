import { createSlice } from '@reduxjs/toolkit';
import { fetchUserXPThunk } from './xpThunks';

const initialState = {
  totalXP: 0,
  level: 1,
  loading: false,
  error: null,
};

const formatError = (payload, fallback) => {
  if (!payload) return fallback;
  if (typeof payload === 'string') return payload;
  if (typeof payload === 'object') return payload.message || fallback;
  return String(payload);
};

const xpSlice = createSlice({
  name: 'xp',
  initialState,
  reducers: {
    updateXPAmount: (state, action) => {
      // action.payload: number (positive or negative XP delta)
      const delta = Number(action.payload) || 0;
      state.totalXP = Math.max(0, state.totalXP + delta);
    },
    setTotalXP: (state, action) => {
      state.totalXP = Number(action.payload) || 0;
    },
    clearXPError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserXPThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserXPThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.totalXP = action.payload.totalXP;
        state.level = action.payload.level;
      })
      .addCase(fetchUserXPThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = formatError(action.payload, 'Failed to fetch user XP');
      });
  },
});

export const { updateXPAmount, setTotalXP, clearXPError } = xpSlice.actions;
export default xpSlice.reducer;
