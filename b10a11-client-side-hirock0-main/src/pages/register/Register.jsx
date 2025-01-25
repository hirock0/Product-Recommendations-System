// src/components/Signup.jsx
import React from "react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Axios } from "../../utils/Axios/AxiosApi";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContexApi } from "../../utils/ContextApi/ContextApi";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const Register = () => {
  const location = useLocation();
  const { loader, setLoader } = useContexApi();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  // signupdata------
  const onRegister = async (info) => {
    setLoader(true);
    try {
      if (info.password === info.rePassword) {
        delete info.rePassword;
        const response = await Axios.post(
          `${import.meta.env.VITE_SERVER_SIDE_URL}/api/user/register`,
          info
        );
        if (response?.data?.success) {
          swal({
            title: response?.data?.message,
            icon: "success",
          });
          setLoader(false);
          localStorage.setItem("token", JSON.stringify(response?.data?.token));
          navigate(location?.state === null ? "/" : location?.state);
          window.location.reload();
        } else {
          swal({
            title: response?.data?.message,
            icon: "warning",
          });
          setLoader(false);
        }
      } else {
        swal({
          title: "Password is not matched",
          icon: "warning",
        });
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      throw new Error(error.message);
    }
  };
  // --------------------

  return (
    <div className=" py-10 flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-5xl relative bg-white rounded-lg shadow-lg">
        {/* Left Side Lottie Animation */}
        <button onClick={() => navigate(-1)} className="bg-red-600 absolute left-2 top-2 text-white px-5 py-1 rounded-md hover:text-yellow-400 hover:scale-110 ">back</button>
        <div className="w-1/2 max-md:hidden ">
          <DotLottieReact
            className=" h-full w-full object-cover "
            src="https://lottie.host/279d1e59-b9c5-4bb3-b34c-5967fd88057b/AjF3bs1WBp.lottie"
            loop
            autoplay
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2
            className="text-2xl font-bold text-center text-gray-700 mb-6"
            data-aos="fade-down"
          >
            Create a New Account
          </h2>

          <form
            onSubmit={handleSubmit((registerData) => onRegister(registerData))}
          >
            {/* Name Input */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Need your name to register",
                })}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm pl-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Need your email to register",
                })}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm pl-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-4 ">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <div className="relative mt-2 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Need your password to register",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEye size={20} />
                  ) : (
                    <AiOutlineEyeInvisible size={20} />
                  )}
                </span>
              </div>
              {/* Eye Icon */}
              {errors.password && (
                <p className="text-red-500 text-sm pl-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Re-type Password */}
            <div className="mb-4 ">
              <label htmlFor="rePassword" className="block text-gray-600">
                Re-type Password
              </label>
              <div className="relative mt-2 flex items-center">
                <input
                  type={showRePassword ? "text" : "password"}
                  name="rePassword"
                  placeholder="Re-enter your password"
                  {...register("rePassword", {
                    required: "Need your password to register",
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {/* Eye Icon */}
                <span
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="absolute right-3 cursor-pointer"
                >
                  {showRePassword ? (
                    <AiOutlineEye size={20} />
                  ) : (
                    <AiOutlineEyeInvisible size={20} />
                  )}
                </span>
              </div>
              {errors.rePassword && (
                <p className="text-red-500 text-sm pl-2">
                  {errors.rePassword.message}
                </p>
              )}
            </div>

            {/* Image Input */}
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-600">
                Upload Image
              </label>
              <input
                type="url"
                name="image"
                placeholder="Enter your image URL"
                {...register("image", {
                  required: "Need your password to register",
                })}
                className="w-full mt-2 border h-10 pl-2 rounded-md focus:outline-none focus:border-blue-400"
              />
              {errors.image && (
                <p className="text-red-500 text-sm pl-2">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="termsChecked"
                  {...register("termsChecked", {
                    required: "Need your terms checking register",
                  })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link to={"#"} className="text-blue-500 hover:underline">
                    terms and conditions
                  </Link>
                  .
                </span>
              </label>
              {errors.termsChecked && (
                <p className="text-red-500 text-sm pl-2">
                  {errors.termsChecked.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={loader}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {!loader ? (
                "Sign Up"
              ) : (
                <div className=" loading loading-md"></div>
              )}
            </button>

            {/* Already have an account */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to={"/login"} className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
