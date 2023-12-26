import * as React from 'react';
import { Box } from '@mui/material';
import {
  getDimensions,
  getFlagsRemaining,
  getFlippers,
  getMineArr,
  getNumbers,
  setSmileyState,
  setFlagsRemaining,
} from '../../redux/boardReducer';
import { useSelector } from '../../redux/reduxHooks';
import {
  sweepSquare,
  mineSquare,
  darkSquare,
  flagSquare,
  greenNum,
  blueNum,
  redNum,
  purpleNum,
  maroonNum,
  turquoiseNum,
  blackNum,
  greyNum,
  disabledSquare,
} from './square.mui';
import { useDispatch } from 'react-redux';
import { handleClick } from './squareUtils';
import { getTimerState, setTimerState } from '../../redux/timerReducer';

interface SquareProps {
  currTile: number;
}
const Square = (props: SquareProps) => {
  const dispatch = useDispatch();
  const mineArr = useSelector(getMineArr);
  const dimensions = useSelector(getDimensions);
  const flippers = useSelector(getFlippers);
  const numbers = useSelector(getNumbers);
  const flagsRemaining = useSelector(getFlagsRemaining);
  const timerState = useSelector(getTimerState);

  const tileIsAMine =
    mineArr.includes(props.currTile) &&
    flippers[props.currTile] &&
    flippers[props.currTile] !== 'flag';

  const tileIsANumber =
    flippers[props.currTile] &&
    flippers[props.currTile] !== 'flag' &&
    numbers[props.currTile];

  const genMineStyles = (args: {
    flippers: (string | boolean)[];
    currTile: number;
    timerState: string | boolean;
  }) => {
    let styleObj = sweepSquare;

    const flagOnMineTileAfterVictory =
      (args.timerState === 'VICTORY' || args.timerState === 'FREEZE WIN') &&
      args.flippers[args.currTile] === 'flag';

    const mineTileOnDead = args.flippers[args.currTile] === true;

    const mineTileAfterDead = args.timerState === 'FREEZE DEAD';

    const tileIsFlaggedGamePlay = args.flippers[args.currTile] === 'flag';

    if (flagOnMineTileAfterVictory) {
      return { ...styleObj, ...flagSquare, ...disabledSquare };
    }

    if (mineTileAfterDead) {
      return { ...styleObj, ...mineSquare, ...disabledSquare };
    }

    if (tileIsFlaggedGamePlay) {
      return { ...styleObj, ...flagSquare };
    }

    if (mineTileOnDead) {
      return { ...styleObj, ...mineSquare };
    }

    return styleObj;
  };

  const genNumberStyles = (args: {
    numbers: {};
    flippers: (string | boolean)[];
    currTile: number;
  }) => {
    let styleObj = sweepSquare;

    const flagOnNumberTileGamePlay = args.flippers[args.currTile] === 'flag';

    if (flagOnNumberTileGamePlay) {
      return { ...styleObj, ...flagSquare };
    }

    // Number Color Determination
    const currNum = args.numbers[args.currTile];

    if (currNum === 1) {
      return { ...styleObj, ...blueNum };
    }

    if (currNum === 2) {
      return { ...styleObj, ...greenNum };
    }

    if (currNum === 3) {
      return { ...styleObj, ...redNum };
    }

    if (currNum === 4) {
      return { ...styleObj, ...purpleNum };
    }

    if (currNum === 5) {
      return { ...styleObj, ...maroonNum };
    }

    if (currNum === 6) {
      return { ...styleObj, ...turquoiseNum };
    }

    if (currNum === 7) {
      return { ...styleObj, ...blackNum };
    }

    if (currNum === 8) {
      return { ...styleObj, ...greyNum };
    }
    return styleObj;
  };

  const genEmptyStyles = (args: {
    flippers: (string | boolean)[];
    currTile: number;
  }) => {
    let styleObj = sweepSquare;

    const emptyTileOnVictoryOrDead =
      timerState === 'VICTORY' ||
      timerState === 'FREEZE WIN' ||
      timerState === 'FREEZE DEAD';

    const flagOnEmptyTileGameplay = args.flippers[args.currTile] === 'flag';

    const emptyTileRevealedGameplay = args.flippers[args.currTile] === true;

    if (emptyTileOnVictoryOrDead) {
      return { ...styleObj, ...disabledSquare, ...darkSquare };
    }

    if (flagOnEmptyTileGameplay) {
      return { ...styleObj, ...flagSquare };
    }

    if (emptyTileRevealedGameplay) {
      return { ...styleObj, ...darkSquare };
    }
    return styleObj;
  };

  const styles = (() => {
    if (mineArr.includes(props.currTile)) {
      return genMineStyles({ flippers, currTile: props.currTile, timerState });
    }

    if (numbers[props.currTile]) {
      return genNumberStyles({ flippers, currTile: props.currTile, numbers });
    }

    return genEmptyStyles({ flippers, currTile: props.currTile });
  })();

  return (
    <Box
      sx={{ ...styles }}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // If tile is a bomb...
        if (mineArr.includes(props.currTile)) {
          dispatch(setTimerState('FREEZE DEAD'));

          return handleClick(e, {
            dimensions,
            mineArr,
            numbers,
            flippers,
            currTile: props.currTile,
            indicator: 'dead',
            boardDispatch: dispatch,
          });
        }

        if (flippers[props.currTile] === 'flag') {
          dispatch(setFlagsRemaining(flagsRemaining + 1));
        }

        if (!timerState) {
          dispatch(setTimerState(true));
          return handleClick(e, {
            dimensions,
            mineArr,
            numbers,
            flippers,
            currTile: props.currTile,
            boardDispatch: dispatch,
          });
        }

        return handleClick(e, {
          dimensions,
          mineArr,
          numbers,
          currTile: props.currTile,
          indicator: null,
          boardDispatch: dispatch,
          flippers,
        });
      }}
      onContextMenu={(e: React.MouseEvent) => {
        if (flippers[props.currTile] !== true) {
          dispatch(
            setFlagsRemaining(
              flippers[props.currTile] === false
                ? flagsRemaining - 1
                : flagsRemaining + 1
            )
          );
          return handleClick(e, {
            dimensions,
            mineArr,
            numbers,
            currTile: props.currTile,
            boardDispatch: dispatch,
            flippers,
          });
        }
        e.preventDefault();
      }}
      onMouseDown={() => {
        if (!flippers[props.currTile]) {
          dispatch(setSmileyState('surprised-guy'));
        }
      }}
      onMouseUp={(e: React.MouseEvent) => {
        if (mineArr.includes(props.currTile) && e.button === 0 && !e.ctrlKey) {
          return dispatch(setSmileyState('dead-guy'));
        }
        return dispatch(setSmileyState('smiley-guy'));
      }}
    >
      {tileIsANumber ? numbers[props.currTile] : tileIsAMine ? '*' : null}
    </Box>
  );
};

export default Square;
