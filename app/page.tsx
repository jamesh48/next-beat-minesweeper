import styles from './page.module.css';
import Minesweeper from '../index';
import { Box } from '@mui/material';

const Home = () => {
  return (
    <Box
      className="main"
      sx={{ height: '100%', backgroundColor: 'darkslategray' }}
    >
      <Minesweeper />
    </Box>
  );
};

export default Home;
