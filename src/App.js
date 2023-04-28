import { useState, useEffect } from 'react';
import './App.css';
import EventHeader from "./components/Bulletin/Event/EventHeader";
import Bulletin from './components/Bulletin/Bulletin';
import { EMPTY_EVENT_SCHEME } from "./assets/schemes";
import CartProvider from './store/CartProvider';

function App() {
  const [bulletin, setBulletin] = useState([]);

  const fetchBulletin = () => {
    fetch('https://nesine-case-study.onrender.com/bets ')
      .then((response) => response.json())
      .then((data) => setBulletin(data.slice(0, 20)))
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
        <EventHeader
          event={EMPTY_EVENT_SCHEME}
          wrapWithEventContainer="true"
          wrapperType="mainHeaderWrapper"
        />
        <Bulletin
          bulletin={bulletin}
        />
      </div>
    </CartProvider>
  );
}

export default App;
