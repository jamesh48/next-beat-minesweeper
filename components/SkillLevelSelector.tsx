import React from 'react';
import { Box, Button, SxProps } from '@mui/material';

const buttonStyles: SxProps = {
  display: 'flex',
  backgroundColor: 'ivory',
  color: 'darkblue',
  width: '30%',
  margin: '0px 1.6%',
  '&:hover': {
    backgroundColor: 'darkslategray',
    color: 'ivory',
  },
};

const SkillLevelSelector = () => {
  return (
    <Box
      id="skill-level-selector"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
      }}
    >
      <Button sx={{ ...buttonStyles }}>Beginner</Button>
      <Button sx={{ ...buttonStyles }}>Intermediate</Button>
      <Button sx={{ ...buttonStyles }}>Expert</Button>
    </Box>
  );
};

// export default React.memo(SkillLevelSelector);
export default SkillLevelSelector;
