import axios from "axios";
import { Customer } from "../models/Customer";
import { AUTH_TOKEN, BASE_URL } from "./base";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  status: string;
  token: string;
  doc: Customer;
}

export const login = (data: LoginRequest) => {
  const url = BASE_URL + "/customers/login";

  return axios.post<LoginResponse>(url, data).then((response) => {
    localStorage.setItem(AUTH_TOKEN, response.data.token);
    return response.data.doc;
  });
};

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

interface MeResponse {
  doc: Customer;
}

export const me = () => {
  const url = BASE_URL + "/customers/me";

  return axios.get<MeResponse>(url).then((response) => response.data.doc);
};

interface updateRequest {
  name: string;
  email: string;
  address: string;
}

export const updateMe = (id: string, data: updateRequest) => {
  const url = BASE_URL + "/customers/" + id;
  return axios.patch(url).then((response) => response.data.doc);
};
