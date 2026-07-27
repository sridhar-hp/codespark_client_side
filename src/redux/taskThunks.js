import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Fetch all tasks for the logged in user
export const fetchTasksThunk = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/tasks');
      // response.data -> { success: true, message, data: [tasks] }
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch tasks';
      return rejectWithValue(message);
    }
  }
);

// Create a new task
export const createTaskThunk = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await api.post('/tasks', taskData);
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to create task';
      return rejectWithValue(message);
    }
  }
);

// Update an existing task
export const updateTaskThunk = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, ...updates }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/tasks/${id}`, updates);
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to update task';
      return rejectWithValue(message);
    }
  }
);

// Toggle task completed state
export const toggleTaskThunk = createAsyncThunk(
  'tasks/toggleTask',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/tasks/${id}/toggle`);
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to toggle task';
      return rejectWithValue(message);
    }
  }
);

// Delete a task
export const deleteTaskThunk = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to delete task';
      return rejectWithValue(message);
    }
  }
);
