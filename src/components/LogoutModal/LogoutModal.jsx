import { Link } from "react-router-dom";
import css from "./LogoutModal.module.css";
import api from "../../auth/api";

const LogoutModal = () => {
  const handleLogout = async () => {
    try {
      const response = await api.post("http://localhost:8000/logout");
      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={css.Backdrop}>
      <div className={css.Container}>
        <h3 className={css.Title}>Are you sure you want to log out?</h3>
        <div className={css.ButtonContainer}>
          <Link
            to="/"
            onClick={() => {
              handleLogout();
            }}
            className={css.Button}
          >
            YES
          </Link>
          <Link to="/dashboard/home" className={css.Button}>
            NO
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
