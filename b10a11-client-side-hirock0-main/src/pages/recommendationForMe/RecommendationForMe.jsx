import React, { useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { Slide } from "react-awesome-reveal";
import DataNotYet from "../../components/dataNotYet/DataNotYet";
import { useContexApi } from "../../utils/ContextApi/ContextApi";
import { Axios } from "../../utils/Axios/AxiosApi";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading/Loading";
const RecommendationForMe = () => {
  const { loggedUser } = useContexApi();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],

    queryFn: async () => {
      const response = await Axios.get(
        `${
          import.meta.env.VITE_SERVER_SIDE_URL
        }/api/productQueries/other_recommendations/${loggedUser?.email}`
      );
      return response?.data?.product;
    },
  });

  return (
    <main className=" py-10 bg-gradient-to-tr from-yellow-50 to-blue-50">
      {isLoading ? (
        <Loading />
      ) : products?.length === 0 || isError ? (
        <DataNotYet />
      ) : (
        <div className=" ">
          <div className="container mx-auto px-5">
            <div className=" grid grid-cols-3 max-lg:grid-cols-2 justify-items-center max-sm:grid-cols-1 gap-5">
              {products?.map((product, index) => (
                <div key={index} className=" w-full">
                  <div
                    className=" bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                    data-aos="fade-up"
                  >
                    {/* Product Image */}
                    <img
                      src={product?.productImage}
                      alt={product?.productName}
                      className="w-full h-48 object-contain rounded-md mb-4"
                    />

                    <div className=" border bg-fuchsia-100/50  p-5">
                      {/* Content Section */}
                      <div className="">
                        {/* Product Name and Brand */}
                        <h2 className="text-lg font-semibold ">
                          {product?.productName}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Brand: {product?.productBrand}
                        </p>

                        {/* Query Title */}
                        <Slide>
                          <h3 className="mt-4 text-md font-medium">
                            {product?.queryTitle}
                          </h3>
                        </Slide>

                        {/* Reason */}
                        <p className="mt-2 text-sm text-gray-600">
                          {product?.reasonDetails}
                        </p>

                        {/* User Details */}
                        <div className="mt-4 flex items-center space-x-3">
                          <img
                            src={product?.image}
                            alt={product?.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-300"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {product?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {product?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Footer Section */}
                      <div className="mt-6 flex justify-between items-center">
                        {/* Date & Time */}
                        <div>
                          <p className="text-xs ">
                            Date: {product?.currentDate}
                          </p>
                          <p className="text-xs ">
                            Time: {product?.currentTime}
                          </p>
                        </div>

                        {/* Recommendations */}
                        <div className="flex items-center space-x-2">
                          <FaRegThumbsUp className="text-blue-500" />
                          <p className="text-sm text-gray-700">
                            {product?.recommendationCount} Recommendations
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default RecommendationForMe;
