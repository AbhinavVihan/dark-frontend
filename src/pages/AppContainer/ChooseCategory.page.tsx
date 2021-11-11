import { useFormik } from "formik";
import React, { FC, memo, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import * as yup from "yup";
import Input from "../../components/input";
import { login } from "../../api/auth";
import { authActions } from "../../actions/auth.actions";
import { useAppSelector } from "../../store";
import { loadingSelector } from "../../selectors/auth.selectors";
import { fetchCategories as fetchCategoriesStart } from "../../api/categories";
import { useDispatch } from "react-redux";
import {
  categoryChoose,
  categoryQueryCompletedAction,
} from "../../actions/categories.actions";
import { currentQueryCategoriesSelector } from "../../selectors/categories.selectors";

interface Props {}

const ChooseCategory: FC<Props> = (props) => {
  const [cstate, setCstate] = useState("");
  const dispatch = useDispatch();
  const query = "";
  const categories = useAppSelector(currentQueryCategoriesSelector);

  useEffect(() => {
    fetchCategoriesStart({ query }).then((categories) => {
      dispatch(categoryQueryCompletedAction(query, categories));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();

  const { handleSubmit, getFieldProps, isValid, touched, errors } = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: yup.object().shape({
      category: yup.string().required(),
    }),
    onSubmit: (data) => {
      dispatch(categoryChoose(cstate));
      history.push("/create-product");
    },
  });

  return (
    <div className="flex flex-col items-center w-screen pt-8 lg:w-1/2 space-y-28">
      <div className="flex flex-col space-y-14">
        <div className="space-y-4 ">
          <h1 className="text-4xl">WELCOME TO RETAILOR'S SECTION</h1>
        </div>
        {categories.map((c) => (
          // <div onClick={setCstate(c._id)}>{c.categoryName}</div>
          <div
            className="cursor-pointer hover:text-red-500"
            onClick={() => setCstate(c._id)}
          >
            {c.categoryName}
          </div>
        ))}
        <form className="space-y-8" onSubmit={handleSubmit}>
          <input
            className="h-10 border-2 border-black rounded w-96"
            id="in"
            type="text"
            value={cstate}
          />
        </form>
        <Link
          to="/create-product"
          onClick={() => dispatch(categoryChoose(cstate))}
          className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
        >
          Choose Category
        </Link>
        <div>Or</div>
        <Link
          to="/create-category"
          // onClick={() => dispatch(categoryChoose(cstate))}
          className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
        >
          Create a new Category
        </Link>
        {/* <button
          className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
          type="submit"
          onClick={() => dispatch(categoryChoose(cstate))}
          disabled={!isValid}
        >
          ChooseCategory
        </button> */}
        <Link to="/create-product">Go to Page</Link>
        <div className="flex flex-col items-center space-y-5"></div>
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

ChooseCategory.defaultProps = {};

export default memo(ChooseCategory);
