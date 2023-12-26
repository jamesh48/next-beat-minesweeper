import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

const initialState: RootState['timer'] = {
  timerTime: 0,
  timerState: false,
};

const timerState = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimerState: (
      state: RootState['timer'],
      action: { payload: boolean | 'FREEZE WIN' | 'FREEZE DEAD' | 'VICTORY' }
    ) => {
      state.timerState = action.payload;
    },
    setTimerTime: (state: RootState['timer'], action: { payload: number }) => {
      if (action.payload === 0) {
        state.timerTime = 0;
      } else {
        state.timerTime += action.payload;
      }
    },
  },
});

export const { setTimerState, setTimerTime } = timerState.actions;

export const getTimerState = (state: RootState) => state.timer.timerState;
export const getTimerTime = (state: RootState) => state.timer.timerTime;

export default timerState.reducer;
