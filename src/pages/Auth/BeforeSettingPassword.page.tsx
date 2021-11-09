import { useFormik } from "formik";
import React, { FC, memo } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import * as yup from "yup";
import Input from "../../components/input";
import { authActions } from "../../actions/auth.actions";

interface Props {}

const BeforeSettingPassword: FC<Props> = (props) => {
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
      token: "",
    },
    validationSchema: yup.object().shape({
      token: yup.string().required(),
    }),
    onSubmit: (data) => {
      authActions.password(data);
      history.push("/resetPassword");
    },
  });

  return (
    <div className="flex flex-col items-center w-screen pt-8 lg:w-1/2 space-y-28">
      <div className="flex flex-col space-y-14">
        <div className="space-y-4 ">
          <h1 className="text-4xl">Enter your token here</h1>
        </div>
        <div className="flex justify-start ">
          <h2>New Here?</h2>
          <Link to="/signup" className="text-blue-600 underline">
            Create an account
          </Link>
        </div>
        <div>
          <Link to="/login" className="text-blue-600 underline">
            Login to your account
          </Link>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <Input
              className="border-2 border-black"
              id="token"
              error={errors.token}
              touched={touched.token}
              required
              {...getFieldProps("token")}
              placeholder="token"
            />
          </div>

          <div className="flex items-center space-x-28">
            <button
              className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
              type="submit"
              disabled={!isValid}
            >
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

BeforeSettingPassword.defaultProps = {};

export default memo(BeforeSettingPassword);
