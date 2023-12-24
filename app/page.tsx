import Image from 'next/image';
import styles from './page.module.css';
import Minesweeper from '../components/Minesweeper/Minesweeper';

const Home = () => {
  return (
    <main className={styles.main}>
      <Minesweeper />
    </main>
  );
};

export default Home;
