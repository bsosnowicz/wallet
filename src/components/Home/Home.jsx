import { useEffect, useState } from "react";
import css from "./Home.module.css";
import api from "../../auth/api";
import Modal from "../Modal/Modal";

const Home = ({ wallet, getBalance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("deposit");

  const clearHistory = async () => {
    try {
      const response = await api.put(
        "http://localhost:8000/balance/clearhistory"
      );
      getBalance();
      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div>
      <h3 className={css.Title}>Home</h3>
      <div className={css.Container}>
        <p className={css.Balance}>{wallet ? `${wallet.balance}` : `N/A`} $</p>
        <p className={css.Currency}>Dollar</p>
        <div className={css.TransactionMenu}>
          <button
            onClick={() => {
              setTransactionType("deposit");
              setIsOpen(true);
            }}
            className={css.TransactionMenuButton}
          >
            <svg className={css.Icon} width="24" height="24">
              <use href="../../../icons.svg#plus"></use>
            </svg>
            Deposit
          </button>
          <button
            onClick={() => {
              setTransactionType("withdraw");
              setIsOpen(true);
            }}
            className={css.TransactionMenuButton}
          >
            <svg className={css.Icon} width="24" height="24">
              <use href="../../../icons.svg#minus"></use>
            </svg>
            Withdraw
          </button>
          <button className={css.TransactionMenuButton}>
            <svg className={css.Icon} width="24" height="24">
              <use href="../../../icons.svg#arrow"></use>
            </svg>
            Transfer
          </button>
        </div>
        <div className={css.TransactionHistory}>
          <p className={css.TransactionHistoryText}>Transactions</p>
          <ul className={css.TransactionHistoryList}>
            {wallet ? (
              wallet.transactionHistory.slice(-3).map((item) => (
                <li className={css.TransactionHistoryItem}>
                  <div className={css.TransactionHistoryContainer}>
                    {item.type === "Deposit" ? (
                      <svg
                        className={css.TransactionHistoryIcon}
                        width="24"
                        height="24"
                      >
                        <use href="../../../icons.svg#plus"></use>
                      </svg>
                    ) : (
                      <svg
                        className={css.TransactionHistoryIcon}
                        width="24"
                        height="24"
                      >
                        <use href="../../../icons.svg#minus"></use>
                      </svg>
                    )}

                    <div>
                      <h5>
                        {item.type} || {item.title}
                      </h5>
                      <p>{item.date}</p>
                    </div>
                  </div>
                  <div className={css.TransactionHistoryAmountContainer}>
                    {item.type === "Deposit" ? <p>+</p> : <p>-</p>}
                    <p className={css.TransactionHistoryAmount}>
                      {item.amount}$
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li>N/A</li>
            )}
          </ul>
        </div>
        {wallet && wallet.transactionHistory.length > 0 ? (
          <p
            onClick={() => {
              clearHistory();
            }}
            className={css.ClearHistory}
          >
            Clear History
          </p>
        ) : (
          ""
        )}
      </div>
      {isOpen ? (
        <Modal
          setIsOpen={setIsOpen}
          setTransactionType={setTransactionType}
          transactionType={transactionType}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
