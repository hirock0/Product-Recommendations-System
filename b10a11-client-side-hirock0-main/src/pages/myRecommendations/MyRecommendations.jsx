import { Axios } from "../../utils/Axios/AxiosApi";
import { useContexApi } from "../../utils/ContextApi/ContextApi";
import DeletePopup from "../../components/deletePopup/DeletePopup";
import DataNotYet from "../../components/dataNotYet/DataNotYet";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading/Loading";
const MyRecommendations = () => {
  const {
    loggedUser,
    setDeletePopUp,
    myQueries,
    setMyQueries,
    setDeleteId,
    loading,
  } = useContexApi();

  const {
    data: myRecommendations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myRecommendations"],
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

  return (
    <main className={`${myQueries?.length < 6 && " h-screen"} bg-gradient-to-tr from-orange-300 to-blue-300`}>
      {isLoading ? (
        <Loading />
      ) : myQueries?.length === 0 || isError ? (
        <DataNotYet />
      ) : (
        <div className="">
           <h1 className=" text-center py-5 text-2xl font-semibold">My Recommendations</h1>
          <div
            className="overflow-x-auto shadow-md sm:rounded-lg p-4 bg-white"
            data-aos="fade-up"
          >
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Brand
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {myQueries?.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    {/* User Name */}
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item?.name}
                    </td>
                    {/* Email */}
                    <td className="px-6 py-4">{item?.email}</td>
                    {/* Product Brand */}
                    <td className="px-6 py-4">{item?.productBrand}</td>
                    {/* Product Name */}
                    <td className="px-6 py-4">{item?.productName}</td>
                    {/* Product Image */}
                    <td className="px-6 py-4">
                      <img
                        src={item?.productImage}
                        alt={item?.productName}
                        className="w-12 h-12 rounded-md object-cover border"
                      />
                    </td>
                    {/* View Button */}
                    <td className="px-6 py-4">
                      <button
                        className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow"
                        onClick={() => {
                          setDeletePopUp(true), setDeleteId(item?._id);
                        }}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <DeletePopup />
    </main>
  );
};

export default MyRecommendations;
