import { FaThumbsUp } from "react-icons/fa";
import { useState } from "react";
import { Axios } from "../../utils/Axios/AxiosApi";
const RecommentBtn = ({ id, recommend, count }) => {
  const [countFlag, setCountFlag] = useState(false);
  const handleRecommend = async () => {
    setCountFlag(true);
    try {
      recommend(count + 1);
      const response = await Axios.get(
        `${
          import.meta.env.VITE_SERVER_SIDE_URL
        }/api/productQueries/recommendation_count/${id}`
      );
      if (response?.data?.success) {
        setCountFlag(false);
      } else {
        setCountFlag(true);
      }
    } catch (error) {
      setCountFlag(true);
      throw new Error(error);
    }
  };
  return (
    <button
      className="btn bg-accent flex items-center gap-2"
      onClick={() => handleRecommend()}
      data-aos="fade-right"
    >
      <FaThumbsUp />
      <span>{!countFlag ? "Recommended" : "loading"}</span>
      <span>{count}</span>
    </button>
  );
};

export default RecommentBtn;
