import Loading from "../pages/loading/Loading";
import { useContexApi } from "../utils/ContextApi/ContextApi";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { loading, loggedUser } = useContexApi();
  const location = useLocation();
  if (loading) {
    return <Loading />;
  }

  if (loggedUser === null) {
    return <Navigate state={location?.pathname} to="/login" replace={true} />;
  }
  return children;
};

export default PrivateRoute;
