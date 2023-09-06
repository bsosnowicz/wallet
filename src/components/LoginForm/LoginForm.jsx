import { Link, useNavigate } from "react-router-dom";
import css from "./LoginForm.module.css";
import axios from "axios";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const sendLoginRequest = async () => {
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email: email,
        password: password,
      });
      console.log(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={css.Container}>
      <form className={css.Form}>
        <h3 className={css.Header}>Wallet</h3>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className={css.Input}
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          className={css.Input}
        />
        <button
          onClick={(e) => {
            sendLoginRequest();
            e.preventDefault();
          }}
          className={css.Button}
        >
          LOG IN
        </button>
        <Link to="/register" classname={css.Button}>
          REGISTER
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
