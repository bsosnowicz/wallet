import { useParams } from "react-router-dom";
import css from "./CryptoTab.module.css";
import { useEffect, useState } from "react";

const CryptoTab = ({ cryptoList }) => {
  const [cryptoDetails, setCryptoDetails] = useState();
  const { cryptoNameParam } = useParams();
  const cryptoName = cryptoNameParam.slice(7, 30);

  const getCryptoDetails = async () => {
    const cryptoDetails = await cryptoList.find(
      (item) => item.id === cryptoName
    );
    setCryptoDetails(cryptoDetails);
  };

  useEffect(() => {
    getCryptoDetails();
  }, []);

  return (
    <div className={css.Container}>
      {cryptoDetails ? (
        <div>
          <div className={css.CryptoNameContainer}>
            <img
              alt="crypto Icon"
              className={css.Icon}
              src={cryptoDetails.icon}
            />
            <h3 className={css.Title}>{cryptoDetails.name}</h3>
            <p className={css.Shortcut}>{cryptoDetails.symbol}</p>
          </div>
          <p className={css.Price}>${cryptoDetails.price}</p>
          <div className={css.ButtonContainer}>
            <button className={css.Button}>Buy</button>
            <button className={css.Button}>Sell</button>
          </div>
          <ul className={css.DetailsList}>
            <li className={css.Details}>
              <p>Market Cap</p>
              {cryptoDetails.marketCap}
            </li>

            <li className={css.Details}>
              <p>1-Hour Avg</p>
              {cryptoDetails.priceChange1h}
            </li>
            <li className={css.Details}>
              <p>1-Day Avg</p>
              {cryptoDetails.priceChange1d}
            </li>
            <li className={css.Details}>
              <p>1-Week Avg</p>
              {cryptoDetails.priceChange1w}
            </li>
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CryptoTab;
