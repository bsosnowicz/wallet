import { useEffect, useState } from "react";
import css from "./Home.module.css";
import api from "../../auth/api";
import Modal from "../Modal/Modal";
import TransferModal from "../TransferModal/TransferModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({ wallet, getBalance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTransfer, setIsOpenTransfer] = useState(false);
  const [isOpenTransactionHistory, setisOpenTransactionHistory] = useState(false);
  const [transactionType, setTransactionType] = useState("deposit");
  const [displayNotification, setDisplayNotification] = useState(false);

  const clearHistory = async () => {
    try {
      const response = await api.put("http://localhost:8000/balance/clearhistory");
      console.log(response);
      getBalance();
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleTransactionHistoryModal = async (e) => {
    setisOpenTransactionHistory(true);
  };

  const handleNotification = (message) => {
    toast.error(message);
    setDisplayNotification(false);
  };

  useEffect(() => {
    getBalance();
  }, []);

  useEffect(() => {
    handleNotification();
  }, [handleNotification]);

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
            <svg className={css.Icon} width="16" height="16">
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
            <svg className={css.Icon} width="16" height="16">
              <use href="../../../icons.svg#minus"></use>
            </svg>
            Withdraw
          </button>
          <button
            onClick={() => {
              setIsOpenTransfer(true);
            }}
            className={css.TransactionMenuButton}
          >
            <svg className={css.Icon} width="16" height="16">
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
                <li
                  className={css.TransactionHistoryItem}
                  onClick={(e) => handleTransactionHistoryModal(e)}
                >
                  <div className={css.TransactionHistoryContainer}>
                    {item.type === "Withdraw" ? (
                      <svg className={css.TransactionHistoryIcon} width="16" height="16">
                        <use href="../../../icons.svg#minus"></use>
                      </svg>
                    ) : item.type === "Deposit" ? (
                      <svg className={css.TransactionHistoryIcon} width="16" height="16">
                        <use href="../../../icons.svg#plus"></use>
                      </svg>
                    ) : item.type === "Transfer received" ? (
                      <svg className={css.TransactionHistoryIcon} width="16" height="16">
                        <use href="../../../icons.svg#arrow-left"></use>
                      </svg>
                    ) : item.type === "Transfer sent" ? (
                      <svg className={css.TransactionHistoryIcon} width="16" height="16">
                        <use href="../../../icons.svg#arrow"></use>
                      </svg>
                    ) : (
                      ""
                    )}

                    <div>
                      <h5>
                        {item.type} || {item.title}
                      </h5>
                      <p>{item.date}</p>
                    </div>
                  </div>
                  {item.title === "Account registered!" ? (
                    ""
                  ) : (
                    <div className={css.TransactionHistoryAmountContainer}>
                      {item.type === "Withdraw" || item.type === "Transfer sent" ? (
                        <p>-</p>
                      ) : item.type === "Deposit" || item.type === "Transfer received" ? (
                        <p>+</p>
                      ) : (
                        ""
                      )}
                      <p className={css.TransactionHistoryAmount}>${item.amount}</p>
                    </div>
                  )}
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
          wallet={wallet}
          setDisplayNotification={setDisplayNotification}
          handleNotification={handleNotification}
        />
      ) : (
        ""
      )}
      {isOpenTransfer ? <TransferModal setIsOpenTransfer={setIsOpenTransfer} /> : ""}
      <ToastContainer />
    </div>
  );
};

export default Home;
