'use client';
import * as React from 'react';
import { Provider } from 'react-redux';
import Minesweeper from './src/components/Minesweeper';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './src/redux/rootReducer';
import './src/styles.scss';

const Home = () => {
  return (
    <Provider
      store={configureStore({
        reducer: rootReducer,
        preloadedState: {
          timer: {
            timerState: false,
            timerTime: 0,
          },
          board: {
            dimensions: {
              horizontalDimension: 9,
              verticalDimension: 9,
              skillLevel: 'beginner',
              numberOfMines: 10,
            },
            flippers: [],
            flagsRemaining: 10,
            mineArr: [],
            numbers: {},
            smileyState: 'smiley-guy',
            surprised: false,
          },
        },
      })}
    >
      <Minesweeper />
    </Provider>
  );
};

export default Home;
