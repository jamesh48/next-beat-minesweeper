import * as React from 'react';
import { Box } from '@mui/material';
import SmileyBar from './SmileyBar/SmileyBar';
import Board from './Board/Board';
import MillisecondTimer from './MillisecondTimer/MillisecondTimer';

const Minesweeper = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgb(31, 33, 36)',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:nth:child(1)': {
          flexDirection: 'column',
          alignItems: 'center',
        },
        '&:last-child': {
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
      >
        <SmileyBar />
        <Board />
      </Box>
      <MillisecondTimer />
    </Box>
  );
};

export default Minesweeper;
