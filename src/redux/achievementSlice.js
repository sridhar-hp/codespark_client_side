import { createSlice } from '@reduxjs/toolkit';
import { fetchAchievementsThunk, checkAchievementsThunk } from './achievementThunks';

const initialState = {
  achievements: [],
  unlockedCount: 0,
  totalCount: 0,
  lockedCount: 0,
  completionRate: 0,
  latestUnlocked: null,
  nextGoal: null,
  loading: false,
  error: null,
};

const formatError = (payload, fallback) => {
  if (!payload) return fallback;
  if (typeof payload === 'string') return payload;
  if (typeof payload === 'object') return payload.message || fallback;
  return String(payload);
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  const data = action.payload || {};
  state.achievements = data.achievements || [];
  state.unlockedCount = data.unlockedCount || 0;
  state.totalCount = data.totalCount || 0;
  state.lockedCount = data.lockedCount || 0;
  state.completionRate = data.completionRate || 0;
  state.latestUnlocked = data.latestUnlocked || null;
  state.nextGoal = data.nextGoal || null;
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
      .addCase(fetchAchievementsThunk.fulfilled, handleFulfilled)
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
      .addCase(checkAchievementsThunk.fulfilled, handleFulfilled)
      .addCase(checkAchievementsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = formatError(action.payload, 'Failed to check achievements');
      });
  },
});

export const { clearAchievementError } = achievementSlice.actions;
export default achievementSlice.reducer;
