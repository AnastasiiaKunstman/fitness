import React from 'react';
import styles from './styles.module.css';

interface TimerProps {
  counter: { minutes: number; seconds: number };
  isRed: boolean;
}

const Timer: React.FC<TimerProps> = ({ counter, isRed }) => {
  return (
    <div className={styles.timer__block}>
      <div id="timer" className={`${styles.timer} ${isRed ? styles.red : ''}`}>
        {counter.minutes < 10 ? "0" + counter.minutes : counter.minutes} : {counter.seconds < 10 ? "0" + counter.seconds : counter.seconds}
      </div>
      <div className={styles.timer__text}>
        <p>минут</p>
        <p>секунд</p>
      </div>
    </div>
  );
};

export default Timer;