import { useFormik } from "formik";
import React, { FC, memo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import * as yup from "yup";
import Input from "../../components/input";
import { loginAsRetailor } from "../../api/auth";
import { authActions } from "../../actions/auth.actions";
import { useAppSelector } from "../../store";
import { loadingSelector } from "../../selectors/auth.selectors";

interface Props {}

const RetailorLogin: FC<Props> = (props) => {
  const [password, setPassword] = useState(false);
  const togglePassword = () => {
    setPassword(password ? false : true);
  };

  const history = useHistory();
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
      authActions.loginBegin();
      loginAsRetailor(data)
        .then((c) => {
          authActions.login(c);
          alert("you are successfully logged in as a retailor");
          history.goBack();
        })
        .catch((e) => {
          alert(e.response.statusText);
          authActions.loginError(e.response.statusText);
        });
    },
  });

  return (
    <div className="flex flex-col items-center w-screen pt-8 lg:w-1/2 space-y-28">
      <div className="flex flex-col space-y-14">
        <div className="space-y-4 ">
          <h1 className="text-4xl">Welcome to Retailor's Login</h1>

          <div className="flex justify-start ">
            <h2>New Here?</h2>
            <Link
              to="/retailor-signup"
              className="text-blue-600 underline hover:text-red-500"
            >
              Signup as a retailor
            </Link>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <Input
              className="h-10 border-2 border-black rounded w-96"
              id="email"
              error={errors.email}
              touched={touched.email}
              required
              {...getFieldProps("email")}
              placeholder="email address"
            />

            <Input
              className="h-10 border-2 border-black rounded w-96"
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

          <div className="flex items-center space-x-28">
            <div className="flex items-center">
              <label>Show Password</label>
              <input onClick={togglePassword} type="checkbox" />
            </div>
            <button
              className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
              type="submit"
              disabled={!isValid}
            >
              RetailorLogin
            </button>
            <div>
              {loading && <FaSpinner className="mt-5 animate-spin"></FaSpinner>}
            </div>
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
  );
};

RetailorLogin.defaultProps = {};

export default memo(RetailorLogin);
