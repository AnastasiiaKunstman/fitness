import { useEffect, useState } from 'react';
import Tariffs from '../Tariffs/Tariffs';
import styles from './styles.module.css';
import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';
import { TARIFFPRICE, TARIFFSALES, CARDTEXT, USERAGREEMENT, MOBILE_CARDTEXT } from '../../utils/constans';
import { Tariff } from '../../models/models';

interface MainProps {
    tariffs: Tariff[];
    isVisible: boolean;
    isTimerExpired: boolean;
    selectedTariff: Tariff | null;
    handleTariffClick: (tariff: Tariff) => void;
}

const Main: React.FC<MainProps> = ({ tariffs, isVisible, isTimerExpired, handleTariffClick, selectedTariff }) => {
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [txt, setTxt] = useState(CARDTEXT[0]);

    useEffect(() => {
        const handleResize = () => {
            setTxt(window.innerWidth <= 767 ? MOBILE_CARDTEXT[0] : CARDTEXT[0]);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [txt]);

    const handleCheckboxChange = (isChecked: boolean) => {
        setIsButtonActive(isChecked);
    };

    return (
        <main>
            <h2 className={styles.main__title}>
                Выберите подходящий тарифный план
            </h2>
            <div className={styles.main}>
                <div className={styles.img}>
                    <div className={styles.gradient}></div>
                </div>
                <div className={styles.section}>
                    <div className={styles.card_section}>
                        {tariffs.map((tariff, index) => (
                            <Tariffs
                                key={tariff.id}
                                id={tariff.id}
                                name={tariff.name}
                                price={tariff.price}
                                txt={window.innerWidth <= 767 ? MOBILE_CARDTEXT[index] : CARDTEXT[index]}
                                prices={TARIFFPRICE[index]}
                                sale={TARIFFSALES[index]}
                                onClick={() => handleTariffClick(tariff)}
                                selectedTariff={selectedTariff}
                                isVisible={isVisible}
                                isTimerExpired={isTimerExpired}
                            />
                        ))}
                    </div>
                    <p className={styles.subtitle}>Следуя плану на 3 месяца, люди получают в 2 раза лучший результат, чем за 1 месяц</p>
                    <>
                        <Checkbox onChange={handleCheckboxChange} />
                        <Button buttonClass={styles.button} disabled={!isButtonActive}>Купить</Button>
                    </>
                    <p className={styles.text}>{USERAGREEMENT}</p>
                </div>
            </div>
        </main>
    );
}

export default Main;
