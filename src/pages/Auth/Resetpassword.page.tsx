import { useFormik } from "formik";
import React, { FC, memo, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import * as yup from "yup";
import Input from "../../components/input";
import { login, resetPassword } from "../../api/auth";
import {
  authActions,
  resetPasswordCompleted,
} from "../../actions/auth.actions";
import { useAppSelector } from "../../store";
import { tokenSelector } from "../../selectors/auth.selectors";
import { useDispatch } from "react-redux";

interface Props {}

const ResetPassword: FC<Props> = (props) => {
  const token = useAppSelector(tokenSelector);
  const [password, setPassword] = useState(false);
  const togglePassword = () => {
    setPassword(password ? false : true);
  };
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const history = useHistory();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    resetPassword({ password: value1, passwordConfirm: value2 }, token)
      .then((c) => {
        authActions.passwordChanged(c);
        authActions.login(c);
        alert("your password has been successfully changed");
        history.push("/products");
      })
      .catch((e) => {
        alert(
          "either your passwords does not matched or you have entered an invalid token on the previous page, kindly try again."
        );
        history.push("/forgot-password");
      });
  };
  useEffect(() => {
    window.onbeforeunload = function () {
      return true;
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  useEffect(() => {
    if (token === 1) {
      alert(
        "you must've refreshed the page or came to this page directly , kindly restart the process again"
      );
      history.push("/forgot-password");
    }
  });

  return (
    <div className="flex flex-col items-center w-screen pt-8 lg:w-1/2 space-y-28">
      <div className="flex flex-col space-y-14">
        <div className="space-y-4 ">
          <h1 className="text-4xl">Reset your Password here</h1>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <div>
              <input
                className="border-2 border-black"
                // id="newPassword"
                // error={errors.password}
                // touched={touched.password}
                value={value1}
                onChange={(e) => {
                  setValue1(e.target.value);
                }}
                required
                // {...getFieldProps("password")}
                placeholder="new password"
              />
            </div>
            <div>
              <input
                // id="confirmNewPassword"
                type={password ? "text" : "password"}
                // error={errors.passwordConfirm}
                // touched={touched.passwordConfirm}
                value={value2}
                onChange={(e) => {
                  setValue2(e.target.value);
                }}
                autoComplete="off"
                required
                // {...getFieldProps("confirmPassword")}
                placeholder="confirm your password"
              />
            </div>
          </div>

          <div className="flex items-center space-x-28">
            <div className="flex items-center">
              <label>Show Password</label>
              <input onClick={togglePassword} type="checkbox" />
            </div>
            <button
              type="submit"
              // disabled={!isValid}
              className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
            >
              Reset
            </button>
            {/* <div>
              {isSubmitting && (
                <FaSpinner className="mt-5 animate-spin"></FaSpinner>
              )}
            </div> */}
          </div>
        </form>
        <div className="flex flex-col items-center space-y-5">
          <div className="flex items-center ">
            <input id="loggedin" name="Toggle button" type="checkbox" />
            <label className="switch" htmlFor="loggedin">
              Keep me logged in
            </label>
          </div>
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

ResetPassword.defaultProps = {};

export default memo(ResetPassword);
