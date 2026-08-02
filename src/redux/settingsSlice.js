import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSettingsThunk,
  updateSettingsThunk,
  updateProfileThunk,
  changePasswordThunk,
  updatePreferencesThunk,
  updateThemeThunk,
  updatePrivacyThunk,
} from './settingsThunks';

const initialState = {
  profile: null,
  settings: null,
  githubSettings: null,
  loading: false,
  saving: false,
  error: null,
  successMessage: null,
};

const handleFulfilledSettings = (state, action) => {
  state.loading = false;
  state.saving = false;
  const data = action.payload || {};
  state.profile = data.user || state.profile;
  state.settings = data.settings || state.settings;
  state.githubSettings = data.githubSettings || state.githubSettings;
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    clearSettingsStatus: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Settings
    builder
      .addCase(fetchSettingsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettingsThunk.fulfilled, handleFulfilledSettings)
      .addCase(fetchSettingsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load settings';
      });

    // Update Profile
    builder
      .addCase(updateProfileThunk.pending, (state) => {
        state.saving = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        handleFulfilledSettings(state, action);
        state.successMessage = 'Profile updated successfully!';
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || 'Failed to update profile';
      });

    // Change Password
    builder
      .addCase(changePasswordThunk.pending, (state) => {
        state.saving = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state, action) => {
        state.saving = false;
        state.successMessage = action.payload || 'Password changed successfully!';
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || 'Failed to change password';
      });

    // Update Preferences
    builder
      .addCase(updatePreferencesThunk.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updatePreferencesThunk.fulfilled, (state, action) => {
        handleFulfilledSettings(state, action);
        state.successMessage = 'Notification preferences saved!';
      })
      .addCase(updatePreferencesThunk.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || 'Failed to update preferences';
      });

    // Update Theme
    builder
      .addCase(updateThemeThunk.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateThemeThunk.fulfilled, (state, action) => {
        handleFulfilledSettings(state, action);
        state.successMessage = 'Theme updated successfully!';
      })
      .addCase(updateThemeThunk.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || 'Failed to update theme';
      });

    // Update Privacy
    builder
      .addCase(updatePrivacyThunk.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updatePrivacyThunk.fulfilled, (state, action) => {
        handleFulfilledSettings(state, action);
        state.successMessage = 'Privacy settings updated!';
      })
      .addCase(updatePrivacyThunk.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || 'Failed to update privacy settings';
      });

    // General Update
    builder
      .addCase(updateSettingsThunk.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateSettingsThunk.fulfilled, (state, action) => {
        handleFulfilledSettings(state, action);
        state.successMessage = 'Settings saved!';
      })
      .addCase(updateSettingsThunk.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || 'Failed to update settings';
      });
  },
});

export const { clearSettingsStatus } = settingsSlice.actions;
export default settingsSlice.reducer;
