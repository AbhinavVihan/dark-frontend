import { memo } from "react";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";

const Signup = () => {
  const history = useHistory();
  const [password, setPassword] = useState(false);

  const togglePassword = () => {
    setPassword(password ? false : true);
  };

  const { handleSubmit, getFieldProps, touched, isSubmitting, errors } =
    useFormik({
      initialValues: {
        email: "",
        username: "",
        password: "",
      },
      validationSchema: yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
      }),
      onSubmit: (data) => {
        // dispatch(signup(data));
        history.push("/overview");
      },
    });

  return (
    <div className="flex flex-col items-center w-screen pt-8 lg:w-1/2 space-y-28">
      <div className="flex flex-col space-y-14">
        <div className="space-y-4 ">
          <h1 className="text-4xl">Get started with a free account</h1>

          <div className="flex justify-start ">
            <h2>Already have an account?</h2>
            <Link to="/login" className="text-blue-600 underline">
              Log In
            </Link>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <input
              className="border-2 border-black"
              id="email"
              type="email"
              autoComplete="email"
              {...getFieldProps("email")}
              required
              placeholder="email"
            />
          </div>

          {touched.email && <div className="text-red-500"> {errors.email}</div>}
          <div>
            <input
              className="border-2 border-black"
              id="password"
              type={password ? "text" : "password"}
              autoComplete="current-password"
              {...getFieldProps("password")}
              required
              placeholder="password"
            />
          </div>

          {touched.email && (
            <div className="text-red-500"> {errors.password}</div>
          )}

          <div className="flex items-center space-x-28">
            <div className="flex items-center">
              <label>Show Password</label>
              <input onClick={togglePassword} type="checkbox" />
            </div>

            <button className="bg-blue-600" type="submit">
              Get started
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center space-y-5">
          <div className="flex items-center justify-start">
            <input id="loggedin" name="Toggle button" type="checkbox" />
            <label className="switch" htmlFor="loggedin">
              I agree to terms and conditions
            </label>
          </div>
          <div> {isSubmitting}</div>
        </div>
      </div>
      <div className="max-w-md text-center">
        <p>
          © 2020 All Rights Reserved. DARK is a product of Designreset. Cookie
          Preferences, Privacy, and Terms.
        </p>
      </div>
    </div>
  );
};

Signup.defaultProps = {};

export default memo(Signup);
