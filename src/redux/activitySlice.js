import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTimelineThunk,
  fetchRecentActivitiesThunk,
  clearActivityThunk,
} from './activityThunks';

const initialState = {
  activities: [],
  recent: [],
  count: 0,
  loading: false,
  error: null,
};

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    clearActivityErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Timeline
    builder
      .addCase(fetchTimelineThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimelineThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload.activities || [];
        state.count = action.payload.count || 0;
      })
      .addCase(fetchTimelineThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load timeline';
      });

    // Fetch Recent Activities
    builder
      .addCase(fetchRecentActivitiesThunk.fulfilled, (state, action) => {
        state.recent = action.payload || [];
      });

    // Clear Activity Timeline
    builder
      .addCase(clearActivityThunk.fulfilled, (state) => {
        state.activities = [];
        state.recent = [];
        state.count = 0;
      });
  },
});

export const { clearActivityErrors } = activitySlice.actions;
export default activitySlice.reducer;
