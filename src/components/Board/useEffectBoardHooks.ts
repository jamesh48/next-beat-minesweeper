import { useEffect } from 'react';
import {
  generateMines,
  generateNumbers,
  resetFlippers,
  revealFlippers,
  setFlagsRemaining,
} from '../../redux/boardReducer';
import { setTimerState } from '../../redux/timerReducer';
import {
  GenerateMinesEffectFunc,
  GenerateNumberEffectFunc,
  ResetFlagsRemainingOnSkillChangeOrTimerOnFunc,
  ResetGameEffectOnSmileyOrSkillFunc,
  ResetOnSkillLevelChangeEffectFunc,
  RevealFlipperEffectFunc,
} from '../types';

export const useGenerateMinesEffect: GenerateMinesEffectFunc = (
  dimensions,
  boardDispatch
) => {
  useEffect(() => {
    boardDispatch(generateMines(dimensions));
  }, []);
};

export const generateNumberEffect: GenerateNumberEffectFunc = (
  mineArr,
  { verticalDimension, horizontalDimension },
  boardDispatch
) => {
  //When Mines are reset, generate numbers around those mines
  useEffect(() => {
    boardDispatch(
      generateNumbers({ mineArr, verticalDimension, horizontalDimension })
    );
  }, [mineArr]);
};

export const revealFlipperEffect: RevealFlipperEffectFunc = (args) => {
  const { mineArr, flippers, numbers, boardDispatch } = args;

  useEffect(() => {
    if (mineArr.length && flippers.length && flippers[0] !== 'dead') {
      // Only store score when all flippers have been flipped (ends recursive loop)
      if (
        flippers.every((flipper) => {
          if (typeof flipper === 'number') {
            return !!mineArr[flipper];
          } else {
            return flipper === true || flipper === 'flag';
          }
        })
      ) {
        // Stop the clock and indicate a win
        // globalDispatch({ type: 'FREEZE TIMER STATE VICTORY' });
        boardDispatch(setTimerState('VICTORY'));
        // If a victory is detected by all numbers being revealed, flip all the empty squares
      } else if (
        Object.keys(numbers).length &&
        Object.keys(numbers).every((num) => flippers[num] === true)
      ) {
        boardDispatch(revealFlippers({ mineArr }));
      }
    }
  }, [flippers]);
};

// This condition resets the board when the smiley face is punched or the skillLevel is changed because timerState is set to false. It also resets the board if the user changes the skillLevel before playing, which is most likely.
export const resetGameEffectOnSmileyOrSkill: ResetGameEffectOnSmileyOrSkillFunc =
  (timerState, dimensions, boardDispatch) => {
    useEffect(() => {
      if (timerState === false) {
        // Set all Tiles to False (hidden)
        boardDispatch(
          resetFlippers(
            Array.from(
              {
                length:
                  dimensions.horizontalDimension * dimensions.verticalDimension,
              },
              () => false
            )
          )
        );
        // Generate Mines
        boardDispatch(generateMines(dimensions));
      }
    }, [timerState, dimensions]);
  };

export const resetFlagsRemainingOnSkillChangeOrTimerOn: ResetFlagsRemainingOnSkillChangeOrTimerOnFunc =
  (timerState, skillLevel, boardDispatch) => {
    // This resets the flags whenever the skillLevel is changed or game is reset

    useEffect(() => {
      if (timerState === false) {
        boardDispatch(
          setFlagsRemaining(
            skillLevel === 'beginner'
              ? 10
              : skillLevel === 'intermediate'
              ? 40
              : 99
          )
        );
      }
    }, [skillLevel, timerState]);
  };

export const resetOnSkillLevelChangeEffect: ResetOnSkillLevelChangeEffectFunc =
  (skillLevel, dispatch) => {
    // If Skill Level is changed, reset the board.
    useEffect(() => {
      dispatch(setTimerState(false));
    }, [skillLevel]);
  };
