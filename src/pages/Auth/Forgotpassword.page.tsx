import { useFormik } from "formik";
import React, { FC, memo } from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import * as yup from "yup";
import Input from "../../components/input";

interface Props {}

const ForgotPassword: FC<Props> = (props) => {
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
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().email(),
    }),
    onSubmit: (data, helpers) => {
      console.log("form submitting", data);

      setTimeout(() => {
        console.log(
          "We have sent a link to reset your password in your inbox, please check spam folder also"
        );
        helpers.setSubmitting(false);
        // history.push("/overview");
      }, 5000);
    },
  });

  return (
    <div className="flex flex-col items-center w-screen pt-8 lg:w-1/2 space-y-28">
      <div className="flex flex-col space-y-14">
        <div className="space-y-4 ">
          <h1 className="text-4xl">
            FORGOT YOUR PASSWORD, No Worries, RESET IT HERE
          </h1>

          <div className="flex justify-start ">
            <h2>New Here?</h2>
            <Link to="/signup" className="text-blue-600 underline">
              Create an account
            </Link>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <Input
              className="border-2 border-black"
              id="email"
              error={errors.email}
              touched={touched.email}
              required
              {...getFieldProps("email")}
              placeholder="email address"
            />
          </div>

          <div className="flex items-center space-x-28">
            <button type="submit" disabled={!isValid}>
              {" "}
              Submit
            </button>
            <div>
              {isSubmitting && (
                <FaSpinner className="mt-5 animate-spin"></FaSpinner>
              )}
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

ForgotPassword.defaultProps = {};

export default memo(ForgotPassword);
