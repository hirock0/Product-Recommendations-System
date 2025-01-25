import { Axios } from "../../utils/Axios/AxiosApi";

export const AllQueries = async () => {
  const response = await Axios.get(
    `http://localhost:5000/api/productQueries/get_queries`
  );
  return response?.data?.getQueries;
};