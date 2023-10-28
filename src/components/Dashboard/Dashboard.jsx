import { useEffect, useState } from "react";
import api from "../../auth/api";
import css from "./Dashboard.module.css";
import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";
import { Route, Routes } from "react-router-dom";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import Crypto from "../Crypto/Crypto";
import LogoutModal from "../LogoutModal/LogoutModal";
import Invest from "../Crypto/Invest/Invest";
import CryptoTab from "../Crypto/CryptoTab/CryptoTab";

const Dashboard = () => {
  const [wallet, setWallet] = useState();
  const [cryptoList, setCryptoList] = useState();

  const getBalance = async () => {
    try {
      const response = await api.get("http://localhost:8000/balance");
      if (response.data.status === "success") {
        setWallet(response.data.data.userWallet);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const getCryptoList = async () => {
    try {
      const response = await api.get(
        "https://api.coinstats.app/public/v1/coins?skip=0&limit=10&currency=USD"
      );
      setCryptoList(response.data.coins);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getBalance();
    getCryptoList();
  }, []);

  return (
    <div className={css.Container}>
      <Navigation />
      <div className={css.CardContainer}>
        <Routes>
          <Route
            path="home"
            element={<Home wallet={wallet} getBalance={getBalance} />}
          />
          <Route
            path="history"
            element={
              <TransactionHistory getBalance={getBalance} wallet={wallet} />
            }
          />
          <Route
            path="crypto"
            element={
              <Crypto
                getBalance={getBalance}
                wallet={wallet}
                cryptoList={cryptoList}
              />
            }
          />
          <Route
            path="crypto/invest"
            element={<Invest cryptoList={cryptoList} />}
          />
          <Route
            path=":cryptoNameParam"
            element={<CryptoTab cryptoList={cryptoList} />}
          />
          <Route path="logout" element={<LogoutModal />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
