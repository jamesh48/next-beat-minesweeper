import React from 'react';
import { Box } from '@mui/material';
import MillisecondTimer from '../MillisecondTimer/MillisecondTimer';
import SmileyBar from '../SmileyBar/SmileyBar';
import Board from '../Board/Board';
import SkillLevelSelector from '../SkillLevelSelector';

const Minesweeper = () => {
  return (
    <Box
      className="space-containers"
      id="main-space-container"
      sx={{
        width: '100%',
        display: 'flex',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        id="total-board"
        sx={{ display: 'flex', flexDirection: 'column', height: '60%' }}
      >
        <SmileyBar />
        <Board />
      </Box>
      <SkillLevelSelector />
      <MillisecondTimer />
    </Box>
  );
};

export default Minesweeper;
