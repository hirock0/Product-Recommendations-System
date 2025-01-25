import { Slide } from "react-awesome-reveal";
import React, { useState } from "react";
import RecommentBtn from "./RecommentBtn";
import { Link } from "react-router-dom";
const QueryCard = ({ query }) => {
  const [recommendationCount, setRecommendationCount] = useState(
    query?.recommendationCount
  );

  return (
    <Slide triggerOnce className=" w-full  rounded-md bg-base-100">
      <div className="card overflow-hidden  hover:shadow-black w-full bg-base-100 shadow-lg hover:shadow-xl rounded-lg transition-shadow duration-300">
        <div className=" p-4">
          <img
            src={query?.productImage}
            alt={query?.productName}
            className="w-full h-48 object-contain rounded-t-lg"
            data-aos="zoom-in"
          />
        </div>
        <div className="card-body  px-4 bg-rose-100/20">
          <h2 className="card-title text-xl font-bold">{query?.productName}</h2>
          <p className="text-sm ">Brand: {query?.productBrand}</p>
          <p className="text-sm truncate">Query: {query?.queryTitle}</p>
          <p className="text-sm">Reason: {query?.reasonDetails}</p>

          <div className=" mt-4">
            <div
              className=" flex items-center flex-col gap-5"
              data-aos="fade-up"
            >
              <Link
                to={`/my-queries/details_product/${query?._id}`}
                className="btn flex items-center gap-2 w-full"
                data-aos="fade-right"
              >
                View
              </Link>
              {/* Recommend Button */}
              <RecommentBtn
                id={query?._id}
                recommend={setRecommendationCount}
                count={recommendationCount}
              />
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default QueryCard;
