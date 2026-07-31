import { createSlice } from '@reduxjs/toolkit';
import {
  fetchLearningResourcesThunk,
  createLearningResourceThunk,
  updateLearningResourceThunk,
  deleteLearningResourceThunk,
  fetchStudySessionsThunk,
  createStudySessionThunk,
  updateStudySessionThunk,
  deleteStudySessionThunk,
  fetchLearningAnalyticsThunk,
  fetchLearningHeatmapThunk,
  fetchLearningGoalsThunk,
  createLearningGoalThunk,
  updateLearningGoalThunk,
  deleteLearningGoalThunk,
} from './learningThunks';

const initialState = {
  resources: [],
  sessions: [],
  analytics: null,
  heatmap: [],
  goals: [],
  loading: false,
  submitting: false,
  error: null,
  successMessage: null,
};

const formatError = (payload, fallback) => {
  if (!payload) return fallback;
  if (typeof payload === 'string') return payload;
  if (typeof payload === 'object') return payload.message || fallback;
  return String(payload);
};

const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    clearLearningErrors: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Resources
    builder
      .addCase(fetchLearningResourcesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLearningResourcesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.resources = action.payload || [];
      })
      .addCase(fetchLearningResourcesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = formatError(action.payload, 'Failed to fetch learning resources');
      });

    builder
      .addCase(createLearningResourceThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createLearningResourceThunk.fulfilled, (state, action) => {
        state.submitting = false;
        state.resources.unshift(action.payload);
        state.successMessage = 'Resource added successfully!';
      })
      .addCase(createLearningResourceThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = formatError(action.payload, 'Failed to create resource');
      });

    builder
      .addCase(updateLearningResourceThunk.fulfilled, (state, action) => {
        const index = state.resources.findIndex((r) => r._id === action.payload._id || r.id === action.payload.id);
        if (index !== -1) {
          state.resources[index] = action.payload;
        }
        state.successMessage = 'Resource updated successfully!';
      });

    builder
      .addCase(deleteLearningResourceThunk.fulfilled, (state, action) => {
        state.resources = state.resources.filter((r) => r._id !== action.payload && r.id !== action.payload);
        state.successMessage = 'Resource deleted successfully!';
      });

    // Sessions
    builder
      .addCase(fetchStudySessionsThunk.fulfilled, (state, action) => {
        state.sessions = action.payload || [];
      })
      .addCase(createStudySessionThunk.fulfilled, (state, action) => {
        state.sessions.unshift(action.payload);
        state.successMessage = 'Study session logged!';
      });

    builder
      .addCase(deleteStudySessionThunk.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter((s) => s._id !== action.payload && s.id !== action.payload);
      });

    // Analytics & Heatmap
    builder
      .addCase(fetchLearningAnalyticsThunk.fulfilled, (state, action) => {
        state.analytics = action.payload || null;
      })
      .addCase(fetchLearningHeatmapThunk.fulfilled, (state, action) => {
        state.heatmap = action.payload || [];
      });

    // Goals
    builder
      .addCase(fetchLearningGoalsThunk.fulfilled, (state, action) => {
        state.goals = action.payload || [];
      })
      .addCase(createLearningGoalThunk.fulfilled, (state, action) => {
        state.goals.unshift(action.payload);
        state.successMessage = 'Learning goal set!';
      })
      .addCase(updateLearningGoalThunk.fulfilled, (state, action) => {
        const index = state.goals.findIndex((g) => g._id === action.payload._id || g.id === action.payload.id);
        if (index !== -1) {
          state.goals[index] = action.payload;
        }
      })
      .addCase(deleteLearningGoalThunk.fulfilled, (state, action) => {
        state.goals = state.goals.filter((g) => g._id !== action.payload && g.id !== action.payload);
      });
  },
});

export const { clearLearningErrors } = learningSlice.actions;
export default learningSlice.reducer;
