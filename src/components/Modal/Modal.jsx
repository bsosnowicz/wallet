import { useState } from "react";
import css from "./Modal.module.css";
import api from "../../auth/api";

const Modal = ({
  setIsOpen,
  setTransactionType,
  transactionType,
  setDisplayNotification,
  handleNotification,
}) => {
  const [transactionAmount, setTransactionAmount] = useState();
  const [title, setTitle] = useState();

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSliderClick = () => {
    setTransactionType((prevType) =>
      prevType === "deposit" ? "withdraw" : "deposit"
    );
  };

  const depositBalance = async () => {
    try {
      const response = await api.put("http://localhost:8000/balance/deposit", {
        amount: transactionAmount,
        title: title,
      });
      console.log(response);
      if (response) {
        window.location.reload();
        setDisplayNotification(false);
      }
    } catch (e) {
      console.log(e.message);
      handleNotification(e.response.data.message);
    }
  };

  const withdrawBalance = async () => {
    try {
      const response = await api.put("http://localhost:8000/balance/withdraw", {
        amount: transactionAmount,
        title: title,
      });
      console.log(response);
      if (response) {
        setDisplayNotification(false);
        window.location.reload();
      }
    } catch (e) {
      console.log(e.message);
      if (e.response) {
        setDisplayNotification(true);
        handleNotification(e.response.data.message);
      }
    }
  };

  return (
    <div className={css.Backdrop}>
      <div className={css.Container}>
        <h3 className={css.Title}>Add transaction</h3>
        {transactionType === "deposit" ? (
          <div className={css.Slider}>
            <p
              className={css.SliderText}
              style={{ fontWeight: "700", color: "#5a358a" }}
            >
              Deposit
            </p>
            <div
              className={css.SliderBallContainer}
              onClick={() => handleSliderClick()}
            >
              <svg
                style={{
                  transition:
                    "transform 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)",
                }}
                className={css.SliderBallIcon}
                width="20"
                height="20"
              >
                <use href="../../../icons.svg#plus"></use>
              </svg>
            </div>
            <p className={css.SliderText}>Withdraw</p>
          </div>
        ) : (
          <div className={css.Slider}>
            <p className={css.SliderText}>Deposit</p>
            <div
              className={css.SliderBallContainer}
              onClick={() => handleSliderClick()}
            >
              <svg
                style={{
                  transform: `translateX(100%)`,
                  transition:
                    "transform 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)",
                }}
                className={css.SliderBallIcon}
                width="20"
                height="20"
              >
                <use href="../../../icons.svg#minus"></use>
              </svg>
            </div>
            <p
              className={css.SliderText}
              style={{ fontWeight: "700", color: "#5a358a" }}
            >
              Withdraw
            </p>
          </div>
        )}

        <input
          onChange={(e) => {
            const title = e.target.value;
            setTitle(title);
          }}
          placeholder="Title"
          className={css.Input}
        />
        <input
          onChange={(e) => {
            const inputValue = parseInt(e.target.value);
            setTransactionAmount(inputValue);
          }}
          placeholder="0.00"
          className={css.Input}
          maxLength={5}
        />
        {transactionType === "deposit" ? (
          <button
            onClick={() => {
              depositBalance();
              closeModal();
            }}
            className={css.Button}
          >
            Deposit
          </button>
        ) : (
          <button
            onClick={() => {
              withdrawBalance();
              closeModal();
            }}
            className={css.Button}
          >
            Withdraw
          </button>
        )}

        <button
          onClick={() => {
            closeModal();
          }}
          className={css.Button}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
