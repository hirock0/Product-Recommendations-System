import { createContext, useContext, useEffect, useState } from "react";
import { AOSConfigure } from "../AosConfigure/AosConfigure";
import { Axios } from "../Axios/AxiosApi";
const ContextCreated = createContext();

export const useContexApi = () => {
  const contex = useContext(ContextCreated);
  return contex;
};

const ContextApi = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileFlag, setProfileFlag] = useState(false);
  const [deletePopup, setDeletePopUp] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [myQueries, setMyQueries] = useState([]);
  const [loginPopup, setLoginPopUp] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      const unsubscribe = async () => {
        const response = await Axios.get(
          `${import.meta.env.VITE_SERVER_SIDE_URL}/api/user/userToken/${token}`
        );

        if (response?.data?.success) {
          setLoading(false);
          setLoggedUser(response?.data?.decodedToken);
        } else {
          setLoading(false);
          setLoggedUser(response?.data?.decodedToken);
        }
      };
      unsubscribe();
      return () => unsubscribe();
    } catch (error) {
      setLoading(false);
      setLoggedUser(null);
      throw new Error(error);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("click", () => {
      setIsOpen(false);
      setProfileFlag(false);
      setLoginPopUp(false);
    });
  }, []);

  useEffect(() => {
    if (deletePopup) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "auto";
    }
  }, [deletePopup]);

  const states = {
    loggedUser,
    setLoggedUser,
    loader,
    setLoader,
    isOpen,
    setIsOpen,
    profileFlag,
    setProfileFlag,
    loading,
    setLoading,
    deletePopup,
    setDeletePopUp,
    deleteId,
    setDeleteId,
    myQueries,
    setMyQueries,
    loginPopup,
    setLoginPopUp,
  };
  AOSConfigure();
  return (
    <ContextCreated.Provider value={states}>{children}</ContextCreated.Provider>
  );
};

export default ContextApi;
