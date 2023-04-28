import { useState, useEffect } from 'react';
import './App.css';
import Bulletin from './components/Bulletin/Bulletin';
import CartProvider from './store/CartProvider';

function App() {
  const [bulletin, setBulletin] = useState([]);

  const fetchBulletin = () => {
    fetch('https://nesine-case-study.onrender.com/bets ')
      .then((response) => response.json())
      .then((data) => setBulletin(data))
      .catch((error) => {
        setBulletin([]);
      });
  }

  useEffect(() => {
    const dataFetchTimeout = setTimeout(() => {

      fetchBulletin();
    }, 100);

    return () => {
      clearTimeout(dataFetchTimeout);
    }
  }, []);

  return (
    <CartProvider>
      <div className="App">
        <Bulletin
          bulletin={bulletin}
        />
      </div>
    </CartProvider>
  );
}

export default App;
