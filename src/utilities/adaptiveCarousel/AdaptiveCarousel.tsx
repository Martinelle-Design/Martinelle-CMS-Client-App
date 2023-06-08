import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
type Slide = {
  id: string;
  url?: string;
  children?: JSX.Element | string | JSX.Element[];
};
const namespace = "adapative-carousel";
const AdaptiveCarousel = ({
  arr,
  classPrefix,
  spaceBetween = 20,
  selectedId,
}: {
  selectedId?: string;
  arr: Slide[];
  classPrefix?: string;
  spaceBetween?: number;
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      spaceBetween={spaceBetween}
      slidesPerView={"auto"}
      className={`${namespace}-nav${classPrefix ? ` ${classPrefix}-nav` : ""}`}
    >
      {arr.map((item) => {
        const isSelected = selectedId === item.id;
        return (
          <SwiperSlide key={item.id} style={{ width: "auto" }}>
            {item.url ? (
              <Link
                to={`${item.url}`}
                className={`${namespace}-nav-link${
                  classPrefix ? ` ${classPrefix}-nav-link` : ""
                }${isSelected ? " selected" : ""}`}
              >
                <span> {item.children}</span>
              </Link>
            ) : (
              item.children
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default AdaptiveCarousel;
