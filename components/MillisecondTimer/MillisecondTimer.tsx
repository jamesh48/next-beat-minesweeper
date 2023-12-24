import { Box, Typography } from '@mui/material';

const MillisecondTimer = () => {
  return (
    <Box
      className="milli-second-timer-container"
      sx={{
        display: 'flex',
        width: '50%',
        justifyContent: 'center',
        padding: '1.5em 0',
      }}
    >
      <Typography
        variant="h4"
        id="milli-second-timer"
        sx={{
          color: 'ivory',
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid ivory',
          padding: '.5% 0',
        }}
      ></Typography>
    </Box>
  );
};

export default MillisecondTimer;
