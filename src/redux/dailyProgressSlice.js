import { createSlice } from '@reduxjs/toolkit';
import { fetchTodayProgressThunk, recordDailyProgressThunk } from './dailyProgressThunks';

const initialState = {
  todayProgress: {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    completionPercentage: 0,
    lastUpdated: null,
    xpEarned: 0,
  },
  loading: false,
  error: null,
};

const formatError = (payload, fallback) => {
  if (!payload) return fallback;
  if (typeof payload === 'string') return payload;
  if (typeof payload === 'object') return payload.message || fallback;
  return String(payload);
};

const dailyProgressSlice = createSlice({
  name: 'dailyProgress',
  initialState,
  reducers: {
    updateLocalDailyProgress: (state, action) => {
      // action.payload: array of tasks or { totalTasks, completedTasks }
      const tasks = action.payload || [];
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(t => t.completed || t.status === 'Completed').length;
      const pendingTasks = totalTasks - completedTasks;
      const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      state.todayProgress = {
        ...state.todayProgress,
        totalTasks,
        completedTasks,
        pendingTasks,
        completionPercentage,
        lastUpdated: new Date().toISOString(),
      };
    },
    clearDailyProgressError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Today Progress
    builder
      .addCase(fetchTodayProgressThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodayProgressThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.todayProgress = {
            ...state.todayProgress,
            completedTasks: action.payload.tasksCompleted || state.todayProgress.completedTasks,
            xpEarned: action.payload.xpEarned || state.todayProgress.xpEarned,
            lastUpdated: action.payload.updatedAt || new Date().toISOString(),
          };
        }
      })
      .addCase(fetchTodayProgressThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = formatError(action.payload, 'Failed to fetch today progress');
      });

    // Record Daily Progress
    builder
      .addCase(recordDailyProgressThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recordDailyProgressThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.todayProgress = {
            ...state.todayProgress,
            completedTasks: action.payload.tasksCompleted,
            xpEarned: action.payload.xpEarned,
            lastUpdated: action.payload.updatedAt || new Date().toISOString(),
          };
        }
      })
      .addCase(recordDailyProgressThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = formatError(action.payload, 'Failed to record daily progress');
      });
  },
});

export const { updateLocalDailyProgress, clearDailyProgressError } = dailyProgressSlice.actions;
export default dailyProgressSlice.reducer;
