import { useEffect, useState } from "react";
import api from "../../auth/api";
import css from "./Dashboard.module.css";
import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";
import { Route, Routes } from "react-router-dom";
import Modal from "../Modal/Modal";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import LogoutModal from "../LogoutModal/LogoutModal";

const Dashboard = () => {
  const [wallet, setWallet] = useState();

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
  useEffect(() => {
    getBalance();
    console.log(wallet);
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
          <Route path="logout" element={<LogoutModal />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
