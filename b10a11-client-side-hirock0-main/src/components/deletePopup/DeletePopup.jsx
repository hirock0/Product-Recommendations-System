import { useContexApi } from "../../utils/ContextApi/ContextApi";
import swal from "sweetalert";
import { Axios } from "../../utils/Axios/AxiosApi";
const DeletePopup = () => {
  const { deletePopup, setDeletePopUp, deleteId, myQueries, setMyQueries } =
    useContexApi();

  const onDeleteProduct = async () => {
    try {
      const response = await Axios.delete(
        `${
          import.meta.env.VITE_SERVER_SIDE_URL
        }/api/productQueries/deleteProduct/${deleteId}`
      );
      if (response?.data.success) {
        swal({
          title: response?.data?.message,
          text: "Once deleted, you will not be able to recover this product!",
        });
        setDeletePopUp(false);
        setMyQueries(myQueries.filter((query) => query._id !== deleteId));
      } else {
        swal({
          title: response?.data?.message,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div
      className={`${
        !deletePopup && "hidden"
      }  text-white fixed top-0 left-0 right-0 bottom-0 bg-slate-800/80 flex items-center justify-center z-40`}
    >
      <div className=" p-5 w-1/2 max-md:w-5/6 flex items-center justify-center h-52 bg-slate-800 gap-5">
        <button
          onClick={() => setDeletePopUp(false)}
          className=" bg-green-600 px-8 max-sm:px-5 py-4 rounded-md shadow-lg hover:bg-green-700 active:bg-green-800"
        >
          Cancel
        </button>
        <button
          onClick={onDeleteProduct}
          className=" bg-red-600 px-8 max-sm:px-5 py-4 rounded-md shadow-lg hover:bg-red-700 active:bg-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
