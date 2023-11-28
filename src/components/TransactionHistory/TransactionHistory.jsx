import { useState } from "react";
import css from "./TransactionHistory.module.css";
import api from "../../auth/api";
import formatDate from "../../utils/dateUtils";

const TransactionHistory = ({ wallet, getBalance }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const clearHistory = async () => {
    try {
      const response = await api.put("http://localhost:8000/balance/clearhistory");
      console.log(response);
      getBalance();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <h3 className={css.Title}>Transaction History</h3>
      <div className={css.Container}>
        <ul className={css.List}>
          {wallet ? (
            wallet.transactionHistory.slice(startIndex, endIndex).map((item) => (
              <li className={css.Item}>
                <div className={css.ItemContainer}>
                  {item.type === "Withdraw" ? (
                    <svg className={css.Icon} width="16" height="16">
                      <use href="../../../icons.svg#minus"></use>
                    </svg>
                  ) : item.type === "Deposit" ? (
                    <svg className={css.Icon} width="16" height="16">
                      <use href="../../../icons.svg#plus"></use>
                    </svg>
                  ) : item.type === "Transfer received" ? (
                    <svg className={css.Icon} width="16" height="16">
                      <use href="../../../icons.svg#arrow-left"></use>
                    </svg>
                  ) : item.type === "Transfer sent" ? (
                    <svg className={css.Icon} width="16" height="16">
                      <use href="../../../icons.svg#arrow"></use>
                    </svg>
                  ) : (
                    ""
                  )}

                  <div>
                    <h5>
                      {item.type} || {item.title}
                    </h5>
                    <p>{formatDate(item.date)}</p>
                  </div>
                </div>
                {item.title === "Account registered!" ? (
                  ""
                ) : (
                  <div className={css.AmountContainer}>
                    {item.type === "Withdraw" || item.type === "Transfer sent" ? (
                      <p>-</p>
                    ) : item.type === "Deposit" || item.type === "Transfer received" ? (
                      <p>+</p>
                    ) : (
                      ""
                    )}
                    <p className={css.Amount}>${item.amount}</p>
                  </div>
                )}
              </li>
            ))
          ) : (
            <li>N/A</li>
          )}
        </ul>
        <div>
          <div className={css.ButtonContainer}>
            <button
              className={css.Button}
              onClick={() => {
                const totalPages = Math.ceil(wallet.transactionHistory.length);
                if (currentPage < totalPages) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              disabled={!wallet || currentPage === 1}
            >
              Previous page
            </button>
            <button
              className={css.Button}
              onClick={() => {
                const totalPages = Math.ceil(wallet.transactionHistory.length);
                if (currentPage < totalPages) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              disabled={
                !wallet ||
                currentPage === Math.ceil(wallet.transactionHistory.length / itemsPerPage)
              }
            >
              Next page
            </button>
          </div>
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
    </div>
  );
};

export default TransactionHistory;
