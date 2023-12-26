import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Box, Popover, Typography, Button } from '@mui/material';
import { useSelector } from '../../redux/reduxHooks';
import {
  getDimensions,
  getFlagsRemaining,
  getSmileyState,
  setSmileyState,
  setFlagsRemaining,
} from '../../redux/boardReducer';
import { useDispatch } from 'react-redux';
import {
  getTimerState,
  getTimerTime,
  setTimerState,
} from '../../redux/timerReducer';
import { calculateTime } from '../MillisecondTimer/MillisecondTimer';
import { useIsSsr } from '../customHooks';

const SmileyBar = () => {
  const dispatch = useDispatch();

  const timerState = useSelector(getTimerState);
  const timerTime = useSelector(getTimerTime);
  const flagsRemaining = useSelector(getFlagsRemaining);
  const smileyState = useSelector(getSmileyState);
  const dimensions = useSelector(getDimensions);

  const [anchor, setAnchor] = useState<null | HTMLDivElement>(null);
  const isSsr = useIsSsr();
  const smileyVictoryRef = useRef(isSsr ? null : document.createElement('div'));
  const victoryState = timerState === 'VICTORY' || timerState === 'FREEZE WIN';

  useEffect(() => {
    if (victoryState) {
      setAnchor(smileyVictoryRef.current);
    }
  }, [victoryState]);

  const smileyStyles = (() => {
    if (smileyState === 'surprised-guy') {
      return {
        backgroundImage:
          'url(https://static.fullstackhrivnak.com/mines/mine-images/surprise-face.jpg)',
      };
    }
    if (victoryState) {
      return {
        backgroundImage:
          'url(https://static.fullstackhrivnak.com/mines/mine-images/victory-face.jpg)',
      };
    }
    if (smileyState === 'dead-guy') {
      return {
        backgroundImage:
          'url(https://static.fullstackhrivnak.com/mines/mine-images/dead-face.jpg)',
      };
    }

    return {
      backgroundImage:
        'url(https://static.fullstackhrivnak.com/mines/mine-images/smiley-face.jpg)',
    };
  })();

  const handleResetBoard = () => {
    dispatch(setSmileyState('smiley-guy'));
    dispatch(setFlagsRemaining(dimensions.numberOfMines));
    dispatch(setTimerState(false));
  };

  return (
    <>
      <Box
        ref={smileyVictoryRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'darkslategray',
          border: '2px solid black',
          height: '2.5rem',
          verticalAlign: 'auto',
          justifyContent: 'center',
          color: 'ivory',
          textAlign: 'center',
        }}
      >
        <Box
          className="smiley-guy"
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: '2rem',
            backgroundPosition: 'center',
            display: 'inline-block',
            height: '2.25rem',
            width: '2.25rem',
            padding: '.15rem .75rem .15rem .75rem',
            ...smileyStyles,
          }}
          onClick={handleResetBoard}
        ></Box>
        <Box id="flags-remaining" sx={{ pl: '1.25rem', position: 'relative' }}>
          {flagsRemaining}
        </Box>
      </Box>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box
          sx={{
            height: '12.5rem',
            width: '37.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid black',
            borderBottom: 'none',
          }}
        >
          <Typography>Congratulations!!!</Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography>You cleared the board in</Typography>
            <Typography sx={{ textDecoration: 'underline', pl: '.3rem' }}>
              {calculateTime(timerTime)}
            </Typography>
          </Box>
          <Typography>- UV Team</Typography>
          <Button
            variant="contained"
            onClick={() => setAnchor(null)}
            sx={{ mt: '1rem' }}
          >
            Close
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default SmileyBar;
