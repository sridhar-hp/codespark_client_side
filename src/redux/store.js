import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskSlice';
import dailyProgressReducer from './dailyProgressSlice';
import xpReducer from './xpSlice';
import analyticsReducer from './analyticsSlice';
import achievementReducer from './achievementSlice';
import githubReducer from './githubSlice';
import leetcodeReducer from './leetcodeSlice';
import learningReducer from './learningSlice';
import notificationReducer from './notificationSlice';
import activityReducer from './activitySlice';
import settingsReducer from './settingsSlice';
import journalReducer from './journalSlice';
import communicationReducer from './communicationSlice';
import omegaReducer from './omegaSlice';

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
    learning: learningReducer,
    notifications: notificationReducer,
    activity: activityReducer,
    settings: settingsReducer,
    journal: journalReducer,
    communication: communicationReducer,
    omega: omegaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
