import { Route, Routes } from "react-router-dom";
import css from "./App.module.css";
import LoginForm from "./LoginForm/LoginForm";

function App() {
  return (
    <div className={css.App}>
      <Routes>
        <Route path="" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;
