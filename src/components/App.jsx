import { Route, Routes } from "react-router-dom";
import css from "./App.module.css";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

function App() {
  return (
    <div className={css.App}>
      <Routes>
        <Route path="" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;
