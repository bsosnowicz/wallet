import { Link } from "react-router-dom";
import css from "./LoginForm.module.css";

const LoginForm = () => {
  return (
    <div className={css.Container}>
      <form className={css.Form}>
        <h3 className={css.Header}>Wallet</h3>
        <input className={css.Input} />
        <input className={css.Input} />
        <button className={css.Button}>LOG IN</button>
        <Link to="/register" classname={css.Button}>
          REGISTER
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
