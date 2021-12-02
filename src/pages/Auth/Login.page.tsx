import { useFormik } from "formik";
import React, { FC, memo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import Input from "../../components/input";
import { login } from "../../api/auth";
import {
  loginActionBegin,
  loginActionComplete,
  LoginActionError,
  meLoginAction,
} from "../../actions/auth.actions";
import { useAppSelector } from "../../store";
import { loadingSelector } from "../../selectors/auth.selectors";
import LoadingOverlay from "react-loading-overlay-ts";
import { useDispatch } from "react-redux";

interface Props {}

const Login: FC<Props> = (props) => {
  const [password, setPassword] = useState(false);
  const togglePassword = () => {
    setPassword(password ? false : true);
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useAppSelector(loadingSelector);

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
      // authActions.loginBegin();
      login(data)
        .then((c) => {
          // authActions.login(c);
          dispatch(meLoginAction(c));
          history.goBack();
          dispatch(loginActionComplete(c));
          // history.push("/products");
        })
        .catch((e) => {
          alert(e.response.statusText);
          // authActions.loginError(e.response.statusText);
          dispatch(LoginActionError(e.response.statusText));
          console.log(e.response.statusText);
        });
      // dispatch(loginActionBegin(data));
    },
  });

  return (
    <LoadingOverlay className="h-screen " active={loading} spinner>
      <div className="flex flex-col items-center pt-8 space-y-10 ">
        <div className="flex flex-col space-y-10 ">
          <div className="space-y-4 text-center">
            <h1 className="text-xl md:text-4xl sm:text-2xl">Log In to DARK</h1>

            <div className="flex justify-center">
              <h2>New Here?</h2>
              <Link
                to="/signup"
                className="text-blue-600 underline hover:text-red-500"
              >
                Create an account
              </Link>
            </div>
            <div className="">
              <Link
                to="/retailor-login"
                className="text-blue-600 underline hover:text-red-500"
              >
                Login as Retailor
              </Link>
            </div>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="text-center">
              <Input
                className="w-56 h-10 border-2 border-black rounded sm:w-96 md:w-96 lg:w-96"
                id="email"
                error={errors.email}
                touched={touched.email}
                autoComplete="off"
                required
                {...getFieldProps("email")}
                placeholder="email address"
              />

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

            <div className="flex justify-center space-y-5 flex-co t sm:flex sm:flex-row">
              <div className="flex items-center justify-center space-x-1 text-center">
                <label htmlFor="tick" className="cursor-pointer">
                  Show Password
                </label>
                <input
                  className="cursor-pointer"
                  id="tick"
                  onClick={togglePassword}
                  type="checkbox"
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-green-800 border-2 border-black rounded hover:bg-green-900 w-28"
                  type="submit"
                  disabled={!isValid}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <div className="flex flex-col items-center ">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-red-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="text-center">
          © 2021 All Rights Reserved. DARK is a product of Designreset. Cookie
          Preferences, Privacy, and Terms.
        </div>
      </div>
    </LoadingOverlay>
  );
};

Login.defaultProps = {};

export default memo(Login);
