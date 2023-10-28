import { BrowserRouter, Route, Routes } from "react-router-dom";
import css from "./App.module.css";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  return (
    <div className={css.App}>
      <Routes>
        <Route path="" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
