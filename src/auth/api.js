import axios from "axios";

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: "http://localhost:8000",
  });

  const token = localStorage.getItem("token");

  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return instance;
};

export default createAxiosInstance();
