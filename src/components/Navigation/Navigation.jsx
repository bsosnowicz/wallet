import { useEffect, useState } from "react";
import api from "../../auth/api";
import css from "./Navigation.module.css";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [userDetails, setUserDetails] = useState();
  const [currentLocation, setCurrentLocation] = useState();

  const location = useLocation();

  const getUser = async () => {
    try {
      const response = await api.get("http://localhost:8000");
      setUserDetails(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getUser();
    setCurrentLocation(location.pathname);
  }, [location]);

  return (
    <div className={css.Container}>
      <p className={css.Username}>
        Hi, {userDetails ? `${userDetails.username}` : "N/A"}
      </p>
      <div className={css.NavContainer}>
        <Link
          className={css.Link}
          style={
            currentLocation === "/dashboard/home"
              ? { color: "#5a358a", backgroundColor: "#ffff" }
              : {}
          }
          to="home"
        >
          <svg
            style={
              currentLocation === "/dashboard/home" ? { fill: "#5a358a" } : {}
            }
            className={css.Icon}
            width="24"
            height="24"
          >
            <use href="../../../icons.svg#home"></use>
          </svg>
          Home
        </Link>
        <Link
          className={css.Link}
          style={
            currentLocation === "/dashboard/history"
              ? { color: "#5a358a", backgroundColor: "#ffff" }
              : {}
          }
          to="history"
        >
          <svg
            style={
              currentLocation === "/dashboard/history"
                ? { fill: "#5a358a" }
                : {}
            }
            className={css.Icon}
            width="24"
            height="24"
          >
            <use href="../../../icons.svg#history"></use>
          </svg>
          Transaction History
        </Link>
        <Link
          className={css.Link}
          style={
            currentLocation === "/dashboard/logout"
              ? { color: "#5a358a", backgroundColor: "#ffff" }
              : {}
          }
          to="/dashboard/logout"
        >
          <svg
            style={
              currentLocation === "/dashboard/logout" ? { fill: "#5a358a" } : {}
            }
            className={css.Icon}
            width="24"
            height="24"
          >
            <use href="../../../icons.svg#logout"></use>
          </svg>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
