import axios from "axios";
import css from "./RegisterForm.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const RegisterForm = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const sendRegisterRequest = async () => {
    try {
      const response = await axios.post("http://localhost:8000/register", {
        username: username,
        email: email,
        password: password,
      });
      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={css.Container}>
      <form className={css.Form}>
        <h3 className={css.Header}>Wallet</h3>
        <input
          onChange={(e) => setUsername(e.target.value)}
          className={css.Input}
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          className={css.Input}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className={css.Input}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            sendRegisterRequest();
          }}
          className={css.Button}
        >
          REGISTER
        </button>
        <Link classname={css.Button}>REGISTER</Link>
      </form>
    </div>
  );
};

export default RegisterForm;
