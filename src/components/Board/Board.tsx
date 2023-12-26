import { Box } from '@mui/material';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import {
  getDimensions,
  getFlippers,
  getMineArr,
  getNumbers,
} from '../../redux/boardReducer';
import { useSelector } from '../../redux/reduxHooks';
import { getTimerState } from '../../redux/timerReducer';
import Square from './Square';
import {
  useGenerateMinesEffect,
  generateNumberEffect,
  resetFlagsRemainingOnSkillChangeOrTimerOn,
  resetGameEffectOnSmileyOrSkill,
  resetOnSkillLevelChangeEffect,
  revealFlipperEffect,
} from './useEffectBoardHooks';

const Board = () => {
  const dispatch = useDispatch();

  const timerState = useSelector(getTimerState);
  const mineArr = useSelector(getMineArr);
  const dimensions = useSelector(getDimensions);
  const numbers = useSelector(getNumbers);
  const flippers = useSelector(getFlippers);

  useGenerateMinesEffect(dimensions, dispatch);
  generateNumberEffect(mineArr, dimensions, dispatch);
  revealFlipperEffect({ mineArr, flippers, numbers, boardDispatch: dispatch });
  resetGameEffectOnSmileyOrSkill(timerState, dimensions, dispatch);
  resetFlagsRemainingOnSkillChangeOrTimerOn(timerState, 'beginner', dispatch);
  resetOnSkillLevelChangeEffect('beginner', dispatch);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {[...new Array(dimensions.verticalDimension)].map((_, rowIndex) => {
        return (
          <Box
            key={rowIndex}
            sx={{
              display: 'flex',
              flex: 1,
              borderLeft: '2px solid darkslategray',
              borderRight: '2px solid darkslategray',
              width: '100%',
              height: '100%',
            }}
          >
            {[...new Array(dimensions.horizontalDimension)].map(
              (_, sqrIndex) => {
                const currTile =
                  rowIndex * dimensions.horizontalDimension + sqrIndex;

                return <Square key={sqrIndex} currTile={currTile} />;
              }
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default Board;
