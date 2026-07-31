import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

const FRIENDLY_URL_ERROR = 'Please enter a valid website URL (for example: https://youtube.com or https://coursera.org).';

const VALID_CATEGORIES = [
  'MERN',
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'AI',
  'TypeScript',
  'DSA',
  'English',
  'DevOps',
  'Other',
];

const CATEGORY_MAP = {
  Frontend: 'React',
  Backend: 'Node.js',
  'System Design': 'MERN',
  DevOps: 'DevOps',
  'Soft Skills': 'Other',
};

// Learning Resources Thunks
export const fetchLearningResourcesThunk = createAsyncThunk(
  'learning/fetchResources',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/learning');
      return response.data?.data || [];
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch learning resources';
      return rejectWithValue(message);
    }
  }
);

export const createLearningResourceThunk = createAsyncThunk(
  'learning/createResource',
  async (resourceData, { rejectWithValue, dispatch }) => {
    try {
      const rawCategory = resourceData.category || 'Other';
      const mappedCategory = VALID_CATEGORIES.includes(rawCategory)
        ? rawCategory
        : (CATEGORY_MAP[rawCategory] || 'Other');

      const payload = {
        title: resourceData.title || resourceData.technologyName || resourceData.name || '',
        category: mappedCategory,
        platform: resourceData.platform || 'Other',
        totalHours: Number(resourceData.totalHours ?? resourceData.targetHours ?? 0),
      };

      const rawUrl = resourceData.resourceUrl || resourceData.url || resourceData.primaryResource || '';
      if (rawUrl && rawUrl.trim()) {
        payload.resourceUrl = rawUrl.trim();
        // Frontend URL format check
        try {
          const parsed = new URL(payload.resourceUrl);
          if (!['http:', 'https:'].includes(parsed.protocol)) {
            return rejectWithValue(FRIENDLY_URL_ERROR);
          }
        } catch (e) {
          return rejectWithValue(FRIENDLY_URL_ERROR);
        }
      }

      const response = await api.post('/learning', payload);
      dispatch(fetchLearningAnalyticsThunk());
      return response.data?.data || {};
    } catch (err) {
      let message = err.response?.data?.message || err.message || 'Failed to create learning resource';
      const details = err.response?.data?.details;

      if (
        message.toLowerCase().includes('resource url must be a valid url') ||
        (details && details.some((d) => d.msg?.toLowerCase().includes('url')))
      ) {
        message = FRIENDLY_URL_ERROR;
      }

      return rejectWithValue(message);
    }
  }
);

export const updateLearningResourceThunk = createAsyncThunk(
  'learning/updateResource',
  async ({ id, ...updateData }, { rejectWithValue, dispatch }) => {
    try {
      if (updateData.resourceUrl && updateData.resourceUrl.trim()) {
        try {
          const parsed = new URL(updateData.resourceUrl.trim());
          if (!['http:', 'https:'].includes(parsed.protocol)) {
            return rejectWithValue(FRIENDLY_URL_ERROR);
          }
        } catch (e) {
          return rejectWithValue(FRIENDLY_URL_ERROR);
        }
      }

      const response = await api.put(`/learning/${id}`, updateData);
      dispatch(fetchLearningAnalyticsThunk());
      return response.data?.data || {};
    } catch (err) {
      let message = err.response?.data?.message || err.message || 'Failed to update learning resource';
      const details = err.response?.data?.details;

      if (
        message.toLowerCase().includes('resource url must be a valid url') ||
        (details && details.some((d) => d.msg?.toLowerCase().includes('url')))
      ) {
        message = FRIENDLY_URL_ERROR;
      }

      return rejectWithValue(message);
    }
  }
);

export const deleteLearningResourceThunk = createAsyncThunk(
  'learning/deleteResource',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await api.delete(`/learning/${id}`);
      dispatch(fetchLearningAnalyticsThunk());
      return id;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to delete learning resource';
      return rejectWithValue(message);
    }
  }
);

// Study Sessions Thunks
export const fetchStudySessionsThunk = createAsyncThunk(
  'learning/fetchSessions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/study-session');
      return response.data?.data || [];
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch study sessions';
      return rejectWithValue(message);
    }
  }
);

export const createStudySessionThunk = createAsyncThunk(
  'learning/createSession',
  async (sessionData, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/study-session', sessionData);
      dispatch(fetchLearningResourcesThunk());
      dispatch(fetchLearningAnalyticsThunk());
      dispatch(fetchLearningHeatmapThunk());
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to log study session';
      return rejectWithValue(message);
    }
  }
);

export const updateStudySessionThunk = createAsyncThunk(
  'learning/updateSession',
  async ({ id, ...updateData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.put(`/study-session/${id}`, updateData);
      dispatch(fetchLearningResourcesThunk());
      dispatch(fetchLearningAnalyticsThunk());
      dispatch(fetchLearningHeatmapThunk());
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to update study session';
      return rejectWithValue(message);
    }
  }
);

export const deleteStudySessionThunk = createAsyncThunk(
  'learning/deleteSession',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await api.delete(`/study-session/${id}`);
      dispatch(fetchLearningResourcesThunk());
      dispatch(fetchLearningAnalyticsThunk());
      dispatch(fetchLearningHeatmapThunk());
      return id;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to delete study session';
      return rejectWithValue(message);
    }
  }
);

// Learning Analytics & Heatmap Thunks
export const fetchLearningAnalyticsThunk = createAsyncThunk(
  'learning/fetchAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/learning/analytics');
      return response.data?.data || null;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch learning analytics';
      return rejectWithValue(message);
    }
  }
);

export const fetchLearningHeatmapThunk = createAsyncThunk(
  'learning/fetchHeatmap',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/learning/heatmap');
      return response.data?.data || [];
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch learning heatmap';
      return rejectWithValue(message);
    }
  }
);

// Learning Goals Thunks
export const fetchLearningGoalsThunk = createAsyncThunk(
  'learning/fetchGoals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/learning/goals');
      return response.data?.data || [];
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch learning goals';
      return rejectWithValue(message);
    }
  }
);

export const createLearningGoalThunk = createAsyncThunk(
  'learning/createGoal',
  async (goalData, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/learning/goals', goalData);
      dispatch(fetchLearningAnalyticsThunk());
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to create learning goal';
      return rejectWithValue(message);
    }
  }
);

export const updateLearningGoalThunk = createAsyncThunk(
  'learning/updateGoal',
  async ({ id, ...updateData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.put(`/learning/goals/${id}`, updateData);
      dispatch(fetchLearningAnalyticsThunk());
      return response.data?.data || {};
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to update learning goal';
      return rejectWithValue(message);
    }
  }
);

export const deleteLearningGoalThunk = createAsyncThunk(
  'learning/deleteGoal',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await api.delete(`/learning/goals/${id}`);
      dispatch(fetchLearningAnalyticsThunk());
      return id;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to delete learning goal';
      return rejectWithValue(message);
    }
  }
);
