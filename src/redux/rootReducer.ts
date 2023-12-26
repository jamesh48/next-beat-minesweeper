import { Dimensions } from '../components/types';
import boardReducer from './boardReducer';
import timerReducer from './timerReducer';

export interface RootState {
  timer: {
    timerTime: number;
    timerState: boolean | 'FREEZE WIN' | 'FREEZE DEAD' | 'VICTORY';
  };
  board: {
    flagsRemaining: number;
    flippers: (string | boolean)[];
    numbers: {};
    mineArr: number[];
    surprised: boolean;
    dimensions: Dimensions;
    smileyState: 'smiley-guy' | 'dead-guy' | 'victory-guy' | 'surprised-guy';
  };
}

const rootReducer = {
  board: boardReducer,
  timer: timerReducer,
};

export default rootReducer;
