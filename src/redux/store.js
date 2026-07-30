import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskSlice';
import dailyProgressReducer from './dailyProgressSlice';
import xpReducer from './xpSlice';
import analyticsReducer from './analyticsSlice';
import achievementReducer from './achievementSlice';
import githubReducer from './githubSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    dailyProgress: dailyProgressReducer,
    xp: xpReducer,
    analytics: analyticsReducer,
    achievements: achievementReducer,
    github: githubReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
