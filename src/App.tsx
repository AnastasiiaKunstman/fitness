import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Popup from './components/Popup/Popup';
import { Tariff } from './models/models';
import { BASE_API } from './utils/constans';
import './index.css'
function App(): JSX.Element {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [discountTariffs, setDiscountTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [counter, setCounter] = useState({ minutes: 2, seconds: 0 });
  const [isRed, setIsRed] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isTimerExpired, setIsTimerExpired] = useState<boolean>(false);
  const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null);

  const handleTariffClick = (tariff: Tariff) => {
    setSelectedTariff(tariff);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const totalSeconds = counter.minutes * 60 + counter.seconds;

      if (totalSeconds <= 0) {
        setIsPopupOpen(true)
        setIsVisible(false);
        setIsRed(false);
        setIsTimerExpired(true);
        return;
      } else if (totalSeconds === 30) {
        setIsRed(true);
      }

      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60 - 1;
      setCounter({ minutes, seconds });
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter, setIsPopupOpen]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Tariff[]>(BASE_API);
        const fetchedTariffs = response.data;
        const popularTariffs = fetchedTariffs.filter((tariff) => tariff.isPopular);
        const fetchedDiscountTariffs = fetchedTariffs.filter((tariff) => tariff.isDiscount);

        setTariffs(popularTariffs);
        setDiscountTariffs(fetchedDiscountTariffs);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <>
      <Header counter={counter} isRed={isRed} />
      {loading && <p className='loading'>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error &&
        <Main
          tariffs={tariffs}
          isVisible={isVisible}
          isTimerExpired={isTimerExpired}
          handleTariffClick={handleTariffClick}
          selectedTariff={selectedTariff}
        />
      }
      <Popup
        discountTariffs={discountTariffs}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        handleTariffClick={handleTariffClick}
        selectedTariff={selectedTariff}
      />
    </>
  );
}

export default App;