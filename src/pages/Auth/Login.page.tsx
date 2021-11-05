import { useFormik } from "formik";
import React, { FC, memo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import * as yup from "yup";
import Input from "../../components/input";
import { login } from "../../api/auth";
import { authActions } from "../../actions/auth.actions";

interface Props {}

const Login: FC<Props> = (props) => {
  const [password, setPassword] = useState(false);
  const togglePassword = () => {
    setPassword(password ? false : true);
  };

  const history = useHistory();

  const {
    handleSubmit,
    getFieldProps,
    isValid,
    touched,
    isSubmitting,
    errors,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: (data) => {
      login(data).then((c) => {
        authActions.login(c);
        history.push("/products");
      });
    },
  });

  return (
    <div className="flex flex-col items-center w-screen pt-8 lg:w-1/2 space-y-28">
      <div className="flex flex-col space-y-14">
        <div className="space-y-4 ">
          <h1 className="text-4xl">Log In to DARK</h1>

          <div className="flex justify-start ">
            <h2>New Here?</h2>
            <Link
              to="/signup"
              className="text-blue-600 underline hover:text-red-500"
            >
              Create an account
            </Link>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            {/* <input
              className="border-2 border-black"
              id="email"
              type="email"
              autoComplete="email"
              {...getFieldProps("email")}
              required
              placeholder="email"
            /> */}
            <Input
              className="border-2 border-black"
              id="email"
              error={errors.email}
              touched={touched.email}
              required
              {...getFieldProps("email")}
              placeholder="email address"
            />

            <Input
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
              className="hover:text-red-500"
              type="submit"
              disabled={!isValid}
            >
              {" "}
              Log in
            </button>
            <div>
              {isSubmitting && (
                <FaSpinner className="mt-5 animate-spin"></FaSpinner>
              )}
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

Login.defaultProps = {};

export default memo(Login);
