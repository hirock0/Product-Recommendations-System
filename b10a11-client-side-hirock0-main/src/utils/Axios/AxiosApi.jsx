import axios from "axios";
import swal from "sweetalert";
export const Axios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_SIDE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error) {
      localStorage.removeItem("token");
      swal({
        title: "Logout successfully",
        text: "Your session has expired. Please login again.",
        icon: "error",
        button: "Ok",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
    return Promise.reject(error);
  }
);
