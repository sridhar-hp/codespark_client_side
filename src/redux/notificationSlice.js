import { createSlice } from '@reduxjs/toolkit';
import {
  fetchNotificationsThunk,
  markAsReadThunk,
  markAllAsReadThunk,
  deleteNotificationThunk,
  deleteAllNotificationsThunk,
} from './notificationThunks';

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotificationErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Notifications
    builder
      .addCase(fetchNotificationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications || [];
        state.unreadCount = action.payload.unreadCount || 0;
      })
      .addCase(fetchNotificationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load notifications';
      });

    // Mark single as read
    builder
      .addCase(markAsReadThunk.fulfilled, (state, action) => {
        const id = action.payload._id || action.payload.id || action.payload;
        const target = state.notifications.find((n) => n._id === id || n.id === id);
        if (target && (target.unread || !target.isRead || !target.read)) {
          target.isRead = true;
          target.read = true;
          target.unread = false;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      });

    // Mark all as read
    builder
      .addCase(markAllAsReadThunk.fulfilled, (state, action) => {
        state.notifications.forEach((n) => {
          n.isRead = true;
          n.read = true;
          n.unread = false;
        });
        state.unreadCount = 0;
      });

    // Delete single notification
    builder
      .addCase(deleteNotificationThunk.fulfilled, (state, action) => {
        const id = action.payload;
        const target = state.notifications.find((n) => n._id === id || n.id === id);
        if (target && (target.unread || !target.isRead || !target.read)) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications = state.notifications.filter((n) => n._id !== id && n.id !== id);
      });

    // Delete all notifications
    builder
      .addCase(deleteAllNotificationsThunk.fulfilled, (state) => {
        state.notifications = [];
        state.unreadCount = 0;
      });
  },
});

export const { clearNotificationErrors } = notificationSlice.actions;
export default notificationSlice.reducer;
