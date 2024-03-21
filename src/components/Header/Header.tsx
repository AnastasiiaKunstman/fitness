import React from 'react';
import Timer from '../Timer/Timer';
import styles from './styles.module.css';

interface TimerProps {
  counter: { minutes: number; seconds: number };
  isRed: boolean;
}

const Header: React.FC<TimerProps> = ({ counter, isRed }) => {
  return (
    <header>
      <h1 className={styles.title}>Скидка действует:</h1>
      <Timer counter={counter} isRed={isRed} />
    </header>
  );
};

export default Header;