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

interface forgotPasswordRequest {
  email: string;
}

interface SignupRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  address: string;
}

interface LoginResponse {
  status: string;
  token: string;
  doc: Customer;
}

interface ForgotPasswordResponse {
  status: string;
  message: string;
}

interface SignupResponse {
  status: string;
  token: string;
  doc: Customer;
}

export const login = (data: LoginRequest) => {
  const url = BASE_URL + "/customers/login";

  return axios.post<LoginResponse>(url, data).then((response) => {
    localStorage.setItem(AUTH_TOKEN, "Bearer " + response.data.token);
    console.log(response.data.doc);
    return response.data.doc;
  });
};

export const forgotPassword = (data: forgotPasswordRequest) => {
  const url = BASE_URL + "/customers/forgotPassword";

  return axios.post<ForgotPasswordResponse>(url, data).then((response) => {
    console.log(response.data.message);
    return response.data.message;
  });
};

export const signup = (data: SignupRequest) => {
  const url = BASE_URL + "/customers/signup";

  return axios.post<SignupResponse>(url, data).then((response) => {
    console.log(response.data);
    return response.data;
  });
};

// export const logout = () => {
//   localStorage.removeItem(AUTH_TOKEN);
// };

export const logout = () => {
  const url = BASE_URL + "/customers/logout";

  localStorage.removeItem(AUTH_TOKEN);
  return axios.get(url);
};

interface MeResponse {
  status: string;
  doc: Customer;
}

export const me = () => {
  const url = BASE_URL + "/customers/me";

  return axios
    .get<MeResponse>(url, { headers: { Authorization: AUTH_TOKEN } })
    .then((response) => {
      console.log(response.data.doc);
      return response.data.doc;
    });
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
