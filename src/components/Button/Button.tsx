import { FC } from 'react';
import styles from './styles.module.css';

type PropsType = {
  children: React.ReactNode;
  disabled?: boolean;
  buttonClass?: string;
};

const Button: FC<PropsType> = ({ children, disabled = false, buttonClass  }) => {
  return (
    <button className={`${styles.button} ${disabled ? styles.disabled : ''} ${buttonClass}`} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;