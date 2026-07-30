import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskSlice';
import dailyProgressReducer from './dailyProgressSlice';
import xpReducer from './xpSlice';
import analyticsReducer from './analyticsSlice';
import achievementReducer from './achievementSlice';
import githubReducer from './githubSlice';
import leetcodeReducer from './leetcodeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    dailyProgress: dailyProgressReducer,
    xp: xpReducer,
    analytics: analyticsReducer,
    achievements: achievementReducer,
    github: githubReducer,
    leetcode: leetcodeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
