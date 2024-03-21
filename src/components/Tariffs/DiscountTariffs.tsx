import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Tariff } from '../../models/models';

interface DiscountTariffsProps {
    id: number;
    name: string;
    price: number;
    prices: string;
    sale: string;
    onChange: (isChecked: boolean) => void;
    onClick: () => void;
    selectedTariff?: Tariff | null;
}

const DiscountTariffs: React.FC<DiscountTariffsProps> = ({ id, name, price, prices, sale, onChange, onClick, selectedTariff }) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const isSelected = selectedTariff && selectedTariff.id === id;

    useEffect(() => {
        setIsChecked(Boolean(isSelected));
    }, [isSelected]);

    const handleCheckboxChange = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onChange(newCheckedState);
    };

    const handleCardClick = () => {
        onClick();
    };

    return (
        <div className={`${styles.card__discount} ${isChecked && isSelected ? styles.selected : ''}`} onClick={handleCardClick}>
            <div className={styles.card__info}>
                <div className={styles.info}>
                    <h3 className={styles.card__name}>{name}</h3>
                    <input type="radio" checked={isChecked} onChange={handleCheckboxChange} />
                </div>
                <p className={styles.price} id="originalPrice">{prices}</p>
            </div>
            <div className={styles.discount}>
                <p className={styles.price__discount}>{price}₽</p>
                <div className={styles.discount__sale}>
                    <p className={styles.sale}>{sale}</p>
                </div>
            </div>
        </div>
    );
};

export default DiscountTariffs;