import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getTimerState,
  getTimerTime,
  setTimerState,
  setTimerTime,
} from '../../redux/timerReducer';
import { useSelector } from '../../redux/reduxHooks';
import { useInterval } from '../customHooks';
import { setFlagsRemaining } from '../../redux/boardReducer';

export const calculateTime = (timerTime: number) => {
  const centiseconds = ('0' + (Math.floor(timerTime / 10) % 100)).slice(-2);
  const seconds = ('0' + (Math.floor(timerTime / 1000) % 60)).slice(-2);
  const minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2);
  const hours = ('0' + Math.floor(timerTime / 3600000)).slice(-2);

  return hours !== '00'
    ? `${hours} : ${minutes} : ${seconds} : ${centiseconds}`
    : minutes !== '00'
    ? `${minutes} : ${seconds} : ${centiseconds}`
    : `${seconds} : ${centiseconds}`;
};
const MillisecondTimer = () => {
  const dispatch = useDispatch();
  const timerTime = useSelector(getTimerTime);
  const timerState = useSelector(getTimerState);

  useInterval(
    () => {
      dispatch(setTimerTime(10));
    },
    timerState === true
      ? 10
      : timerState === 'FREEZE WIN' ||
        timerState === 'FREEZE DEAD' ||
        timerState === 'VICTORY'
      ? -1
      : null
  );

  useEffect(() => {
    if (timerState === false) {
      dispatch(setTimerTime(0));
    }

    if (timerState === 'VICTORY') {
      dispatch(setTimerState('FREEZE WIN'));
      dispatch(setFlagsRemaining(0));
    }
  }, [timerState]);

  const time = calculateTime(timerTime);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '50%',
        justifyContent: 'center',
        padding: '1.5rem 0',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: 'ivory',
          display: 'flex',
          justifyContent: 'center',
          borderTop: '1px solid ivory',
          padding: '.5% 0',
          width: '40%',
        }}
      >
        {time}
      </Typography>
    </Box>
  );
};

export default MillisecondTimer;
