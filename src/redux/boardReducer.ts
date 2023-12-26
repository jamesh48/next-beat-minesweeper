import { createSlice } from '@reduxjs/toolkit';
import { Dimensions } from '../components/types';
import {
  flipNormalTileUtil,
  flipRecursedTilesUtil,
  generateMinesUtil,
  generateNumbersUtil,
  setFlagFlippedUtil,
  revealDeadFlippersUtil,
  revealFlippersUtil,
} from './reducerUtils';
import { RootState } from './rootReducer';

type BoardRootState = RootState['board'];

const initialState: BoardRootState = {
  flagsRemaining: 10,
  flippers: [],
  numbers: [],
  mineArr: [],
  surprised: false,
  smileyState: 'smiley-guy',
  dimensions: {
    skillLevel: 'beginner',
    verticalDimension: 9,
    horizontalDimension: 9,
    numberOfMines: 10,
  },
};

const boardState = createSlice({
  name: 'board',
  initialState,
  reducers: {
    flipRecursedTiles: (
      state: BoardRootState,
      action: {
        payload: [number[], number];
      }
    ) => {
      state.flippers = flipRecursedTilesUtil(
        state.flippers.slice(),
        action.payload[0]
      );

      state.flagsRemaining = state.flagsRemaining + action.payload[1];
    },
    flipNormalTile: (
      state: BoardRootState,
      action: { payload: { flippedTile: number } }
    ) => {
      state.flippers = flipNormalTileUtil(
        state.flippers.slice(),
        action.payload.flippedTile
      );
    },
    generateNumbers: (
      state: BoardRootState,
      action: {
        payload: {
          mineArr: number[];
          verticalDimension: number;
          horizontalDimension: number;
        };
      }
    ) => {
      state.numbers = generateNumbersUtil(action.payload);
    },
    generateMines: (state: BoardRootState, action: { payload: Dimensions }) => {
      state.mineArr = generateMinesUtil(action.payload);
    },
    revealDeadFlippers: (state: BoardRootState) => {
      state.flippers = revealDeadFlippersUtil(state.flippers.slice());
    },
    revealFlippers: (
      state: BoardRootState,
      action: { payload: { mineArr: number[] } }
    ) => {
      state.flippers = revealFlippersUtil(
        state.flippers.slice(),
        action.payload.mineArr
      );
    },
    resetFlippers: (
      state: BoardRootState,
      action: { payload: (string | boolean)[] }
    ) => {
      state.flippers = action.payload;
    },

    setSmileyState: (
      state: BoardRootState,
      action: { payload: BoardRootState['smileyState'] }
    ) => {
      state.smileyState = action.payload;
    },
    setFlagFlipped: (
      state: BoardRootState,
      action: { payload: { flagFlipped: number } }
    ) => {
      state.flippers = setFlagFlippedUtil(
        state.flippers.slice(),
        action.payload.flagFlipped
      );
    },
    setFlagsRemaining: (state: BoardRootState, action: { payload: number }) => {
      state.flagsRemaining = action.payload;
    },
  },
});

export const {
  flipNormalTile,
  flipRecursedTiles,
  generateNumbers,
  resetFlippers,
  revealDeadFlippers,
  revealFlippers,
  setSmileyState,
  setFlagsRemaining,
  setFlagFlipped,
  generateMines,
} = boardState.actions;

export const getDimensions = (state: RootState) => state.board.dimensions;

export const getFlippers = (state: RootState) => state.board.flippers;

export const getNumbers = (state: RootState) => state.board.numbers;

export const getFlagsRemaining = (state: RootState) =>
  state.board.flagsRemaining;

export const getMineArr = (state: RootState) => state.board.mineArr;

export const getSmileyState = (state: RootState) => state.board.smileyState;

export default boardState.reducer;
