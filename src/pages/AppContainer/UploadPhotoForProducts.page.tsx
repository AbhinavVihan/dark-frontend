import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../actions/auth.actions";
import { productQueryCompletedAction } from "../../actions/products.actions";
import { changeCustomerPhoto } from "../../api/auth";
import { AUTH_TOKEN, BASE_URL } from "../../api/base";
import { fetchProducts, uploadProductImages } from "../../api/products";
import { meSelector } from "../../selectors/auth.selectors";
import { selectedIdSelected } from "../../selectors/products.selectors";
import { useAppSelector } from "../../store";

const UploadProductImages = () => {
  const customer = useAppSelector(meSelector);
  const id = useAppSelector(selectedIdSelected);

  const [imageFront, setimageFront] = useState(undefined);
  const [imageCover, setimageCover] = useState(undefined);
  const [image1, setimages1] = useState(undefined);
  const [image2, setimages2] = useState(undefined);
  const [image3, setimages3] = useState(undefined);

  const data = { imageFront, imageCover, image1, image2, image3 };

  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const token = localStorage.getItem(AUTH_TOKEN);
  const baseUrl = BASE_URL;

  if (!customer && token) {
    alert("you are logged out somehow, please login again");
    window.location.href = "/login";
  }

  const handleInputChange1 = (e: any) => {
    setimageFront(e.target.files[0]);
  };
  const handleInputChange2 = (e: any) => {
    setimageCover(e.target.files[0]);
  };
  const handleInputChange3 = (e: any) => {
    setimages1(e.target.files[0]);
  };
  const handleInputChange4 = (e: any) => {
    setimages2(e.target.files[0]);
  };
  const handleInputChange5 = (e: any) => {
    setimages3(e.target.files[0]);
  };
  // const handleInputChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
  //   setPhoto(e.target.files[0])
  // }

  const query = "";

  const submit = (e: any) => {
    e.preventDefault();
    // window.location.href = "/my-account";
    uploadProductImages(id!, data).then((c) => {
      fetchProducts({ query }).then((products) => {
        dispatch(productQueryCompletedAction(query, products));
        alert("images uploaded successfully");
        window.location.href = "/products";
      });
      // window.location.href = "/my-account";
    });
  };

  return (
    <div className="h-screen font-bold bg-gray-100">
      <form onSubmit={submit}>
        <div>
          <label
            className="cursor-pointer hover:text-red-500"
            onClick={() => setDisabled(!disabled)}
            htmlFor="photo1"
          >
            Choose a Front photo
          </label>
          <input
            className="hidden"
            onChange={(e) => {
              handleInputChange1(e);
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
          <label
            className="cursor-pointer hover:text-red-500"
            onClick={() => setDisabled(!disabled)}
            htmlFor="photo2"
          >
            Choose a cover photo
          </label>
          <input
            className="hidden"
            onChange={(e) => {
              handleInputChange2(e);
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
          <label
            className="cursor-pointer hover:text-red-500"
            onClick={() => setDisabled(!disabled)}
            htmlFor="photo3"
          >
            Choose a image
          </label>
          <input
            className="hidden"
            onChange={(e) => {
              handleInputChange3(e);
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
          <label
            className="cursor-pointer hover:text-red-500"
            onClick={() => setDisabled(!disabled)}
            htmlFor="photo4"
          >
            Choose a image
          </label>
          <input
            className="hidden"
            onChange={(e) => {
              handleInputChange4(e);
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
            Choose a image
          </label>
          <input
            className="hidden"
            onChange={(e) => {
              handleInputChange5(e);
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
