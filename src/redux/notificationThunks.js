import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchNotificationsThunk = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/notifications');
      const data = response.data?.data || {};
      return {
        notifications: data.notifications || [],
        unreadCount: data.unreadCount || 0,
      };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch notifications';
      return rejectWithValue(message);
    }
  }
);

export const markAsReadThunk = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.patch(`/notifications/${notificationId}/read`);
      return response.data?.data || notificationId;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to mark notification as read';
      return rejectWithValue(message);
    }
  }
);

export const markAllAsReadThunk = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.patch('/notifications/read-all');
      const data = response.data?.data || {};
      return {
        notifications: data.notifications || [],
        unreadCount: data.unreadCount || 0,
      };
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to mark all as read';
      return rejectWithValue(message);
    }
  }
);

export const deleteNotificationThunk = createAsyncThunk(
  'notifications/deleteNotification',
  async (notificationId, { rejectWithValue }) => {
    try {
      await api.delete(`/notifications/${notificationId}`);
      return notificationId;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to delete notification';
      return rejectWithValue(message);
    }
  }
);

export const deleteAllNotificationsThunk = createAsyncThunk(
  'notifications/deleteAllNotifications',
  async (_, { rejectWithValue }) => {
    try {
      await api.delete('/notifications');
      return true;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to delete all notifications';
      return rejectWithValue(message);
    }
  }
);
