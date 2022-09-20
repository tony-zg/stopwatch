import { createSlice } from '@reduxjs/toolkit';

interface MinuteState {
  minute: number;
}

const initialState: MinuteState = {
  minute: 0
};

const minutesSlice = createSlice({
  name: 'minutes',
  initialState,
  reducers: {
    addMinute: (state) => {
      state.minute += 1;
    },
    resetMinute: (state) => {
      state.minute = 0;
    }
  }
});

// Action creators are generated for each case reducer function
export const { addMinute, resetMinute } = minutesSlice.actions;

export default minutesSlice.reducer;
