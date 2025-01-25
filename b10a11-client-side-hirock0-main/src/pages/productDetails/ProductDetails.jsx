import React, { useEffect } from "react";
import {
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { useLoaderData } from "react-router-dom";
const ProductDetails = () => {
  const product = useLoaderData();
  const data = product?.data?.findProduct;

  return (
    <main className=" bg-[url(https://i.ibb.co.com/hWWdLg3/bg.jpg)] bg-center bg-cover bg-no-repeat ">
      <div className="min-h-screen bg-slate-800/80 flex items-center justify-center h-full w-full">
        <div className=" container mx-auto p-5 ">
          <div
            className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
            data-aos="fade-up"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-blue-500 text-white p-4">
              <h1 className="text-xl font-bold">Details Page</h1>
              <p className="text-sm">
                <FaCalendarAlt className="inline-block mr-1" />
                {data.currentDate} <FaClock className="inline-block mx-1" />
                {data.currentTime}
              </p>
            </div>

            {/* Main Content */}
            <div className="p-6 space-y-6">
              {/* User Information */}
              <div className="flex items-center space-x-4">
                <img
                  src={data.image}
                  alt="User"
                  className="w-16 h-16 rounded-full border border-gray-300"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    <FaUser className="inline-block mr-1" />
                    {data.name}
                  </h2>
                  <p className="text-gray-600">
                    <FaEnvelope className="inline-block mr-1" />
                    {data.email}
                  </p>
                </div>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={data.productImage}
                    alt="Product"
                    className="w-full h-64 object-cover rounded-md shadow"
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">{data.productName}</h2>
                  <p className="text-gray-600 font-semibold">
                    Brand: {data.productBrand}
                  </p>
                  <p className="text-gray-700">{data.reasonDetails}</p>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 mr-2" />
                    <span>{data.recommendationCount} Recommendations</span>
                  </div>
                </div>
              </div>

              {/* Query Details */}
              <div>
                <h3 className="text-lg font-bold mb-2">Query Title:</h3>
                <p className="text-gray-700 italic">{data.queryTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
