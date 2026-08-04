import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCommunicationsThunk,
  fetchCommunicationStatsThunk,
  fetchCommunicationThunk,
  createCommunicationThunk,
  updateCommunicationThunk,
  deleteCommunicationThunk,
  markCompletedThunk,
  markMissedThunk,
} from './communicationThunks';

const initialState = {
  communications: [],
  count: 0,
  stats: {
    upcomingMeetings: 0,
    completedThisWeek: 0,
    missedMeetings: 0,
    todayMeetingsCount: 0,
    totalHours: 0,
    followUpsPending: 0,
    avgRating: 5.0,
    interviewCount: 0,
    recruiterConversations: 0,
    networkingEvents: 0,
    weeklyPerformance: [],
  },
  currentCommunication: null,
  filters: {
    search: '',
    communicationType: 'All',
    status: 'All',
    priority: 'All',
    platform: 'All',
    timeframe: 'All',
    sortBy: 'scheduled_desc',
  },
  loading: false,
  saving: false,
  error: null,
};

const communicationSlice = createSlice({
  name: 'communication',
  initialState,
  reducers: {
    setCommunicationFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetCommunicationFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearCommunicationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Communications
    builder
      .addCase(fetchCommunicationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunicationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.communications = action.payload.communications || [];
        state.count = action.payload.count || 0;
      })
      .addCase(fetchCommunicationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load communications';
      });

    // Fetch Stats
    builder
      .addCase(fetchCommunicationStatsThunk.fulfilled, (state, action) => {
        state.stats = { ...state.stats, ...action.payload };
      });

    // Fetch Single Communication
    builder
      .addCase(fetchCommunicationThunk.fulfilled, (state, action) => {
        state.currentCommunication = action.payload;
      });

    // Create Communication
    builder
      .addCase(createCommunicationThunk.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createCommunicationThunk.fulfilled, (state, action) => {
        state.saving = false;
        if (action.payload) {
          state.communications.unshift(action.payload);
          state.count += 1;
        }
      })
      .addCase(createCommunicationThunk.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || 'Failed to create communication record';
      });

    // Update Communication
    builder
      .addCase(updateCommunicationThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.communications.findIndex(
            (c) => (c._id || c.id) === (action.payload._id || action.payload.id)
          );
          if (index !== -1) {
            state.communications[index] = action.payload;
          }
        }
      });

    // Delete Communication
    builder
      .addCase(deleteCommunicationThunk.fulfilled, (state, action) => {
        state.communications = state.communications.filter(
          (c) => (c._id || c.id) !== action.payload
        );
        state.count = Math.max(0, state.count - 1);
      });

    // Mark Completed
    builder
      .addCase(markCompletedThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.communications.findIndex(
            (c) => (c._id || c.id) === (action.payload._id || action.payload.id)
          );
          if (index !== -1) {
            state.communications[index] = action.payload;
          }
        }
      });

    // Mark Missed
    builder
      .addCase(markMissedThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.communications.findIndex(
            (c) => (c._id || c.id) === (action.payload._id || action.payload.id)
          );
          if (index !== -1) {
            state.communications[index] = action.payload;
          }
        }
      });
  },
});

export const {
  setCommunicationFilters,
  resetCommunicationFilters,
  clearCommunicationError,
} = communicationSlice.actions;

export default communicationSlice.reducer;
