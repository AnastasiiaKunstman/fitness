import React, { useState } from 'react';
import styles from './styles.module.css';

interface CheckboxProps {
  onChange: (isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState);
  };

  return (
    <div className={styles.checkbox}>
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      <p className={styles.checkbox__text}>
        Я соглашаюсь с <a href='#' target="_blank" rel="noopener noreferrer">Правилами сервиса</a> и условиями <a href='#' target="_blank" rel="noopener noreferrer">Публичной оферты.</a>
      </p>
    </div>
  );
};

export default Checkbox;
