import React, { useState } from "react";
import {
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

const ProductDetails = () => {
  const product = useLoaderData();
  const data = product?.data?.findProduct;

  // State for recommendations
  const [recommendations, setRecommendations] = useState([]);
  const [newRecommendation, setNewRecommendation] = useState("");

  // Handle recommendation submission
  const handleRecommendSubmit = (e) => {
    e.preventDefault();
    if (!newRecommendation.trim()) return;

    // Add recommendation to the list
    const recommendationData = {
      id: Date.now(),
      message: newRecommendation,
      date: new Date().toLocaleDateString(),
    };
    setRecommendations([...recommendations, recommendationData]);
    setNewRecommendation("");

    console.log(recommendationData);
  };

  return (
    <main className="bg-[url(https://i.ibb.co.com/hWWdLg3/bg.jpg)] bg-center bg-cover bg-no-repeat">
      <div className="min-h-screen bg-slate-800/80 flex items-center justify-center w-full">
        <div className="container mx-auto p-5">
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
                    <span>{recommendations.length} Recommendations</span>
                  </div>
                </div>
              </div>

              {/* Recommendation Form */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">
                  Leave a Recommendation
                </h3>
                <form onSubmit={handleRecommendSubmit} className="space-y-2">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Write your recommendation..."
                    value={newRecommendation}
                    onChange={(e) => setNewRecommendation(e.target.value)}
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Submit
                  </button>
                </form>
              </div>

              {/* Display Recommendations */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">
                  User Recommendations ({recommendations.length})
                </h3>
                {recommendations.length === 0 ? (
                  <p className="text-gray-500">No recommendations yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {recommendations.map((rec) => (
                      <li
                        key={rec.id}
                        className="border-b border-gray-300 pb-2"
                      >
                        <p className="text-gray-700">"{rec.message}"</p>
                        <p className="text-xs text-gray-500">
                          - Posted on {rec.date}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
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
