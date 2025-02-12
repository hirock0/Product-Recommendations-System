import React from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { Slide } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { useContexApi } from "../../utils/ContextApi/ContextApi";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { setDeletePopUp, setDeleteId } = useContexApi();
  const { productBrand, productImage, productName, queryTitle, reasonDetails } =
    product;

  return (
    <Slide triggerOnce>
      <div className="card  w-full overflow-hidden max-w-sm bg-base-100 shadow-lg hover:shadow-xl hover:shadow-black rounded-lg transition-shadow duration-300">
        <div className=" ">
          <img
            src={productImage}
            alt={productName}
            className="w-full h-48 object-contain rounded-t-lg"
            data-aos="zoom-in"
          />
        </div>
        <div className="card-body p-4 py-5 bg-zinc-100">
          <h2 className="card-title text-xl font-bold">{productName}</h2>
          <p className="text-sm">Brand: {productBrand}</p>
          <p className="text-sm truncate">Query: {queryTitle}</p>
          <p className="text-sm ">Reason: {reasonDetails}</p>
          <div className="card-actions justify-between mt-4">
            <button
              onClick={() =>
                navigate(`/my-queries/details_product/${product?._id}`)
              }
              className="btn btn-outline btn-primary flex items-center gap-2"
              data-aos="fade-right"
            >
              <FaEye /> View Details
            </button>
            <button
              onClick={() =>
                navigate(`/my-queries/update_product/${product?._id}`)
              }
              className="btn btn-outline btn-success flex items-center gap-2"
              data-aos="fade-up"
            >
              <FaEdit /> Update
            </button>
            <button
              onClick={() => {
                setDeletePopUp(true), setDeleteId(product?._id);
              }}
              className="btn btn-outline btn-error flex items-center gap-2"
              data-aos="fade-left"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default ProductCard;
