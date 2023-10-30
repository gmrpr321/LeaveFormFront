import axios from "axios";

const axiosInterceptorInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/LeaveOD",
});

axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    const data = localStorage.getItem("token");
    if (data) {
      const accessToken = JSON.parse(data);
      if (accessToken) {
        if (config.headers) config.headers.token = accessToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
