import { Link } from "react-router-dom";

const Section_3 = () => {
  return (
    <section className=" overflow-hidden ">
      <div className=" bg-slate-100   ">
        <div className="container py-10 mx-auto px-5 flex gap-10 justify-between items-center max-md:flex-col">
          <div className=" relative ">
            <img src="https://i.ibb.co.com/k2JcjWy/man-1.png" alt="man" />
            <div className=" absolute top-0 left-1/2 right-0 bottom-0 flex flex-col items-end justify-center gap-3">
              <div className="">
                <Link
                  to={"/queries"}
                  className=" bg-blue-600 text-white px-5 py-2 rounded-md font-semibold shadow-lg"
                >
                  Recommendations
                </Link>
              </div>
              <p data-aos="fade-up">
                Discover tailored product suggestions that match your
                preferences, budget, and style with precision!
              </p>
            </div>
          </div>
          <div className=" relative">
            <img src="  https://i.ibb.co.com/sv7rLLv/lady-1.png" alt="man" />
            <div className=" absolute top-0 left-0 right-1/2 bottom-0 flex flex-col items-start justify-center gap-3">
              <p data-aos="fade-up">
                Discover tailored product suggestions that match your
                preferences, budget, and style with precision!
              </p>
              <div className="">
                <Link
                  to={"/queries"}
                  className=" bg-blue-600 text-white px-5 py-2 rounded-md font-semibold shadow-lg"
                >
                  Recommendations
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* ------- */}
        <div className=" bg-blue-600 py-10">
          <div className=" container mx-auto px-5 flex max-lg:flex-col gap-5">
            <div className=" text-white space-y-20 w-1/2 max-lg:w-full">
              <h1 className="text-3xl font-semibold">Suggest A Queries</h1>
              <p data-aos="fade-up" className=" leading-8">
                Suggest A Queries is an intuitive and user-friendly feature on
                our queries recommendation website, designed to help users find
                the perfect match for their needs. By leveraging advanced
                algorithms and user preferences, this tool provides tailored
                recommendations for a variety of categories, such as
                electronics, clothing, and home decor. Simply input your
                preferences, such as budget, style, or functionality, and watch
                as the platform suggests products that align with your
                requirements. Whether you're shopping for yourself or looking
                for a gift, Suggest A queries makes the process seamless and
                efficient. With real-time updates, detailed product
                descriptions, and user reviews, you'll always make informed
                decisions. Discover a personalized shopping experience like
                never before with Suggest A Product!
              </p>
              <div className="">
                <Link
                  to={"/my-queries/add-query"}
                  className=" px-5 py-2 border border-white rounded-lg"
                >
                  Add Queries
                </Link>
              </div>
            </div>
            <div className=" w-1/2 max-lg:w-full grid grid-cols-2 max-md:grid-cols-1 justify-items-center text-white">
              <div data-aos="fade-down" className=" h-72 max-md:w-full">
                <img
                  src="https://i.ibb.co.com/BVmJpDx/lady-4.png"
                  alt="lady"
                  className=" h-full w-full object-cover"
                />
              </div>
              <div
                data-aos="fade-down"
                className=" h-72 max-md:w-full bg-slate-200 text-black p-10 max-sm:p-5  flex items-center justify-center"
              >
                <h1 className=" text-4xl font-semibold">500+ Queris</h1>
              </div>
              <div
                data-aos="fade-up"
                className=" bg-slate-200 text-black max-md:w-full max-md:hidden h-72 p-10 max-sm:p-5 flex items-center justify-center"
              >
                <h1 className="  text-4xl font-semibold">
                  2000+ Added queries
                </h1>
              </div>
              <div data-aos="fade-up" className="h-72 max-md:w-full">
                <img
                  src="https://i.ibb.co.com/bPsn285/computer.png"
                  alt="com"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className=" bg-slate-200 text-black max-md:w-full h-72 md:hidden p-10 max-sm:p-5 flex items-center justify-center">
                <h1 className=" text-4xl font-semibold">2000+ Added queries</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section_3;
