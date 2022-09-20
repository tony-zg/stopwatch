import { createSlice } from '@reduxjs/toolkit';

interface TimerState {
  timer: boolean;
}

const initialState: TimerState = {
  timer: false
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    start: (state) => {
      state.timer = true;
    },
    stop: (state) => {
      state.timer = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const { start, stop } = timerSlice.actions;

export default timerSlice.reducer;
