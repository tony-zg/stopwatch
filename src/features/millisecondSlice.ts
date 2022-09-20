import { createSlice } from '@reduxjs/toolkit';

interface millisecondState {
  millisecond: number;
}

const initialState: millisecondState = {
  millisecond: 0
};

const millisecondsSlice = createSlice({
  name: 'milliseconds',
  initialState,
  reducers: {
    addMillisecond: (state) => {
      state.millisecond += 1;
    },
    resetMillisecond: (state) => {
      state.millisecond = 0;
    }
  }
});

// Action creators are generated for each case reducer function
export const { addMillisecond, resetMillisecond } = millisecondsSlice.actions;

export default millisecondsSlice.reducer;
