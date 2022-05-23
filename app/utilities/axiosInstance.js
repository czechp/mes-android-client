import axios from "axios";
import { encode as btoa } from "base-64";

import systemConfiguration from "../configuration/systemConfiguration";
import { BACKEND_URL } from "../constants/URL";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

export const configureInterceptors = () => {
  axiosInstance.interceptors.request.use((config) => {
    const authToken =
      "Basic " +
      btoa(
        systemConfiguration.username.value +
          ":" +
          systemConfiguration.password.value
      );
    config.headers.Authorization = authToken;
    return config;
  });
};

export const uninterceptedAxiosInstance = () =>
  axios.create({
    baseURL: BACKEND_URL,
  });

export default axiosInstance;
