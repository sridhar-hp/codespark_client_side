import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import { fetchUserXPThunk } from './xpThunks';
import { fetchNotificationsThunk } from './notificationThunks';
import { fetchRecentActivitiesThunk } from './activityThunks';

export const fetchJournalsThunk = createAsyncThunk(
  'journal/fetchJournals',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.append('search', params.search);
      if (params.mood && params.mood !== 'All') queryParams.append('mood', params.mood);
      if (params.tag) queryParams.append('tag', params.tag);
      if (params.isFavorite) queryParams.append('isFavorite', 'true');
      if (params.isPinned) queryParams.append('isPinned', 'true');
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);

      const url = `/journal${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await api.get(url);
      const data = response.data?.data || {};
      return {
        journals: data.journals || [],
        count: data.count || 0,
      };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch journals';
      return rejectWithValue(message);
    }
  }
);

export const fetchJournalStatsThunk = createAsyncThunk(
  'journal/fetchJournalStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/journal/stats');
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch journal stats';
      return rejectWithValue(message);
    }
  }
);

export const fetchJournalThunk = createAsyncThunk(
  'journal/fetchJournal',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/journal/${id}`);
      return response.data?.data || null;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch journal entry';
      return rejectWithValue(message);
    }
  }
);

export const createJournalThunk = createAsyncThunk(
  'journal/createJournal',
  async (journalData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/journal', journalData);
      const newJournal = response.data?.data;

      // Auto refresh side stats & feeds
      dispatch(fetchJournalStatsThunk());
      dispatch(fetchUserXPThunk());
      dispatch(fetchNotificationsThunk());
      dispatch(fetchRecentActivitiesThunk(5));

      return newJournal;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to create journal entry';
      return rejectWithValue(message);
    }
  }
);

export const updateJournalThunk = createAsyncThunk(
  'journal/updateJournal',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/journal/${id}`, data);
      const updatedJournal = response.data?.data;

      dispatch(fetchRecentActivitiesThunk(5));
      return updatedJournal;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to update journal entry';
      return rejectWithValue(message);
    }
  }
);

export const deleteJournalThunk = createAsyncThunk(
  'journal/deleteJournal',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/journal/${id}`);
      dispatch(fetchJournalStatsThunk());
      dispatch(fetchRecentActivitiesThunk(5));
      return id;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to delete journal entry';
      return rejectWithValue(message);
    }
  }
);

export const toggleFavoriteThunk = createAsyncThunk(
  'journal/toggleFavorite',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.patch(`/journal/${id}/favorite`);
      const updatedJournal = response.data?.data;
      dispatch(fetchJournalStatsThunk());
      return updatedJournal;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to toggle favorite status';
      return rejectWithValue(message);
    }
  }
);

export const togglePinThunk = createAsyncThunk(
  'journal/togglePin',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.patch(`/journal/${id}/pin`);
      const updatedJournal = response.data?.data;
      dispatch(fetchJournalStatsThunk());
      return updatedJournal;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to toggle pin status';
      return rejectWithValue(message);
    }
  }
);
