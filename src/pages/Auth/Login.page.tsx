import { useFormik } from "formik";
import React, { FC, memo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import * as yup from "yup";

interface Props {}

const Login: FC<Props> = (props) => {
  const [password, setPassword] = useState(false);
  const togglePassword = () => {
    setPassword(password ? false : true);
  };

  const history = useHistory();

  const myForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: (data, helpers) => {
      console.log("form submitting", data);

      setTimeout(() => {
        console.log("form submitted successfully");
        helpers.setSubmitting(false);
        history.push("overview");
      }, 5000);
    },
  });

  return (
    <div className="flex flex-col items-center w-screen pt-8 lg:w-1/2 space-y-28">
      <div className="flex flex-col space-y-14">
        <div className="space-y-4 ">
          <h1 className="text-4xl">Log In to DARK</h1>

          <div className="flex justify-start ">
            <h2>New Here?</h2>
            <Link to="/signup" className="text-blue-600 underline">
              Create an account
            </Link>
          </div>
        </div>

        <form className="space-y-8" onSubmit={myForm.handleSubmit}>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              className="border-2 border-black"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={myForm.values.email}
              required
              placeholder="email"
              onChange={myForm.handleChange}
              onBlur={myForm.handleBlur}
            />
            {/* <Input
              id="email"
              error={errors.email}
              touched={touched.email}
              required
              {...getFieldProps("email")}
              placeholder="email address"
            /> */}
          </div>
          {myForm.touched.email && (
            <div className="text-red-500">{myForm.errors.email}</div>
          )}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              className="border-2 border-black"
              id="password"
              name="password"
              type={password ? "text" : "password"}
              autoComplete="current-password"
              value={myForm.values.password}
              required
              placeholder="password"
              onChange={myForm.handleChange}
              onBlur={myForm.handleBlur}
            />

            {/* <Input
              id="password"
              type={password ? "text" : "password"}
              error={errors.password}
              touched={touched.password}
              autoComplete="off"
              required
              {...getFieldProps("password")}
              placeholder="password"
            /> */}
          </div>
          {myForm.touched.password && (
            <div className="text-red-500">{myForm.errors.password}</div>
          )}

          <div className="flex items-center space-x-28">
            <div className="flex items-center">
              <label>Show Password</label>
              <input onClick={togglePassword} type="checkbox" />
            </div>
            <button type="submit"> Log in</button>
            <div>
              {myForm.isSubmitting && (
                <FaSpinner className="mt-5 animate-spin"></FaSpinner>
              )}
            </div>
            {/* <Button type="submit" disabled={!isValid}>
              Log in
            </Button> */}
          </div>
        </form>
        <div className="flex flex-col items-center space-y-5">
          <div className="flex items-center ">
            <input id="loggedin" name="Toggle button" type="checkbox" />
            <label className="switch" htmlFor="loggedin">
              Keep me logged in
            </label>
          </div>

          <Link to="/forgot-password" className="text-blue-600">
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
