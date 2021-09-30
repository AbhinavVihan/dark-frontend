import { memo } from "react";
// import { Link, useHistory } from "react-router-dom";
// import * as yup from "yup";
// import Button from "../../components/Button/Button";
// import { useFormik } from "formik";
// import Input from "../../components/input/Input";
// import { useState } from "react";

// const Signup = () => {
//   const history = useHistory();
//   const [password, setPassword] = useState(false);

//   const togglePassword = () => {
//     setPassword(password ? false : true);
//   };

//   const {
//     handleSubmit,
//     touched,
//     errors,
//     isValid,
//     getFieldProps,
//     isSubmitting,
//   } = useFormik({
//     initialValues: {
//       email: "",
//       username: "",
//       password: "",
//     },
//     validationSchema: yup.object().shape({
//       username: yup.string().required().min(3),
//       email: yup.string().required().email(),
//       password: yup.string().required().min(6),
//     }),
//     onSubmit: (data) => {
//       // dispatch(signup(data));
//       history.push("/");
//     },
//   });

//   return (
//     <div className="flex flex-col items-center w-screen pt-8 lg:w-1/2 space-y-28">
//       <div className="flex flex-col space-y-14">
//         <div className="space-y-4 ">
//           <h1 className="text-4xl">Get started with a free account</h1>

//           <div className="flex justify-start ">
//             <h2>Already have an account?</h2>
//             <Link to="/login" className="text-blue-600 underline">
//               Log In
//             </Link>
//           </div>
//         </div>

//         <form className="space-y-8" onSubmit={handleSubmit}>
//           <Input
//             id="username"
//             error={errors.username}
//             touched={touched.username}
//             autoComplete="off"
//             required
//             {...getFieldProps("username")}
//             placeholder="username"
//           />
//           <Input
//             id="email"
//             error={errors.email}
//             touched={touched.email}
//             required
//             {...getFieldProps("email")}
//             placeholder="email address"
//           />

//           <Input
//             id="password"
//             type={password ? "text" : "password"}
//             error={errors.password}
//             touched={touched.password}
//             autoComplete="off"
//             required
//             {...getFieldProps("password")}
//             placeholder="password"
//           />

//           <div className="flex items-center space-x-28">
//             <div className="flex items-center">
//               <label>Show Password</label>
//               <input onClick={togglePassword} type="checkbox" />
//             </div>

//             <Button className="bg-blue-600" type="submit" disabled={!isValid}>
//               Get started
//             </Button>
//           </div>
//         </form>
//         <div className="flex flex-col items-center space-y-5">
//           <div className="flex items-center justify-start">
//             <input id="loggedin" name="Toggle button" type="checkbox" />
//             <label className="switch" htmlFor="loggedin">
//               I agree to terms and conditions
//             </label>
//           </div>
//           <div>{isSubmitting}</div>
//         </div>
//       </div>
//       <div className="max-w-md text-center">
//         <p>
//           © 2020 All Rights Reserved. CORK is a product of Designreset. Cookie
//           Preferences, Privacy, and Terms.
//         </p>
//       </div>
//     </div>
//   );
// };

// Signup.defaultProps = {};

// export default memo(Signup);
