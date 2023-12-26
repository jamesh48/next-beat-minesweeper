import {
  revealDeadFlippers,
  setFlagFlipped,
  flipRecursedTiles,
  flipNormalTile,
} from '../../redux/boardReducer';
import { HandleClickFunc } from '../types';

type TileRecurseFunc = (args: {
  currTile: number;
  dimensions: { horizontalDimension: number; verticalDimension: number };
  numbers: {};
  mineArr: number[];
  flippers: (string | boolean)[];
  resultArr: (string | boolean | number)[];
  consumedFlagArr: string[];
}) => [(string | boolean | number)[], number];

const tileRecurse: TileRecurseFunc = (args) => {
  const {
    currTile,
    dimensions,
    numbers,
    mineArr,
    resultArr,
    flippers,
    consumedFlagArr,
  } = args;

  // const _evalFlag = (currTile: number) => {
  //   if (flippers[currTile] === 'flag') {
  //     return 1;
  //   }
  //   return 0;
  // };

  resultArr.push(currTile);
  if (flippers[currTile] === 'flag') {
    consumedFlagArr.push('x');
  }
  type EvalTestFunc = (currTile: number) => number;

  const evalU: EvalTestFunc = (currTile) =>
    currTile - dimensions.horizontalDimension;
  const evalR: EvalTestFunc = (currTile) => currTile + 1;
  const evalD: EvalTestFunc = (currTile) =>
    currTile + dimensions.horizontalDimension;
  const evalL: EvalTestFunc = (currTile) => currTile - 1;

  type TestCurrTileFunc = (currTile: number, testFunc: Function) => boolean;

  const testCurrTile: TestCurrTileFunc = (currTile, testFunc) => {
    return (
      !numbers[testFunc(currTile)] &&
      !mineArr.includes(testFunc(currTile)) &&
      !resultArr.includes(testFunc(currTile)) &&
      testFunc(currTile) >= 0 &&
      testFunc(currTile) <=
        dimensions.verticalDimension * dimensions.horizontalDimension
    );
  };
  // ***********
  //  Going Up
  // ***********

  if (testCurrTile(currTile, evalU)) {
    tileRecurse({
      currTile: evalU(currTile),
      dimensions,
      numbers,
      mineArr,
      resultArr,
      flippers,
      consumedFlagArr,
    });
  }

  // ***********
  //  Going Right
  // ***********

  if (
    testCurrTile(currTile, evalR) &&
    (evalR(currTile) % dimensions.horizontalDimension !== 0 ||
      (evalR(currTile) % dimensions.horizontalDimension === 0 &&
        currTile % dimensions.horizontalDimension === 0))
  ) {
    tileRecurse({
      currTile: evalR(currTile),
      dimensions,
      numbers,
      mineArr,
      resultArr,
      flippers,
      consumedFlagArr,
    });
  }

  // ***********
  //  Going Down
  // ***********

  if (testCurrTile(currTile, evalD)) {
    tileRecurse({
      currTile: evalD(currTile),
      dimensions,
      numbers,
      mineArr,
      resultArr,
      flippers,
      consumedFlagArr,
    });
  }

  // ***********
  //  Going Left
  // ***********

  if (
    testCurrTile(currTile, evalL) &&
    (evalL(currTile + 1) % dimensions.horizontalDimension !== 0 ||
      (evalL(currTile + 1) % dimensions.horizontalDimension === 0 &&
        evalL(currTile) % dimensions.horizontalDimension === 0))
  ) {
    tileRecurse({
      currTile: evalL(currTile),
      dimensions,
      numbers,
      mineArr,
      resultArr,
      flippers,
      consumedFlagArr,
    });
  }

  return [resultArr, consumedFlagArr.length];
};

export const handleClick: HandleClickFunc = (event, args) => {
  event.preventDefault();

  if (args.indicator === 'dead') {
    return args.boardDispatch(revealDeadFlippers());
  }

  if (event.type === 'contextmenu') {
    return args.boardDispatch(setFlagFlipped({ flagFlipped: args.currTile }));
  }

  if (
    event.type === 'click' &&
    args.indicator !== 'dead' &&
    !args.numbers[args.currTile] &&
    !args.mineArr.includes(args.currTile)
  ) {
    return args.boardDispatch(
      flipRecursedTiles(
        tileRecurse({
          currTile: args.currTile,
          dimensions: args.dimensions,
          flippers: args.flippers,
          numbers: args.numbers,
          mineArr: args.mineArr,
          resultArr: [],
          consumedFlagArr: [],
        }) as [number[], number]
      )
    );
  }

  if (event.type === 'click' && args.indicator !== 'dead') {
    return args.boardDispatch(flipNormalTile({ flippedTile: args.currTile }));
  }
  return null;
};
