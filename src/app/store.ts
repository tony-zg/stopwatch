import { configureStore } from '@reduxjs/toolkit';
import millisecondReducer from '../features/millisecondSlice';
import minuteReducer from '../features/minuteSlice';
import secondReducer from '../features/secondSlice';
import timerReducer from '../features/timerSlice';
import lapReducer from '../features/lapSlice';

export const store = configureStore({
  reducer: {
    milliseconds: millisecondReducer,
    minutes: minuteReducer,
    seconds: secondReducer,
    timer: timerReducer,
    laps: lapReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
