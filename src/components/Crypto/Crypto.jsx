import css from "./Crypto.module.css";
import api from "../../auth/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Crypto = ({ getBalance, wallet, cryptoList }) => {
  const [cryptoWallet, setCryptoWallet] = useState();

  const createCryptoWallet = async () => {
    try {
      const response = await api.post("http://localhost:8000/crypto/create");
      setCryptoWallet(response);
    } catch (e) {
      console.log(e.message);
    }
  };

  const getCryptoWallet = async () => {
    try {
      const response = await api.get("http://localhost:8000/crypto");
      setCryptoWallet(response);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getCryptoWallet();
    getBalance();
  }, []);

  return (
    <div>
      <h3 className={css.Title}>Crypto</h3>
      <div className={css.Container}>
        {cryptoWallet ? (
          <div>
            <p className={css.Balance}>
              {wallet ? `${wallet.balance}` : `N/A`} $
            </p>
            <p className={css.Currency}>Dollar</p>
            <Link className={css.Link} to="invest">
              <button className={css.Button}>Invest</button>
            </Link>
          </div>
        ) : (
          <div>
            <p>You don't have any crypto account</p>
            <p>Do you want to create it now?</p>
            <div className={css.ButtonContainer}>
              <button onClick={() => createCryptoWallet()}>
                Create crypto wallet
              </button>
            </div>
          </div>
        )}
      </div>
      <h4 className={css}>Trending crypto</h4>
      <div className={css.Container}>
        <ul className={css.CryptoListContainer}>
          {cryptoList ? (
            cryptoList.map((item) => (
              <li>
                <img alt="crypto icon" src={item.icon} />
                <h4>{item.id}</h4>
                <p>{item.priceChange1h}%</p>
              </li>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </div>
      <h4>Your crypto wallet</h4>
      <div className={css.Container}></div>
    </div>
  );
};

export default Crypto;
