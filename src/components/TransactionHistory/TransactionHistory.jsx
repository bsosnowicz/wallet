import { useEffect, useState } from "react";
import css from "./TransactionHistory.module.css";
import api from "../../auth/api";

const TransactionHistory = ({ wallet, getBalance }) => {
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

  return (
    <div>
      <h3 className={css.Title}>Transaction History</h3>
      <div className={css.Container}>
        <ul className={css.List}>
          {wallet ? (
            wallet.transactionHistory.map((item) => (
              <li className={css.Item}>
                <div className={css.ItemContainer}>
                  {item.type === "Deposit" ? (
                    <svg className={css.Icon} width="24" height="24">
                      <use href="../../../icons.svg#plus"></use>
                    </svg>
                  ) : (
                    <svg className={css.Icon} width="24" height="24">
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
                <div className={css.AmountContainer}>
                  {item.type === "Deposit" ? <p>+</p> : <p>-</p>}
                  <p className={css.Amount}>{item.amount}$</p>
                </div>
              </li>
            ))
          ) : (
            <li>N/A</li>
          )}
        </ul>
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
