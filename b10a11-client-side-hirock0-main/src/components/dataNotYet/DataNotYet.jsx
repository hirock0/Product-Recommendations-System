import { FaRegSadCry } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
const DataNotYet = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Fade triggerOnce>
        <div className="flex flex-col items-center" data-aos="fade-up">
          <FaRegSadCry className="text-6xl text-gray-500 mb-4" />
          <h1 className="text-2xl font-semibold text-gray-700">No Data Yet</h1>
          <p className="text-gray-500 mt-2">
            We're sorry, there’s currently no data available to display.
          </p>
        </div>
      </Fade>
    </div>
  );
};

export default DataNotYet;
