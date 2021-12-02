import { memo } from "react";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { signupAsRetailor } from "../../api/auth";

const RetailorSignup = () => {
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
        signupAsRetailor(data).then((c) => {
          history.push("/retailor-overview");
        });
      },
    });

  return (
    <div className="flex flex-col items-center pt-8 space-y-28">
      <div className="flex flex-col space-y-14">
        <div className="space-y-4 ">
          <h1 className="text-2xl text-center sm:text-4xl">
            Get started with a free Retailor's account
          </h1>

          <div className="text-center ">
            <h2>Already have a retailor's account?</h2>
            <Link
              to="/retailor-login"
              className="text-blue-600 underline hover:text-red-500"
            >
              Log In as retailor
            </Link>
          </div>
        </div>

        <form className="space-y-8 text-center" onSubmit={handleSubmit}>
          <div>
            Name:{" "}
            <input
              className="h-10 border-2 border-black rounded w-44 sm:w-96 md:w-96 lg:w-96"
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
            Email:{" "}
            <input
              className="h-10 border-2 border-black rounded w-44 sm:w-96 md:w-96 lg:w-96"
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
            Password:{" "}
            <input
              className="h-10 border-2 border-black rounded w-44 sm:w-96 md:w-96 lg:w-96"
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
            PasswordConfirm:{" "}
            <input
              className="h-10 border-2 border-black rounded w-44 sm:w-96 md:w-96 lg:w-72 xl:w-96"
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
            Address:{" "}
            <input
              className="h-10 border-2 border-black rounded w-44 sm:w-96 md:w-96 lg:w-96"
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

          <div className="flex justify-center text-center sm:items-center sm:space-x-28">
            <div className="flex items-center">
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

            <button
              className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
              type="submit"
            >
              Get started
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center space-y-5">
          <div> {isSubmitting}</div>
        </div>
      </div>
    </div>
  );
};

RetailorSignup.defaultProps = {};

export default memo(RetailorSignup);
