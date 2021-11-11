import { FC, memo } from "react";
import { useAppSelector } from "../../store";

import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { createProductBegin } from "../../actions/products.actions";
import * as yup from "yup";

import { cIdToCreateProduct } from "../../selectors/categories.selectors";
import { useFormik } from "formik";

interface Props {}

const CrateProduct: FC<Props> = (props) => {
  const categoryId = useAppSelector(cIdToCreateProduct);
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleSubmit, getFieldProps, isValid } = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
      price: yup.string().required(),
      description: yup.string().required(),
    }),
    onSubmit: (data) => {
      dispatch(createProductBegin(categoryId, data));
      history.push("/upload-photo");
    },
  });

  return (
    <div className="flex flex-col items-center w-screen pt-8 lg:w-1/2 space-y-28">
      <div className="flex flex-col space-y-14">
        <div className="space-y-4 ">
          <h1 className="text-4xl">Create Product</h1>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <input
              className="h-10 border-2 border-black rounded w-96"
              id="name"
              required
              {...getFieldProps("name")}
              placeholder="Product Name"
            />
            <input
              className="h-10 border-2 border-black rounded w-96"
              id="price"
              required
              {...getFieldProps("price")}
              placeholder="Price"
            />

            <input
              className="h-10 border-2 border-black rounded w-96"
              id="description"
              autoComplete="off"
              required
              {...getFieldProps("description")}
              placeholder="Product description"
            />
          </div>

          <div className="flex items-center space-x-28">
            <button
              className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
              type="submit"
              disabled={!isValid}
            >
              CrateProduct
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

CrateProduct.defaultProps = {};

export default memo(CrateProduct);
