import { Link, Navigate } from "react-router-dom";
import css from "./LoginForm.module.css";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();

  const sendLoginRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      if (response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);

        setIsLoggedIn(true);
      }
    } catch (e) {
      console.log(e.message);
      if (e.response) {
        toast.error(e.response.data.message);
      }
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard/home" />;
  }

  return (
    <div className={css.Container}>
      <div className={css.LeftContainer}>
        <div className={css.LeftTextContainer}>
          <div className={css.LogoContainer}>
            <img alt="logo" className={css.Logo} src="./logo.png" />
            <h3 className={css.Title}>Wallet</h3>
          </div>
          <div className={css.FormContainer}>
            <h4 className={css.Header}>Welcome back!</h4>
            <p className={css.Description}>Welcome back! Please enter your details</p>
            <form className={css.Form}>
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
                maxLength={30}
                type="password"
                placeholder="••••••••"
                className={css.Input}
              />
              <button
                onClick={(e) => {
                  sendLoginRequest(e);
                }}
                className={css.SigninButton}
              >
                Sign in
              </button>
              <p className={css.SignUpText}>
                Don't have an account?
                <Link className={css.SignUpTextLink} to="/register">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className={css.RightContainer}>
        <img alt="purpleball" className={css.RightContainerImage} src="./purpleball.png" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
