import Axios, { InternalAxiosRequestConfig } from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8000",
});

const setAccessToken = (config) => {
  const accessToken = localStorage.getItem("token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

axios.interceptors.request.use(setAccessToken);

export default axios;
