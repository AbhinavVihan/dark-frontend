import { memo } from "react";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { signup } from "../../api/auth";

const Signup = () => {
  const history = useHistory();
  const [password, setPassword] = useState(false);

  const togglePassword = () => {
    setPassword(password ? false : true);
  };

  const { handleSubmit, getFieldProps, touched, isSubmitting, errors } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        address: "",
      },
      validationSchema: yup.object().shape({
        name: yup.string().required(),
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
        passwordConfirm: yup.string().required().min(8),
        address: yup.string().required(),
      }),
      onSubmit: (data) => {
        signup(data);
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
            <Link
              to="/login"
              className="text-blue-600 underline hover:text-red-500"
            >
              Log In
            </Link>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            name:{" "}
            <input
              className="border-2 border-black"
              id="name"
              type="name"
              autoComplete="name"
              {...getFieldProps("name")}
              required
              placeholder="name"
            />
          </div>
          {touched.name && <div className="text-red-500"> {errors.name}</div>}

          <div>
            email:{" "}
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
            password:{" "}
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

          <div>
            passwordConfirm:{" "}
            <input
              className="border-2 border-black"
              id="passwordConfirm"
              type="password"
              autoComplete="off"
              {...getFieldProps("passwordConfirm")}
              required
              placeholder="passwordConfirm"
            />
          </div>
          {touched.passwordConfirm && (
            <div className="text-red-500"> {errors.passwordConfirm}</div>
          )}

          <div>
            address:{" "}
            <input
              className="border-2 border-black"
              id="address"
              type="address"
              autoComplete="off"
              {...getFieldProps("address")}
              required
              placeholder="address"
            />
          </div>
          {touched.address && (
            <div className="text-red-500"> {errors.address}</div>
          )}

          <div className="flex items-center space-x-28">
            <div className="flex items-center">
              <label>Show Password</label>
              <input onClick={togglePassword} type="checkbox" />
            </div>

            <button
              className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
              type="submit"
            >
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
