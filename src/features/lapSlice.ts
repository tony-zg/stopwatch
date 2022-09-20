import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddLapPayload {
  id: number;
  minute: number;
  second: number;
  millisecond: number;
}

interface LapState {
  lap: AddLapPayload[];
}

const initialState: LapState = {
  lap: []
};

const lapsSlice = createSlice({
  name: 'laps',
  initialState,
  reducers: {
    addLap: (state, action: PayloadAction<AddLapPayload>) => {
      state.lap.push(action.payload);
    },
    deleteLap: (state, action: PayloadAction<number>) => {
      state.lap = state.lap.filter((lap) => lap.id !== action.payload);
    }
  }
});

// Action creators are generated for each case reducer function
export const { addLap, deleteLap } = lapsSlice.actions;

export default lapsSlice.reducer;
