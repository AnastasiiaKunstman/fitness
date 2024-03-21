import { FC } from 'react';
import styles from './styles.module.css';

type PropsType = {
  children: React.ReactNode;
  disabled?: boolean;
};

const Button: FC<PropsType> = ({ children, disabled = false }) => {
  return (
    <button className={`${styles.button} ${disabled ? styles.disabled : ''}`} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;