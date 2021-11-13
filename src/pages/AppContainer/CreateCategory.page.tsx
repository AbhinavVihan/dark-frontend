import { FC, memo, useState } from "react";

import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import * as yup from "yup";

import { useFormik } from "formik";
import {
  createCategoryBegin,
  createCategoryComplete,
} from "../../actions/categories.actions";
import { createCategory } from "../../api/categories";

interface Props {}

const CrateCategory: FC<Props> = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createCategory({ categoryName: name, description: description })
      .then((c) => {
        alert("category created successfully");
        dispatch(createCategoryComplete(c));
        history.push("/upload-category-photo");
      })
      .catch((e) => {
        alert("some error occured");
      });
    // dispatch(
    //   createCategoryBegin({ categoryName: name, description: description })
    // );
    // history.push("/upload-category-photo");
  };

  return (
    <div className="flex flex-col items-center w-screen pt-8 lg:w-1/2 space-y-28">
      <div className="flex flex-col space-y-14">
        <div className="space-y-4 ">
          <h1 className="text-4xl">Create Category</h1>
        </div>

        <form className="space-y-8" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              className="h-10 border-2 border-black rounded w-96"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="Category Name"
              required
              placeholder="Category Name"
            />

            <input
              className="h-10 border-2 border-black rounded w-96"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              autoComplete="off"
              required
              placeholder="description"
            />
          </div>

          <div className="flex items-center space-x-28">
            <button
              onClick={() => {
                dispatch(createCategoryBegin());
              }}
              className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
            >
              CrateCategory
            </button>
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

CrateCategory.defaultProps = {};

export default memo(CrateCategory);
