import React, { useEffect, useState } from 'react';
import DiscountTariffs from '../Tariffs/DiscountTariffs';
import Button from '../Button/Button';
import Close from '../../assets/close.svg';
import { DISCOUNTTARIFFPRICE, DISCOUNTTARIFFSALE } from '../../utils/constans';
import { Tariff } from '../../models/models';
import styles from './styles.module.css';

interface PopupProps {
    isOpen: boolean;
    discountTariffs: Tariff[];
    onClose: () => void;
    selectedTariff: Tariff | null;
    handleTariffClick: (tariff: Tariff) => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, discountTariffs, onClose, selectedTariff, handleTariffClick }) => {
    const [isButtonActive, setIsButtonActive] = useState(false);

    const handleCheckboxChange = (isChecked: boolean) => {
        setIsButtonActive(isChecked);
    };

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscKey);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [onClose]);


    if (!isOpen) return null;

    return (
        <div className={styles.popup__overley} onClick={(event) => event.target === event.currentTarget && onClose()}>
            <div className={styles.popup}>
                <p className={styles.hotoffer}>горящее предложение</p>
                <img src={Close} alt='Close' onClick={onClose} />
                <h2 className={styles.title}>Не упусти свой <span className={styles.highlighted}>последний шанс</span></h2>
                <div className={styles.text}>
                    <p className={styles.subtitle}>Мы знаем, как трудно начать.. <span className={styles.selection}>Поэтому!</span></p>
                    <p className={styles.subtitle__sale}>Дарим скидку для <span className={styles.highlighted}>лёгкого старта</span> 🏃‍♂️</p>
                </div>
                <div className={styles.cards__section}>
                    <p>Посмотри, что мы для тебя приготовили 🔥</p>
                    <div className={styles.cards}>
                        {discountTariffs.map((tariff, index) => (
                            <DiscountTariffs
                                key={tariff.id}
                                name={tariff.name}
                                price={tariff.price}
                                id={tariff.id}
                                prices={DISCOUNTTARIFFPRICE[index]}
                                sale={DISCOUNTTARIFFSALE[index]}
                                onChange={handleCheckboxChange}
                                onClick={() => handleTariffClick(tariff)}
                                selectedTariff={selectedTariff}
                            />
                        ))}
                    </div>
                </div>
                <Button disabled={!isButtonActive}>Начать тренироваться</Button>
            </div>
        </div>
    );
};

export default Popup;