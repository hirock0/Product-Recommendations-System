import { useNavigate } from "react-router-dom";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Fade } from "react-awesome-reveal";
import { Axios } from "../../utils/Axios/AxiosApi";
import ProductCard from "../../components/productCard/ProductCard";
import Loading from "../loading/Loading";
import { useContexApi } from "../../utils/ContextApi/ContextApi";
import { useQuery } from "@tanstack/react-query";
import DeletePopup from "../../components/deletePopup/DeletePopup";
import DataNotYet from "../../components/dataNotYet/DataNotYet";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState } from "react";
const MyQueries = () => {
  const { loggedUser, myQueries, setMyQueries } = useContexApi();
  const [pageFlag, setPageFlag] = useState(0);
  const navigate = useNavigate();
  const {
    data: myQueriesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myQueriesData"],
    queryFn: async () => {
      const response = await Axios.get(
        `${
          import.meta.env.VITE_SERVER_SIDE_URL
        }/api/productQueries/userProducts/${loggedUser?.email}`
      );
      if (response?.data?.success) {
        setMyQueries(response?.data?.userQueries);
      } else {
        setMyQueries([]);
      }
      return () => response?.data?.userQueries;
    },
  });

  const tolatElement = myQueries?.length;
  const perPage = 10;
  const totalPages = Math.ceil(tolatElement / perPage);
  const sliceData = myQueries?.slice(
    perPage * pageFlag,
    perPage * (pageFlag + 1)
  );

  const onNext = () => {
    setPageFlag((prev) => prev + 1);
  };
  const onPrev = () => {
    setPageFlag((prev) => prev - 1);
  };

  return (
    <main>
      <div className=" ">
        <div className="">
          <div className=" " data-aos="zoom-in" data-aos-duration="1000">
            <div className=" relative h-[400px] max-md:h[300px] ">
              <DotLottieReact
                src="https://lottie.host/76ebb78a-6be1-4bf7-a94e-8ff2d9239596/XYyCHEexdR.lottie"
                loop
                autoplay
                className=" w-full h-full object-cover "
              />
              <div className="  absolute top-0 right-0 left-0 bottom-0 flex flex-col items-center justify-center bg-slate-800/50 text-white ">
                <div className="text-center container mx-auto px-5">
                  <Fade className=" ">
                    <h1 className="text-4xl font-bold flex items-center justify-center mb-4">
                      <AiOutlineQuestionCircle className="mr-2" /> Have
                      Questions? We’re Here to Help!
                    </h1>
                    <p className="text-lg mb-6">
                      Get in touch with us by adding your queries. We’ll respond
                      as soon as possible.
                    </p>
                  </Fade>
                </div>
              </div>
            </div>
            <div className="  bg-green-600/20 py-5">
              <div className="container mx-auto px-5">
                <button
                  onClick={() => navigate("/my-queries/add-query")}
                  className="flex items-center justify-center px-6 py-3 bg-white text-blue-500 font-semibold rounded-md shadow-md hover:bg-gray-200 transition duration-300"
                >
                  <AiOutlineQuestionCircle className="mr-2" /> Add Queries
                </button>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Loading />
        ) : myQueries.length === 0 || isError ? (
          <DataNotYet />
        ) : (
          <div className=" pb-10 bg-gradient-to-tr from-blue-100  to-red-50">
            <div className="container mx-auto px-5 grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 py-10 justify-items-center ">
              {sliceData?.map((query, index) => (
                <ProductCard key={index} product={query} />
              ))}
            </div>

            <div
              className={`${
                myQueries.length < 10 && "hidden"
              } bg-slate-200 shadow-lg  py-5 container mx-auto px-5 `}
            >
              <div className=" flex justify-center items-center">
                <div className=" flex gap-5 items-center">
                  <button
                    disabled={pageFlag < 1 ? true : false}
                    onClick={() => onPrev()}
                    className=" bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 active:bg-blue-800"
                  >
                    Prev
                  </button>
                  <div className=" text-xl font-semibold ">{pageFlag + 1}</div>
                  <button
                    disabled={totalPages - 1 === pageFlag ? true : false}
                    onClick={() => onNext()}
                    className=" bg-green-600 text-white  px-5 py-2 rounded-md hover:bg-green-700 active:bg-green-800"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* delete_popup_start */}
        <DeletePopup />
      </div>
    </main>
  );
};

export default MyQueries;
