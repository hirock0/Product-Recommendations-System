import ProductForm from "../../components/productForm/ProductForm";
import { useContexApi } from "../../utils/ContextApi/ContextApi";
import { useLoaderData } from "react-router-dom";
import Loading from "../loading/Loading";
import swal from "sweetalert";
import { Axios } from "../../utils/Axios/AxiosApi";
const ProductUpdate = () => {
  const loaderdata = useLoaderData();
  const preUpdateQuery = loaderdata?.data?.findProduct;
  const { loader, setLoader, loading, loggedUser } = useContexApi();

  const onUpdateProduct = async (data) => {
    setLoader(true);
    try {
      const updateData = {
        productBrand: data.productBrand,
        productImage: data.productImage,
        productName: data.productName,
        queryTitle: data.queryTitle,
        reasonDetails: data.reasonDetails,
      };

      const response = await Axios.patch(
        `${
          import.meta.env.VITE_SERVER_SIDE_URL
        }/api/productQueries/update_querie/${preUpdateQuery._id}`,
        updateData
      );
      if (response?.data?.success) {
        swal({
          title: response?.data?.message,
          icon: "success",
        });
        setLoader(false);
      }
    } catch (error) {
      throw new Error(error);
    }

  };

  return (
    <main>
      <div className=" container mx-auto px-5 py-10">
        {loading ? (
          <Loading />
        ) : (
          <ProductForm
            flag={"update"}
            onFunction={onUpdateProduct}
            loader={loader}
            product={[preUpdateQuery]}
          />
        )}
      </div>
    </main>
  );
};

export default ProductUpdate;
