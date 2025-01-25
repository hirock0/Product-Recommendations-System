import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { Axios } from "../../utils/Axios/AxiosApi";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig/Firebase.config";
import { useContexApi } from "../../utils/ContextApi/ContextApi";
import { FaTachometerAlt, FaEnvelope, FaCog } from "react-icons/fa";
import { Slide } from "react-awesome-reveal";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Navbar = () => {
  const { pathname } = useLocation();
  const {
    loggedUser,
    profileFlag,
    setProfileFlag,
    isOpen,
    setIsOpen,
    loginPopup,
    setLoginPopUp,
  } = useContexApi();
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const onLogout = async () => {
    try {
      await Axios.get(
        `${import.meta.env.VITE_SERVER_SIDE_URL}/api/user/logout`
      );
      await signOut(auth);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <nav className=" bg-green-200 bg-gradient-to-bl  from-lime-600/60 to-blue-600/80 text-white shadow-lg sticky top-0 z-50 h-20 flex items-center">
      <Helmet>
        <title>{pathname === "/" ? "Home" : pathname}</title>
        <meta
          name="Discover the best products tailored to your needs. Our expert recommendations and reviews help you make informed decisions effortlessly."
          content="Product Recommendation System"
        />
        <link
          rel="canonical"
          href="https://product-recommendation-system.vercel.app/"
        />
      </Helmet>
      <div className="container mx-auto px-5 py-3 flex justify-between items-center">
        <div className="flex items-center ">
          <span className="font-bold text-lg">
            <div className="p-2 bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold">
              PR
            </div>
          </span>
          <button
            className="btn btn-sm btn-circle ml-2 lg:tooltip lg:tooltip-right"
            onClick={toggleTheme}
            data-tip="Theme"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>

        <div className="hidden lg:flex space-x-4">
          <NavLink to={"/"} className=" rounded-md px-1 ">
            <span>Home</span>
          </NavLink>
          <NavLink to={"/queries"} className=" rounded-md px-1 ">
            <span>Queries</span>
          </NavLink>
          <NavLink to={`/recommendations_for_me`} className=" rounded-md px-1">
            <span>Recommendations For Me</span>
          </NavLink>
          <NavLink to={"/my-queries"} className=" rounded-md px-1">
            <span>My Queries</span>
          </NavLink>
          <NavLink to={"/my-recommendations"} className=" rounded-md px-1">
            <span>My Recommendations</span>
          </NavLink>

          {loggedUser === null ? (
            <Link className=" lg:hidden" to={"/login"}>
              Login
            </Link>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation(), setProfileFlag(!profileFlag);
              }}
              className=" bg-slate-200 rounded-full lg:hidden"
            >
              <img
                src={loggedUser?.image.toString()}
                alt="user"
                className="w-12 h-12 rounded-full"
              />
            </button>
          )}
        </div>
        <div className=" flex items-center gap-5">
          {loggedUser === null ? (
            <Link className=" max-lg:hidden" to={"/login"}>
              Login
            </Link>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation(),
                  setIsOpen(false),
                  setProfileFlag(!profileFlag);
              }}
              className=" bg-slate-200 rounded-full"
            >
              <img
                src={loggedUser?.image}
                alt="user"
                className="w-12 h-12 rounded-full"
              />
            </button>
          )}

          <button
            className="lg:hidden  text-3xl"
            onClick={(e) => {
              e.stopPropagation(), setProfileFlag(false), setIsOpen(!isOpen);
            }}
            aria-label="Toggle Navigation"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="lg:hidden max-lg:absolute right-0 top-20  bg-slate-800 h-screen p-5 flex  justify-end"
        >
          <div
            data-aos="fade-down"
            className=" p-5 rounded-md shadow-md space-y-5"
          >
            <NavLink to={"/"} className="block">
              Home
            </NavLink>
            <NavLink to={"/queries"} className="block ">
              Queries
            </NavLink>
            <NavLink to={`/recommendations_for_me`} className="block">
              Recommendations For Me
            </NavLink>
            <NavLink to={"/my-queries"} className="block">
              My Queries
            </NavLink>
            <NavLink to={"/my-recommendations"} className="block">
              My Recommendations
            </NavLink>
            <NavLink
              to={"/login"}
              className={` ${
                loggedUser !== null && " hidden"
              } block text-red-500`}
            >
              login
            </NavLink>
          </div>
        </div>
      )}

      {/* profile_popup */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          !profileFlag ? "translate-x-full" : "translate-x-0"
        } transition-all bg-slate-600 fixed z-30 right-0 top-20`}
      >
        <div className="h-screen bg-gray-900 text-white  p-5  flex flex-col items-center">
          <Slide direction="down" triggerOnce>
            <div className="mb-8 text-center">
              <div className=" flex items-center justify-center">
                <div className="w-24 h-24 rounded-full mb-3 flex items-center justify-center text-4xl overflow-hidden">
                  <img src={loggedUser?.image.toString()} alt="" />
                </div>
              </div>
              <h2 className="text-lg font-semibold">{loggedUser?.name}</h2>
              <p className="text-sm ">{loggedUser?.email}</p>
            </div>
          </Slide>

          <div className="flex flex-col w-full gap-6 mt-5">
            <Slide direction="right" triggerOnce>
              <Link
                to={"#dashboard"}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition"
              >
                <FaTachometerAlt className="mr-3 text-xl" />
                <span>Dashboard</span>
              </Link>
            </Slide>
            <Slide direction="right" triggerOnce delay={100}>
              <Link
                to={"#messages"}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition"
              >
                <FaEnvelope className="mr-3 text-xl" />
                <span>Messages</span>
              </Link>
            </Slide>
            <Slide direction="right" triggerOnce delay={200}>
              <Link
                to={"#settings"}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition"
              >
                <FaCog className="mr-3 text-xl" />
                <span>Settings</span>
              </Link>
            </Slide>
            <Slide direction="right" triggerOnce delay={300}>
              <button
                onClick={() => {
                  setLoginPopUp(true);
                }}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition text-red-500"
              >
                <FaSignOutAlt className="mr-3 text-xl" />
                <span>Logout</span>
              </button>
            </Slide>
          </div>
        </div>
      </div>

      {/* logout_popup_start */}
      <div
        className={`${
          !loginPopup ? "hidden" : "block"
        } fixed z-40 top-0 left-0 right-0 bottom-0 bg-slate-600/80 flex items-center justify-center`}
      >
        <div className=" flex items-center gap-5 border p-20 max-md:p-10 backdrop:filter backdrop-blur-3xl rounded-lg shadow-lg">
          <button
            onClick={() => setLoginPopUp(false)}
            className="  px-8 py-4 rounded-md max-md:px-5 bg-green-600 hover:bg-green-700 active:bg-green-800"
          >
            Cancel
          </button>
          <button
            onClick={() => onLogout()}
            className=" px-8 py-4 rounded-md max-md:px-5 bg-red-600 hover:bg-red-700 active:bg-red-800"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
