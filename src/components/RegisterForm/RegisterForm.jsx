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
      <div className={css.LeftContainer}>
        <div className={css.LeftTextContainer}>
          <div className={css.LogoContainer}>
            <img className={css.Logo} src="./logo.png" />
            <h3 className={css.Title}>Wallet</h3>
          </div>
          <div className={css.FormContainer}>
            <form className={css.Form}>
              <p className={css.InputText}>Username</p>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Enter your email"
                className={css.Input}
              />
              <p className={css.InputText}>Email</p>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter your email"
                className={css.Input}
              />
              <p className={css.InputText}>Password</p>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="••••••••"
                className={css.Input}
              />
              <button
                onClick={(e) => {
                  sendRegisterRequest();
                  e.preventDefault();
                }}
                className={css.SigninButton}
              >
                Sign in
              </button>
              <p className={css.SignUpText}>
                Already have an account?
                <Link className={css.SignUpTextLink} to="/">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className={css.RightContainer}>
        <img className={css.RightContainerImage} src="./purpleball.png" />
      </div>
    </div>
  );
};

export default RegisterForm;
