import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UPLOAD_IMAGE_FRONT_BEGIN } from "../../actions/action.constants";
import { authActions } from "../../actions/auth.actions";
import {
  productQueryCompletedAction,
  uploadCoverImageBegin,
  uploadCoverImageCompleted,
  uploadFrontImageBegin,
  uploadFrontImageCompleted,
  uploadImage1Begin,
  uploadImage1Completed,
  uploadImage2Begin,
  uploadImage2Completed,
  uploadImage3Begin,
  uploadImage3Completed,
  uploadProductBegin,
  uploadProductCompleted,
} from "../../actions/products.actions";
import { AUTH_TOKEN } from "../../api/base";
import { fetchProducts, uploadProductImages } from "../../api/products";
import { meSelector } from "../../selectors/auth.selectors";
import {
  selectedIdSelected,
  uploadProductLoader,
} from "../../selectors/products.selectors";
import { useAppSelector } from "../../store";
import { FaSpinner } from "react-icons/fa";

const UploadProductImages = () => {
  const customer = useAppSelector(meSelector);
  const id = useAppSelector(selectedIdSelected);
  const loader = useAppSelector(uploadProductLoader);

  const [imageFront, setimageFront] = useState(undefined);
  const [imageCover, setimageCover] = useState(undefined);
  const [image1, setimages1] = useState(undefined);
  const [image2, setimages2] = useState(undefined);
  const [image3, setimages3] = useState(undefined);

  const data = { imageFront, imageCover, image1, image2, image3 };

  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const token = localStorage.getItem(AUTH_TOKEN);

  if (!customer && token) {
    alert("you are logged out somehow, please login again");
    window.location.href = "/login";
  }

  const handleInputChange1 = (e: any) => {
    setimageFront(e.target.files[0]);
    dispatch(uploadFrontImageBegin());
  };
  const handleInputChange2 = (e: any) => {
    setimageCover(e.target.files[0]);
    dispatch(uploadCoverImageBegin());
  };
  const handleInputChange3 = (e: any) => {
    setimages1(e.target.files[0]);
    dispatch(uploadImage1Begin());
  };
  const handleInputChange4 = (e: any) => {
    setimages2(e.target.files[0]);
    dispatch(uploadImage2Begin());
  };
  const handleInputChange5 = (e: any) => {
    setimages3(e.target.files[0]);
    dispatch(uploadImage3Begin());
  };
  // const handleInputChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
  //   setPhoto(e.target.files[0])
  // }

  const query = "";

  const submit = (e: any) => {
    e.preventDefault();
    dispatch(uploadProductBegin());
    // window.location.href = "/my-account";
    uploadProductImages(id!, data).then((c) => {
      fetchProducts({ query }).then((products) => {
        dispatch(productQueryCompletedAction(query, products));
        dispatch(uploadProductCompleted());
        // window.location.href = "/products";
        history.push("/productsRetailor");
      });
      // window.location.href = "/my-account";
    });
  };

  return (
    <div className="h-screen font-bold bg-gray-100">
      <form onSubmit={submit}>
        <div>
          <label className="cursor-pointer hover:text-red-500" htmlFor="photo1">
            Choose a Front photo
          </label>
          <input
            className="hidden"
            onChange={(e) => {
              handleInputChange1(e);
              dispatch(uploadFrontImageCompleted());
              alert(
                "image front uploaded successfully, click on (choose a cover photo)"
              );
            }}
            type="file"
            id="photo1"
            name="photo"
            accept="image/*"
            // name="file"
            defaultValue={imageFront}
          />
        </div>
        <div>
          <label className="cursor-pointer hover:text-red-500" htmlFor="photo2">
            Choose a cover photo
          </label>
          <input
            className="hidden"
            onChange={(e) => {
              handleInputChange2(e);
              dispatch(uploadCoverImageCompleted());
              alert(
                "image Cover uploaded successfully, click on (choose image 1)"
              );
            }}
            type="file"
            id="photo2"
            name="photo"
            accept="image/*"
            // name="file"
            defaultValue={imageCover}
          />
        </div>

        <div>
          <label className="cursor-pointer hover:text-red-500" htmlFor="photo3">
            Choose image 1
          </label>
          <input
            className="hidden"
            onChange={(e) => {
              handleInputChange3(e);
              dispatch(uploadImage1Completed());
              alert(
                "1st image uploaded successfully, click on (choose image 2)"
              );
            }}
            type="file"
            id="photo3"
            name="photo"
            accept="image/*"
            // name="file"
            defaultValue={image1}
          />
        </div>

        <div>
          <label className="cursor-pointer hover:text-red-500" htmlFor="photo4">
            Choose image 2
          </label>
          <input
            className="hidden"
            onChange={(e) => {
              handleInputChange4(e);
              dispatch(uploadImage2Completed());
              alert(
                "2nd image uploaded successfully, click on (choose image 3)"
              );
            }}
            type="file"
            id="photo4"
            name="photo"
            accept="image/*"
            // name="file"
            defaultValue={image2}
          />
        </div>

        <div>
          <label
            className="cursor-pointer hover:text-red-500"
            onClick={() => setDisabled(!disabled)}
            htmlFor="photo5"
          >
            Choose image 3
          </label>
          <input
            className="hidden"
            onChange={(e) => {
              handleInputChange5(e);
              dispatch(uploadImage3Completed());
              alert("3rd image uploaded successfully, click on submit button");
            }}
            type="file"
            id="photo5"
            name="photo"
            accept="image/*"
            // name="file"
            defaultValue={image3}
          />
        </div>

        <div>
          {!disabled && (
            <button
              className="inline-block px-0 py-1 mx-3 my-2 text-white bg-transparent bg-gray-800 border-2 border-black rounded hover:bg-black w-28"
              type="submit"
              onClick={() => submit}
            >
              Submit
            </button>
          )}
        </div>
        {loader && <FaSpinner className="mt-5 animate-spin"></FaSpinner>}
      </form>

      <div>
        <Link
          onClick={authActions.loggedinPasswordChangeBegin}
          className="hover:text-blue-500"
          to="/my-password"
        >
          Change Your Password
        </Link>
      </div>
    </div>
  );
};

UploadProductImages.defaultProps = {};

export default memo(UploadProductImages);
