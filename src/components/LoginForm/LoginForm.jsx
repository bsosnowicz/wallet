import css from "./LoginForm.module.css";

const LoginForm = () => {
  return (
    <div className={css.Container}>
      <form className={css.Form}>
        <h3 className={css.Header}>Wallet</h3>
        <input className={css.Input} />
        <input className={css.Input} />
        <button className={css.Button}>LOG IN</button>
        <button className={css.Button}>REGISTER</button>
      </form>
    </div>
  );
};

export default LoginForm;
