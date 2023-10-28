import { useState } from "react";
import css from "./Invest.module.css";
import { Link } from "react-router-dom";

const Invest = ({ cryptoList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cryptoListDisplay, setCryptoListDisplay] = useState(cryptoList);

  const handleSearch = () => {
    if (searchTerm.length <= 0) {
      setCryptoListDisplay(cryptoList);
    } else {
      const filteredCrypto = cryptoList.filter((item) =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCryptoListDisplay(filteredCrypto);
    }
  };

  return (
    <div className={css.Container}>
      <h3 className={css.Title}>Invest</h3>
      <input
        onChange={(e) => {
          handleSearch();
          setSearchTerm(e.target.value);
        }}
        className={css.Input}
        placeholder="Search"
      ></input>
      <ul className={css.List}>
        {cryptoListDisplay ? (
          cryptoListDisplay.map((item) => (
            <Link className={css.Link} to={`/dashboard/crypto:${item.id}`}>
              <li className={css.Item}>
                <div className={css.CoinContainer}>
                  <img
                    alt="crypto icon"
                    className={css.CoinIcon}
                    src={item.icon}
                  />
                  <div className={css.CoinTextContainer}>
                    <p className={css.CoinName}>{item.id}</p>
                    <span className={css.CoinSymbol}>{item.symbol}</span>
                  </div>
                </div>
                <div className={css.Price}></div>
              </li>
            </Link>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </ul>
    </div>
  );
};

export default Invest;
