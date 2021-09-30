import axios, { AxiosRequestConfig } from "axios";
import { CANCEL } from "redux-saga";

export const BASE_URL = "https://dark-2.herokuapp.com/";

export const AUTH_TOKEN = "Bearer Token";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem(AUTH_TOKEN);

  if (!token) {
    return config;
  }

  return { ...config, headers: { ...config.headers, Authorization: token } };
});

axios.interceptors.response.use(undefined, (error) => {
  console.error("error is", error);
  if (error.response?.data?.code === 9101) {
    localStorage.removeItem(AUTH_TOKEN);
    window.location.href = "/customers/login";
  }
  return Promise.reject(error);
});

axios.interceptors.response.use(undefined, (error) => {
  console.error("error is", error);
  if (error.response?.data?.code === 404) {
    localStorage.removeItem(AUTH_TOKEN);
    window.location.href = "/customers/login";
  }
  return Promise.reject(error);
});

export const get = <T>(url: string, config: AxiosRequestConfig) => {
  const source = axios.CancelToken.source();

  const response = axios.get<T>(url, { ...config, cancelToken: source.token });
  response[CANCEL] = source.cancel;
  return response;
};
