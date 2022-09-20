import { createSlice } from '@reduxjs/toolkit';

interface SecondState {
  second: number;
}

const initialState: SecondState = {
  second: 0
};

const secondsSlice = createSlice({
  name: 'seconds',
  initialState,
  reducers: {
    addSecond: (state) => {
      state.second += 1;
    },
    resetSecond: (state) => {
      state.second = 0;
    }
  }
});

// Action creators are generated for each case reducer function
export const { addSecond, resetSecond } = secondsSlice.actions;

export default secondsSlice.reducer;
