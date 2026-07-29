import { createSlice } from '@reduxjs/toolkit';
import { fetchAchievementsThunk, checkAchievementsThunk } from './achievementThunks';

const initialState = {
  achievements: [],
  unlockedCount: 0,
  totalCount: 0,
  loading: false,
  error: null,
};

const formatError = (payload, fallback) => {
  if (!payload) return fallback;
  if (typeof payload === 'string') return payload;
  if (typeof payload === 'object') return payload.message || fallback;
  return String(payload);
};

const achievementSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    clearAchievementError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Achievements
    builder
      .addCase(fetchAchievementsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAchievementsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.achievements = action.payload.achievements || [];
        state.unlockedCount = action.payload.unlockedCount || 0;
        state.totalCount = action.payload.totalCount || 0;
      })
      .addCase(fetchAchievementsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = formatError(action.payload, 'Failed to fetch achievements');
      });

    // Check Achievements
    builder
      .addCase(checkAchievementsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAchievementsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.achievements = action.payload.achievements || [];
        state.unlockedCount = action.payload.unlockedCount || 0;
        state.totalCount = action.payload.totalCount || 0;
      })
      .addCase(checkAchievementsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = formatError(action.payload, 'Failed to check achievements');
      });
  },
});

export const { clearAchievementError } = achievementSlice.actions;
export default achievementSlice.reducer;
