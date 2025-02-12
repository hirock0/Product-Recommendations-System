import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../utils/Axios/AxiosApi";
import Loading from "../../pages/loading/Loading";
import QueryCard from "../queryCard/QueryCard";
import { useNavigate } from "react-router-dom";
const Section_1 = () => {
  const navigate = useNavigate();
  const { isLoading, data: reqQueries } = useQuery({
    queryKey: ["reqQueries"],
    queryFn: async () =>
      Axios.get(
        `${import.meta.env.VITE_SERVER_SIDE_URL}/api/productQueries/get_queries`
      ),
  });
  const allQueries = reqQueries?.data?.getQueries;
  const sliceQueries = allQueries?.slice(0, 6);
  return (
    <section className="">
      <div className="">
        <div className="bg-blue-400">
          <div className=" container  text-white mx-auto px-5 flex items-center justify-between py-5 ">
            <h1 className="font-semibold text-lg max-sm:text-base">Recent Queries</h1>
            <button
              onClick={() => navigate("/queries")}
              className=" px-10 max-md:px-5 max-sm:px-3  py-2 rounded-md bg-lime-600 hover:bg-lime-700 active:bg-lime-800 shadow-md font-semibold text-lg max-sm:text-base"
            >
              More queries
            </button>
          </div>
        </div>
        {/* products_starts */}
        <div className="">
          {isLoading ? (
            <Loading />
          ) : (
            <div className=" container mx-auto px-5 grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5">
              {sliceQueries?.map((query, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-5"
                >
                  <QueryCard query={query} />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* products_end */}
      </div>
    </section>
  );
};

export default Section_1;
