import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useNavigate } from "react-router-dom";

const Slides = [
  {
    id: 0,
    vid: "https://res.cloudinary.com/dqpyp8ii2/video/upload/v1734882670/slider-1_bbji4w.mp4",
  },
  {
    id: 1,
    vid: "https://res.cloudinary.com/dqpyp8ii2/video/upload/v1734884231/slide-2_nn7egy.mp4",
  },
];
const Hero_Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="  overflow-hidden">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          modules={[Navigation, Pagination, Autoplay]}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
          className="h-full "
        >
          {Slides.map((slide) => (
            <SwiperSlide className="" key={slide.id}>
              <div className=" relative flex items-center justify-center">
                <video
                  src={slide.vid}
                  muted
                  autoPlay
                  loop
                  controls={false}
                  className="lg:h-[600px] max-sm:h-[300px]  h-full w-full object-cover"
                />
                <button
                  onClick={() => navigate("/queries")}
                  className=" absolute bottom-5 text-white px-8 max-sm:px-5 py-4 max-sm:py-2 banner-btn"
                >
                  Our Details
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero_Banner;
