import { useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";
import Loading from "../../pages/loading/Loading";
import { useContexApi } from "../../utils/ContextApi/ContextApi";
import { useNavigate } from "react-router-dom";
const ProductForm = ({ loader, onFunction, flag, product }) => {
  const navigate = useNavigate();
  const { loading } = useContexApi();
  const { register, handleSubmit } = useForm();
  return (
    <div className="">
      {loading ? (
        <Loading />
      ) : (
        <div className="">
          <div className=" mb-5">
            <button
              onClick={() => navigate(-1)}
              className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:bg-blue-700
            "
            >
              Back
            </button>
          </div>
          <form
            onSubmit={handleSubmit((data) => onFunction(data))}
            className="space-y-6"
          >
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium">Product Name</label>
              <input
                type="text"
                {...register("productName", { required: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="Enter the product name"
                defaultValue={flag === "update" ? product[0].productName : null}
              />
            </div>

            {/* Product Brand */}
            <div>
              <label className="block text-sm font-medium ">
                Product Brand
              </label>
              <input
                type="text"
                {...register("productBrand", { required: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="Enter the product brand"
                defaultValue={
                  flag === "update" ? product[0].productBrand : null
                }
              />
            </div>

            {/* Product Image URL */}
            <div>
              <label className="block text-sm font-medium">
                Product Image URL
              </label>
              <input
                type="text"
                {...register("productImage", { required: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="Enter the product image URL"
                defaultValue={
                  flag === "update" ? product[0].productImage : null
                }
              />
            </div>

            {/* Query Title */}
            <div>
              <label className="block text-sm font-medium">Query Title</label>
              <textarea
                {...register("queryTitle", { required: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="Example: Is there any beer product that gives me the same quality?"
                rows="2"
                defaultValue={flag === "update" ? product[0].queryTitle : null}
              />
            </div>

            {/* Boycotting Reason Details */}
            <div>
              <label className="block text-sm font-medium ">
                Boycotting Reason Details
              </label>
              <textarea
                {...register("reasonDetails", { required: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                placeholder="Enter the reason you don’t want this product"
                rows="4"
                defaultValue={
                  flag === "update" ? product[0].reasonDetails : null
                }
              />
            </div>

            {/* Add Query Button */}
            <div className="text-center">
              <button
                type="submit"
                className="flex items-center justify-center w-full max-w-sm mx-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300"
              >
                <AiOutlineSend className="mr-2" />
                {!loader ? (
                  "Add Query"
                ) : (
                  <div className="loading loading-sm"></div>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
