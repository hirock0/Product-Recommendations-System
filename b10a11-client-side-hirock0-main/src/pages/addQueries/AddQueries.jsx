import React from "react";
import { Slide } from "react-awesome-reveal";
import ProductForm from "../../components/productForm/ProductForm";
import { useContexApi } from "../../utils/ContextApi/ContextApi";
import { Axios } from "../../utils/Axios/AxiosApi";
import swal from "sweetalert";
const AddQueries = () => {
  const { loggedUser, loader, setLoader } = useContexApi();
  const onSubmit = async (data) => {
    setLoader(true);
    try {
      data.email = loggedUser.email;
      data.name = loggedUser.name;
      data.image = loggedUser.image;
      data.currentDate = new Date().toLocaleDateString();
      data.currentTime = new Date().toLocaleTimeString();
      data.timeStamp = Date.now();
      data.recommendationCount = 0;
      const response = await Axios.post(
        `${
          import.meta.env.VITE_SERVER_SIDE_URL
        }/api/productQueries/add_queries`,
        data
      );
      if (response?.data?.success) {
        swal({
          title: "Success",
          text: response?.data?.message,
          icon: "success",
          button: "Ok",
        });
        setLoader(false);
      } else {
        swal({
          title: "Success",
          text: response?.data?.message,
          icon: "warning",
          button: "Ok",
        });
        setLoader(false);
      }

      // reset(); // Reset the form after submission
    } catch (error) {
      setLoader(false);
      throw new Error(error);
    }
  };

  return (
    <main className="">
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className=" container mx-auto px-5 bg-gray-100 my-5 py-5"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Submit a Product Query
        </h2>
        <Slide>
          <ProductForm
            loader={loader}
            onFunction={onSubmit}
            flag={"addQueries"}
          />
        </Slide>
      </div>
    </main>
  );
};

export default AddQueries;
