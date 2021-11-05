import { useFormik } from "formik";
import React, { FC, memo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import * as yup from "yup";
import input from "../../components/input";
import { loggedinResetResetPassword } from "../../api/auth";
import { authActions } from "../../actions/auth.actions";
import { useAppSelector } from "../../store";
import { loadingSelector } from "../../selectors/auth.selectors";

interface Props {}

const LoggedinResetPassword: FC<Props> = (props) => {
  const loading = useAppSelector(loadingSelector);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loggedinResetResetPassword({
      passwordCurrent: value1,
      password: value2,
      passwordConfirm: value3,
    })
      .then((c) => {
        authActions.loggedinPasswordChangeCompleted();
        authActions.login(c);
        alert("your password has been successfully changed");
      })
      .catch((e) => {
        alert(
          "you must've entered mismatched passwords or your current password is wrong, kindly try again"
        );
        window.location.href = "/my-account";
      });
  };

  return (
    <div className="flex flex-col items-center w-screen pt-8 lg:w-1/2 space-y-28">
      <div className="flex flex-col space-y-14">
        <div className="space-y-4 ">
          <h1 className="text-4xl">Change your Password</h1>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <input
              className="border-2 border-black"
              id="text"
              value={value1}
              type="password"
              onChange={(e) => {
                setValue1(e.target.value);
              }}
              required
              placeholder="Current Password"
            />
          </div>
          <div>
            <input
              className="border-2 border-black"
              id="text"
              value={value2}
              onChange={(e) => {
                setValue2(e.target.value);
              }}
              required
              placeholder="Password"
            />
          </div>
          <div>
            <input
              className="border-2 border-black"
              id="password"
              type="password"
              value={value3}
              onChange={(e) => {
                setValue3(e.target.value);
              }}
              required
              placeholder="Confirm your password"
            />
          </div>

          <div className="flex items-center space-x-28">
            <button className="hover:text-red-500" type="submit">
              {" "}
              Submit
            </button>
            <div>
              {loading && <FaSpinner className="mt-5 animate-spin"></FaSpinner>}
            </div>
          </div>
        </form>
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

LoggedinResetPassword.defaultProps = {};

export default memo(LoggedinResetPassword);
