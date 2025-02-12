import { Axios } from "../../utils/Axios/AxiosApi";

export const AllQueries = async () => {
  const response = await Axios.get(
    `${import.meta.env.VITE_SERVER_SIDE_URL}/api/productQueries/get_queries`
  );
  return response?.data?.getQueries;
};
