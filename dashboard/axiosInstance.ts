import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:9000/",
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config:any) => {
    const token = localStorage.getItem("__auth"); // or get it from another source
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  }
);
