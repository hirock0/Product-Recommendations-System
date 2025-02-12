import Typewriter from "typewriter-effect";
const Section_2 = () => {
  return (
    <section className=" py-10 mt-10 bg-slate-700 text-white">
      <div className="">
        <div className=" flex max-lg:flex-col-reverse container mx-auto px-5 ">
          <div className=" w-full max-lg:mt-5 max-lg:flex max-lg:justify-center ">
            <img
              src=" https://i.ibb.co.com/CnVZJBn/metting-1.jpg"
              alt="metting-1"
              className=" object-cover"
            />
          </div>
          <div className="  w-full px-5 ">
            <div className=" flex max-md:flex-col max-md:items-center">
              <img
                src="  https://i.ibb.co.com/z2Fzy0k/metting-2.jpg"
                alt="metting-2"
                className="md:w-72 object-cover"
              />
              <div className=" text-center w-full p-5">
                <h1 className="   text-4xl font-semibold">
                  <Typewriter
                    options={{
                      strings: ["Best Deal", "For You!"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </h1>
                <p data-aos="fade-up" className=" mt-5">
                  Our Community is a vibrant space where users share
                  experiences, reviews, and recommendations, fostering trust and
                  connection. Join us to discover trending products, engage with
                  like-minded individuals, and enhance your shopping journey!
                </p>
              </div>
            </div>
            {/* ----- */}
            <div data-aos="fade-up" className="text-center mt-5">
              <h1 className=" text-3xl font-semibold">Our Community</h1>
              <p>
                Our Community is a vibrant space where users share experiences,
                reviews, and recommendations, fostering trust and connection.
                Join us to discover trending products, engage with like-minded
                individuals, and enhance your shopping journey!
              </p>

              <img
                src="https://i.ibb.co.com/j5yBfgL/pngwing-com.png"
                alt="person"
                className="w-96 max-lg:hidden mt-5"
              />
            </div>
            {/* --- */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section_2;
