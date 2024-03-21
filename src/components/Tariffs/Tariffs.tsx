import React from 'react';
import styles from './styles.module.css';
import { Tariff } from '../../models/models';

interface TariffProps {
  id: number;
  name: string;
  price: number;
  txt: string;
  prices: string;
  sale: string;
  onClick: () => void;
  isVisible: boolean;
  isTimerExpired: boolean;
  selectedTariff: Tariff | null;
}

const Tariffs: React.FC<TariffProps> = ({ id, name, price, txt, prices, sale, onClick, selectedTariff, isVisible, isTimerExpired }) => {
  const isSelected = selectedTariff && selectedTariff.id === id;
  const handleCardClick = () => {
    onClick();
  };

  return (
    <div className={`${styles.card} ${isSelected ? styles.selected : ''}`} onClick={handleCardClick}>
      {isVisible && <div className={styles.card__sale}>
        <p className={styles.sale}>{sale}</p>
      </div>}
      <h3 className={styles.card__name}>{name}</h3>
      <div className={styles.card__prices}>
      {isVisible && <p className={styles.discount__price}>{price}₽</p>}
      <p className={`${styles.price} ${isTimerExpired ? styles.timerExpired : ''}`} >{prices}</p>
      </div>
      <p className={styles.text}>{txt}</p>
    </div>
  );
};

export default Tariffs;