import css from "./TransferModal.module.css";
import api from "../../auth/api";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransferModal = ({ setIsOpenTransfer }) => {
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [email, setEmail] = useState();

  const closeModal = () => {
    setIsOpenTransfer(false);
  };

  const sendTransfer = async () => {
    try {
      const response = await api.put("http://localhost:8000/balance/transfer", {
        title: title,
        amount: amount,
        email: email,
      });
      console.log(response);
      if (response) {
        window.location.reload();
      }
    } catch (e) {
      console.log(e.message);
      if (e.response) {
        toast.error(e.response.data.message);
      }
    }
  };

  return (
    <div className={css.Backdrop}>
      <div className={css.Container}>
        <h3 className={css.Title}>Transfer money</h3>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className={css.Input}
          placeholder="Title"
        ></input>
        <input
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          className={css.Input}
          placeholder="Amount"
        ></input>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className={css.Input}
          placeholder="Email"
        ></input>
        <div className={css.ButtonContainer}>
          <button
            onClick={() => {
              sendTransfer();
              closeModal();
            }}
            className={css.Button}
          >
            YES
          </button>
          <button
            onClick={(e) => {
              closeModal();
            }}
            className={css.Button}
          >
            NO
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TransferModal;
