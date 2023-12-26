export const sweepSquare = {
  display: 'flex',
  position: 'relative',
  width: '100%',
  cursor: 'pointer',
  fontWeight: 700,
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid darkslategray',
  backgroundColor: 'lightslategray',
  '&:hover': {
    backgroundColor: 'lightgrey',
  },
};

export const mineSquare = {
  backgroundColor: 'red',
  color: 'white',
};

export const darkSquare = {
  backgroundColor: 'darkslategray !important',
};

export const flagSquare = {
  backgroundColor: 'greenyellow !important',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '1.5rem',
  backgroundPosition: 'center',
  backgroundImage:
    'url(https://static.fullstackhrivnak.com/mines/mine-images/flag_icon.png)',
};

export const disabledSquare = {
  pointerEvents: 'none',
};

export const blueNum = {
  color: 'blue',
};

export const greenNum = {
  color: 'green',
};

export const redNum = {
  color: 'red',
};

export const purpleNum = {
  color: 'purple',
};

export const maroonNum = {
  color: 'maroon',
};

export const turquoiseNum = {
  color: 'turquoise',
};

export const blackNum = {
  color: 'black',
};

export const greyNum = {
  color: 'darkslategray',
};
