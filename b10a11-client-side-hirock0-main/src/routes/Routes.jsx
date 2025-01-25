import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import App from "../App";
import ErrorPage from "../pages/errorPage/ErrorPage";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Queries from "../pages/queries/Queries";
import RecommendationForMe from "../pages/recommendationForMe/RecommendationForMe";
import MyQueries from "../pages/myQueries/MyQueries";
import MyRecommendations from "../pages/myRecommendations/MyRecommendations";
import AddQueries from "../pages/addQueries/AddQueries";
import ProductUpdate from "../pages/productUpdate/ProductUpdate";
import { Axios } from "../utils/Axios/AxiosApi";
import ProductDetails from "../pages/productDetails/ProductDetails";
export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/login",
          element: (
            <PublicRoute>
              <Login />
            </PublicRoute>
          ),
        },
        {
          path: "/register",
          element: (
            <PublicRoute>
              <Register />
            </PublicRoute>
          ),
        },
        {
          path: "/queries",
          element: <Queries />,
        },
        {
          path: "/recommendations_for_me",
          element: (
            <PrivateRoute>
              <RecommendationForMe />
            </PrivateRoute>
          ),
        },
        {
          path: "/my-queries",
          element: (
            <PrivateRoute>
              <MyQueries />
            </PrivateRoute>
          ),
        },
        {
          path: "/my-recommendations",
          element: (
            <PrivateRoute>
              <MyRecommendations />
            </PrivateRoute>
          ),
        },
        {
          path: "/my-queries/add-query",
          element: (
            <PrivateRoute>
              <AddQueries />
            </PrivateRoute>
          ),
        },
        {
          path: "/my-queries/update_product/:id",
          loader: async ({ params }) =>
            await Axios.get(
              `${
                import.meta.env.VITE_SERVER_SIDE_URL
              }/api/productQueries/findProduct/${params.id}`
            ),
          element: (
            <PrivateRoute>
              <ProductUpdate />
            </PrivateRoute>
          ),
        },
        {
          path: "/my-queries/details_product/:id",
          loader: async ({ params }) =>
            await Axios.get(
              `${
                import.meta.env.VITE_SERVER_SIDE_URL
              }/api/productQueries/findProduct/${params.id}`
            ),
          element: (
            <PrivateRoute>
              <ProductDetails />
            </PrivateRoute>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
