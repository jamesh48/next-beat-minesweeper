import { Box } from '@mui/material';

const SmileyBar = () => {
  return (
    <Box
      id="smiley-bar"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'darkslategray',
        color: 'ivory',
        border: '2px solid black',
        height: '1.5rem',
        verticalAlign: 'auto',
      }}
    >
      <Box
        className="smiley-guy"
        sx={{
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5rem',
          backgroundPosition: 'center',
          display: 'inline-block',
          height: '20px',
          padding: '2.5px, 12.5px 2.5px 12.5px',
          // backgroundImage: 'url(#{$Cloudfront}/mine-images/smiley-face.jpg)'
        }}
      ></Box>
    </Box>
  );
};

export default SmileyBar;
