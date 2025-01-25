import { Navigate } from "react-router-dom";
import Loading from "../pages/loading/Loading";
import { useContexApi } from "../utils/ContextApi/ContextApi";
import { useLocation } from "react-router-dom";
const PublicRoute = ({ children }) => {
  const location = useLocation();
  const { loggedUser, loading } = useContexApi();
  if (loading) {
    return <Loading />;
  }
  if (loggedUser) {
    return (
      <Navigate to={location.state === null ? "/" : location.state} replace />
    );
  }

  return children;
};

export default PublicRoute;
