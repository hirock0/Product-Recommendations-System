// src/components/Login.jsx
import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FaGoogle, FaGithub } from "react-icons/fa";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { Axios } from "../../utils/Axios/AxiosApi";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useContexApi } from "../../utils/ContextApi/ContextApi";
import { useLocation } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig/Firebase.config";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const Login = () => {
  const location = useLocation();
  const { loader, setLoader } = useContexApi();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");
      const loginInfo = { email, password };
      const response = await Axios.post(
        `${import.meta.env.VITE_SERVER_SIDE_URL}/api/user/login`,
        loginInfo
      );
      if (response?.data?.success) {
        swal({
          title: "Login Successfully",
          icon: "success",
        });
        localStorage.setItem("token", JSON.stringify(response?.data?.token));
        navigate(location?.state === null ? "/" : location?.state);
        setLoader(false);
        window.location.reload();
      } else {
        setLoader(false);
        swal({
          title: response?.data?.message,
          icon: "error",
        });
      }
    } catch (error) {
      setLoader(false);
      throw new Error(error);
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result?.user?.providerData[0];
      const userInfo = {
        email: user?.email,
        name: user?.displayName,
        uid: user?.uid,
        image: user?.photoURL,
        phoneNumber: user?.phoneNumber,
        providerId: user?.providerId,
        flag: "socialAuth",
      };
      if (user) {
        const response = await Axios.post(
          `${import.meta.env.VITE_SERVER_SIDE_URL}/api/user/register`,
          userInfo
        );
        if (response?.data?.success) {
          swal({
            title: "Login successfully",
            icon: "success",
          });
          setLoader(false);
          localStorage.setItem("token", JSON.stringify(response?.data?.token));
          navigate(location?.state === null ? "/" : location?.state);
          window.location.reload();
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="py-10  flex items-center justify-center bg-zinc-800">
      <div className="flex w-full max-w-4xl bg-[url(https://i.ibb.co.com/ZVnfdSt/background-1.jpg)] relative bg-center bg-cover  rounded-lg shadow-lg">
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 absolute left-2 top-2 text-white px-5 py-1 rounded-md hover:text-yellow-400 hover:scale-110 "
        >
          back
        </button>

        {/* Left Side Lottie Animation */}
        <div className="w-1/2 max-md:hidden ">
          <DotLottieReact
            className=" h-full w-full object-cover "
            src="https://lottie.host/279d1e59-b9c5-4bb3-b34c-5967fd88057b/AjF3bs1WBp.lottie"
            loop
            autoplay
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8 backdrop:filter backdrop-blur-md text-white">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            {/* Gmail input */}
            <div className="mb-4">
              <label htmlFor="email" className="block ">
                Gmail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full mt-2 p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Gmail"
                required
              />
            </div>

            {/* Password input */}
            <div className="mb-6  ">
              <label htmlFor="password" className="block">
                Password
              </label>
              <div className="relative mt-2 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full text-black p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
                <span
                  onClick={handlePasswordVisibility}
                  className="absolute right-3 0 transform cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEye color="black" size={20} />
                  ) : (
                    <AiOutlineEyeInvisible color="black" size={20} />
                  )}
                </span>
              </div>
              {/* Password visibility toggle */}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right mb-4">
              <Link to={"#"} className=" text-blue-500 text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {!loader ? "Login" : <div className=" loading loading-md"></div>}
            </button>
          </form>

          {/* Login with Google Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={googleLogin}
              className="w-full flex justify-center items-center border border-gray-300 hover:text-black py-2 rounded-lg  hover:bg-gray-100 transition duration-200"
            >
              <FaGoogle className="mr-2" /> Login with Google
            </button>
          </div>

          {/* Create New Account */}
          <div className="mt-4 text-center">
            <div className="text-sm">
              Don't have an account?
              <div
                onClick={() => navigate("/register", { state: location.state })}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Create one
              </div>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="mt-4 text-center">
            <div className="text-sm">
              By logging in, you agree to our{" "}
              <Link to={"#"} className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
