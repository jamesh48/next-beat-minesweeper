import { Dispatch } from '@reduxjs/toolkit';

type SkillLevel = string;

export type Dimensions = {
  skillLevel: SkillLevel;
  verticalDimension: number;
  horizontalDimension: number;
  numberOfMines: number;
};

export type HandleClickFunc = (
  event: React.MouseEvent,
  args: {
    currTile: number;
    indicator?: string | null;
    dimensions: {
      horizontalDimension: number;
      verticalDimension: number;
    };
    flippers: (string | boolean)[];
    mineArr: number[];
    numbers: {};
    boardDispatch: Dispatch;
  }
) => void;

// Type-Funcs:
export type GenerateMinesEffectFunc = (
  dimensions: Dimensions,
  boardDispatch: Dispatch
) => void;

export type GenerateNumberEffectFunc = (
  mineArr: number[],
  dimensions: Dimensions,
  boardDispatch: Dispatch
) => void;

export type GenerateNumbersFunc = (dimensions: {
  mineArr: number[];
  verticalDimension: number;
  horizontalDimension: number;
}) => {};

export type RevealFlipperEffectFunc = (args: {
  mineArr: number[];
  flippers: (string | number | boolean)[];
  numbers: {};
  boardDispatch: Dispatch;
}) => void;

export type ResetGameEffectOnSmileyOrSkillFunc = (
  timerState: string | boolean,
  dimensions: Dimensions,
  boardDispatch: Dispatch
) => void;

export type UseIntervalFunc = (
  callback: () => void,
  delay: number | null
) => void;

export type ResetFlagsRemainingOnSkillChangeOrTimerOnFunc = (
  timerStat: string | boolean,
  skillLevel: 'beginner' | 'intermediate' | 'advanced',
  boardDispatch: Dispatch
) => void;

export type ResetOnSkillLevelChangeEffectFunc = (
  skillLevel: 'beginner' | 'intermediate' | 'advanced',
  boardDispatch: Dispatch
) => void;
