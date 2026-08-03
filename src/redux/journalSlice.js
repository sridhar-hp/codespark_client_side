import { createSlice } from '@reduxjs/toolkit';
import {
  fetchJournalsThunk,
  fetchJournalStatsThunk,
  fetchJournalThunk,
  createJournalThunk,
  updateJournalThunk,
  deleteJournalThunk,
  toggleFavoriteThunk,
  togglePinThunk,
} from './journalThunks';

const initialState = {
  journals: [],
  count: 0,
  stats: {
    totalJournals: 0,
    favoriteJournals: 0,
    pinnedJournals: 0,
    mostUsedMood: 'Productive',
    writingStreak: 0,
    avgEntriesPerWeek: 0,
    latestEntry: null,
  },
  currentJournal: null,
  filters: {
    search: '',
    mood: 'All',
    tag: '',
    isFavorite: false,
    isPinned: false,
    sortBy: 'newest',
  },
  loading: false,
  saving: false,
  error: null,
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setJournalFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetJournalFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearJournalError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Journals
    builder
      .addCase(fetchJournalsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJournalsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.journals = action.payload.journals || [];
        state.count = action.payload.count || 0;
      })
      .addCase(fetchJournalsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load journals';
      });

    // Fetch Stats
    builder
      .addCase(fetchJournalStatsThunk.fulfilled, (state, action) => {
        state.stats = { ...state.stats, ...action.payload };
      });

    // Fetch Single Journal
    builder
      .addCase(fetchJournalThunk.fulfilled, (state, action) => {
        state.currentJournal = action.payload;
      });

    // Create Journal
    builder
      .addCase(createJournalThunk.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createJournalThunk.fulfilled, (state, action) => {
        state.saving = false;
        if (action.payload) {
          state.journals.unshift(action.payload);
          state.count += 1;
        }
      })
      .addCase(createJournalThunk.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || 'Failed to create journal';
      });

    // Update Journal
    builder
      .addCase(updateJournalThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.journals.findIndex((j) => (j._id || j.id) === (action.payload._id || action.payload.id));
          if (index !== -1) {
            state.journals[index] = action.payload;
          }
        }
      });

    // Delete Journal
    builder
      .addCase(deleteJournalThunk.fulfilled, (state, action) => {
        state.journals = state.journals.filter((j) => (j._id || j.id) !== action.payload);
        state.count = Math.max(0, state.count - 1);
      });

    // Toggle Favorite
    builder
      .addCase(toggleFavoriteThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.journals.findIndex((j) => (j._id || j.id) === (action.payload._id || action.payload.id));
          if (index !== -1) {
            state.journals[index] = action.payload;
          }
        }
      });

    // Toggle Pin
    builder
      .addCase(togglePinThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.journals.findIndex((j) => (j._id || j.id) === (action.payload._id || action.payload.id));
          if (index !== -1) {
            state.journals[index] = action.payload;
          }
        }
      });
  },
});

export const { setJournalFilters, resetJournalFilters, clearJournalError } = journalSlice.actions;
export default journalSlice.reducer;
