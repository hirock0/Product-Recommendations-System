import QueryCard from "../../components/queryCard/QueryCard";
import { Axios } from "../../utils/Axios/AxiosApi";
import { useQuery } from "@tanstack/react-query";
import DataNotYet from "../../components/dataNotYet/DataNotYet";
import Loading from "../loading/Loading";
import { FaSearchengin } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useContexApi } from "../../utils/ContextApi/ContextApi";
import { FaThLarge, FaTh, FaThList } from "react-icons/fa";
const Queries = () => {
  const { loader, setLoader } = useContexApi();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFlag, setSearchFlag] = useState(false);
  const [menualSearch, setMenualSearch] = useState("");
  const [columns, setColumns] = useState(3);
  const [columnFlag, setColumnFlag] = useState(false);
  const {
    isLoading,
    data: queries,
    isError,
  } = useQuery({
    queryKey: ["queries"],

    queryFn: async () => {
      const response = await Axios.get(
        `${import.meta.env.VITE_SERVER_SIDE_URL}/api/productQueries/get_queries`
      );
      return response?.data?.getQueries;
    },
  });
  const seachQueries = queries?.filter((query) =>
    query.productName.toLowerCase().includes(menualSearch.toLowerCase())
  );
  const onSearch = (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData(e.target);
    const searcData = formData.get("search");
    setTimeout(() => {
      setLoader(false);
      setMenualSearch(searcData);
      setSearchFlag(true);
    }, 2000);
  };

  useEffect(() => {
    if (searchQuery === "") {
      setSearchFlag(false);
    }
  }, [searchQuery, setSearchFlag]);

  return (
    <main className=" pb-20 bg-gradient-to-tr from-zinc-200 to-yellow-100/20 ">
      <div className="flex max-lg:hidden justify-center gap-4 mb-6 fixed right-0 top-48 flex-col z-50">
        <button
          onClick={() => {
            setColumns(1), setColumnFlag(true);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
            columns === 1 ? "bg-blue-600 text-white" : "bg-white text-gray-700"
          }`}
        >
          <FaThList />1 Column
        </button>
        <button
          onClick={() => {
            setColumns(2), setColumnFlag(true);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
            columns === 2 ? "bg-blue-600 text-white" : "bg-white text-gray-700"
          }`}
        >
          <FaTh />2 Columns
        </button>
        <button
          onClick={() => {
            setColumns(3), setColumnFlag(true);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
            columns === 3 ? "bg-blue-600 text-white" : "bg-white text-gray-700"
          }`}
        >
          <FaThLarge />3 Columns
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : queries?.length === 0 || isError ? (
        <DataNotYet />
      ) : (
        <div className=" ">
          {/* search_fuctionality */}
          <div className=" border-b py-5 mb-5 backdrop:filter backdrop-blur-3xl sticky top-20 z-40">
            <div className=" container mx-auto px-5">
              <form
                onSubmit={onSearch}
                className=" relative rounded-md overflow-hidden"
              >
                <input
                  type="text"
                  name="search"
                  placeholder="search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                  className=" border h-12 pl-2 w-full rounded-l-lg outline-none"
                />
                <button
                  type="submit"
                  className=" absolute text-white hover:text-yellow-500 right-0 bottom-0 w-20 bg-blue-600 h-full flex items-center justify-center"
                >
                  <FaSearchengin size={30} />
                </button>
              </form>
            </div>
          </div>

          {loader ? (
            <Loading />
          ) : seachQueries?.length === 0 && searchFlag ? (
            <DataNotYet />
          ) : (
            <div className="container mx-auto px-5">
              <div
                className={`grid gap-4 &   ${
                  columnFlag
                    ? columns === 1
                      ? "grid-cols-1"
                      : columns === 2
                      ? "grid-cols-2"
                      : "grid-cols-3"
                    : " grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1"
                } `}
              >
                {!searchFlag &&
                  queries?.map((query, index) => {
                    return <QueryCard key={index} query={query} />;
                  })}
                {searchFlag &&
                  seachQueries?.map((query, index) => {
                    return <QueryCard key={index} query={query} />;
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Queries;
