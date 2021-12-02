import { useFormik } from "formik";
import React, { FC, memo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import Input from "../../components/input";
import { loginAsRetailor } from "../../api/auth";
import {
  LoginActionError,
  meLoginAction,
  RetailorLoginActionBegin,
} from "../../actions/auth.actions";
import { useAppSelector } from "../../store";
import { loadingSelector } from "../../selectors/auth.selectors";
import LoadingOverlay from "react-loading-overlay-ts";
import { useDispatch } from "react-redux";
import { retailorLoginLoadingSelector } from "../../selectors/customer.selectors";

interface Props {}

const RetailorLogin: FC<Props> = (props) => {
  const loading = useAppSelector(retailorLoginLoadingSelector);
  const dispatch = useDispatch();
  const [password, setPassword] = useState(false);
  const togglePassword = () => {
    setPassword(password ? false : true);
  };

  const history = useHistory();
  // const loading = useAppSelector(loadingSelector);

  const { handleSubmit, getFieldProps, isValid, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: (data) => {
      // authActions.loginBegin(data);
      loginAsRetailor(data)
        .then((c) => {
          dispatch(meLoginAction(c));
          // authActions.login(c);
          alert("you are successfully logged in as a retailor");
          history.goBack();
        })
        .catch((e) => {
          alert(e.response.statusText);
          // authActions.loginError(e.response.statusText);
          dispatch(LoginActionError(e.response.statusText));
        });
      // dispatch(RetailorLoginActionBegin(data));
    },
  });

  return (
    <LoadingOverlay className="h-screen " active={loading} spinner>
      <div className="flex flex-col items-center pt-8 space-y-28">
        <div className="flex flex-col space-y-14">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl">Welcome to Retailor's Login</h1>

            <div className="text-center ">
              <h2>New Here?</h2>
              <Link
                to="/retailor-signup"
                className="text-blue-600 underline hover:text-red-500"
              >
                Signup as a retailor
              </Link>
            </div>
          </div>

          <form
            className="space-y-5 text-center lg:flex-col md:flex md:flex-col lg:flex"
            onSubmit={handleSubmit}
          >
            <div>
              <Input
                className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                id="email"
                error={errors.email}
                touched={touched.email}
                required
                {...getFieldProps("email")}
                placeholder="email address"
              />
            </div>
            <div>
              <Input
                className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                id="password"
                type={password ? "text" : "password"}
                error={errors.password}
                touched={touched.password}
                autoComplete="off"
                required
                {...getFieldProps("password")}
                placeholder="password"
              />
            </div>

            <div className="flex justify-center text-center sm:items-center sm:space-x-28">
              <div className="flex items-center">
                <label className="cursor-pointer" htmlFor="tick">
                  Show Password
                </label>
                <input
                  className="cursor-pointer"
                  id="tick"
                  onClick={togglePassword}
                  type="checkbox"
                />
              </div>
              <button
                className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
                type="submit"
                disabled={!isValid}
              >
                RetailorLogin
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center space-y-5">
            <div className="flex items-center ">
              <input id="loggedin" name="Toggle button" type="checkbox" />
              <label className="switch" htmlFor="loggedin">
                Keep me logged in
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-red-500"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="max-w-md text-center">
          <p>
            © 2021 All Rights Reserved. DARK is a product of Designreset. Cookie
            Preferences, Privacy, and Terms.
          </p>
        </div>
      </div>
    </LoadingOverlay>
  );
};

RetailorLogin.defaultProps = {};

export default memo(RetailorLogin);
