import { GenerateNumbersFunc } from '../components/types';

type FlipRecursedTilesFunc = (
  existingFlippers: (string | boolean)[],
  recursedTiles: number[]
) => (string | boolean)[];

export const flipRecursedTilesUtil: FlipRecursedTilesFunc = (
  existingFlippers,
  recursedTiles
) => {
  for (let i = 0; i < recursedTiles.length; i++) {
    existingFlippers.splice(recursedTiles[i], 1, true);
  }
  return [...existingFlippers];
};

type GenerateMinesFunc = (dimensions: {
  numberOfMines: number;
  verticalDimension: number;
  horizontalDimension: number;
}) => number[];

export const generateMinesUtil: GenerateMinesFunc = ({
  numberOfMines,
  verticalDimension,
  horizontalDimension,
}) => {
  let generatedMines: number[] = [];
  while (generatedMines.length < numberOfMines) {
    const mineCanidate = Math.floor(
      Math.random() * (verticalDimension * horizontalDimension)
    );
    if (!generatedMines.includes(mineCanidate)) {
      generatedMines.push(mineCanidate);
    }
  }
  return generatedMines;
};

type SetFlagFlippedFunc = (
  existingFlippers: (string | boolean)[],
  flagFlipped: number
) => (string | boolean)[];

export const setFlagFlippedUtil: SetFlagFlippedFunc = (
  existingFlippers,
  flagFlipped
) => {
  if (existingFlippers[flagFlipped] === 'flag') {
    existingFlippers.splice(flagFlipped, 1, false);
  } else {
    existingFlippers.splice(flagFlipped, 1, 'flag');
  }
  return [...existingFlippers];
};

type FlipNormalTileFunc = (
  existingFlippers: (string | boolean)[],
  flippedTile: number
) => (string | boolean)[];

export const flipNormalTileUtil: FlipNormalTileFunc = (
  existingFlippers,
  flippedTile
) => {
  existingFlippers.splice(flippedTile, 1, true);
  return [...existingFlippers];
};

export const generateNumbersUtil: GenerateNumbersFunc = ({
  mineArr,
  verticalDimension,
  horizontalDimension,
}) => {
  let board = [...Array(verticalDimension * horizontalDimension).keys()];
  let numBoard = {};

  mineArr.forEach((mine, _, mines) => {
    // Number is Top Left Diagonal
    let tLD = horizontalDimension + 1;
    if (
      board.includes(mine - tLD) &&
      (mine - tLD + 1) % horizontalDimension !== 0 &&
      !mines.includes(mine - tLD)
    ) {
      if (numBoard[mine - tLD]) {
        numBoard[mine - tLD] = numBoard[mine - tLD] + 1;
      } else {
        numBoard[mine - tLD] = 1;
      }
    }

    // Number is Above
    const tD = horizontalDimension;
    if (board.includes(mine - tD) && !mines.includes(mine - tD)) {
      if (numBoard[mine - tD]) {
        numBoard[mine - tD] = numBoard[mine - tD] + 1;
      } else {
        numBoard[mine - tD] = 1;
      }
    }

    //Number is Top Right Diagonal
    const tRD = horizontalDimension - 1;
    if (
      board.includes(mine - tRD) &&
      (mine - tRD) % horizontalDimension !== 0 &&
      !mines.includes(mine - tRD)
    ) {
      if (numBoard[mine - tRD]) {
        numBoard[mine - tRD] = numBoard[mine - tRD] + 1;
      } else {
        numBoard[mine - tRD] = 1;
      }
    }

    // Number to the right
    if (
      board.includes(mine + 1) &&
      (mine + 1) % horizontalDimension !== 0 &&
      !mines.includes(mine + 1)
    ) {
      if (numBoard[mine + 1]) {
        numBoard[mine + 1] = numBoard[mine + 1] + 1;
      } else {
        numBoard[mine + 1] = 1;
      }
    }

    // Number is Bottom Right Diagonal
    const bRD = horizontalDimension + 1;
    if (
      board.includes(mine + bRD) &&
      (mine + bRD) % horizontalDimension !== 0 &&
      !mines.includes(mine + bRD)
    ) {
      if (numBoard[mine + bRD]) {
        numBoard[mine + bRD] = numBoard[mine + bRD] + 1;
      } else {
        numBoard[mine + bRD] = 1;
      }
    }

    // Number is Below
    const bD = horizontalDimension;
    if (board.includes(mine + bD) && !mines.includes(mine + bD)) {
      if (numBoard[mine + bD]) {
        numBoard[mine + bD] = numBoard[mine + bD] + 1;
      } else {
        numBoard[mine + bD] = 1;
      }
    }

    //Number is Bottom Left Diagonal
    const bLD = horizontalDimension - 1;
    if (
      board.includes(mine + bLD) &&
      (mine + bLD + 1) % horizontalDimension !== 0 &&
      !mines.includes(mine + bLD)
    ) {
      if (numBoard[mine + bLD]) {
        numBoard[mine + bLD] = numBoard[mine + bLD] + 1;
      } else {
        numBoard[mine + bLD] = 1;
      }
    }

    // Number to the left
    if (
      board.includes(mine - 1) &&
      mine % horizontalDimension !== 0 &&
      !mines.includes(mine - 1)
    ) {
      if (numBoard[mine - 1]) {
        numBoard[mine - 1] = numBoard[mine - 1] + 1;
      } else {
        numBoard[mine - 1] = 1;
      }
    }
  });
  return numBoard;
};

type RevealDeadFlippersFunc = (
  existingFlippers: (string | boolean)[]
) => (string | boolean)[];

export const revealDeadFlippersUtil: RevealDeadFlippersFunc = (
  existingFlippers
) => {
  existingFlippers = existingFlippers.map((_, index) => {
    if (index === 0) {
      return 'dead';
    } else {
      return true;
    }
  });
  return [...existingFlippers];
};

type RevealFlippersFunc = (
  existingFlippers: (string | boolean)[],
  mines: number[]
) => (string | boolean)[];

export const revealFlippersUtil: RevealFlippersFunc = (
  existingFlippers,
  mines
) => {
  return existingFlippers.map((flipper, index) => {
    if (flipper === 'flag' || mines.includes(index)) {
      return 'flag';
    } else {
      return true;
    }
  });
};
