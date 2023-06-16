import { ImageProps } from "../../utilities/imageSlide/ImageSlide";
import { HomePageImageBannerContentProps } from "./HomePageImageBanner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useRef } from "react";
import useIntersectionObserver from "../../hooks/use-intersection-observer";

const namespace = "home-pg-img-banner-full";
const HomePageImageBannerFull = ({
  customClass,
  imgUrl,
  imgDescription,
  imgPlaceholderUrl,
  children,
  btnData,
  intersectionAnimation = true,
}: { customClass: string; intersectionAnimation?: boolean } & Partial<ImageProps> &
  Omit<HomePageImageBannerContentProps, "title">) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const titleEntry = useIntersectionObserver(titleRef, {});
  const isTitleVisible = intersectionAnimation
    ? !!titleEntry?.isIntersecting
    : true;
  return (
    <div
      className={`${namespace}-img-container${
        customClass ? " " + customClass : ""
      }`}
    >
      <LazyLoadImage
        src={imgUrl}
        placeholderSrc={imgPlaceholderUrl}
        useIntersectionObserver
        effect="blur"
        alt={imgDescription}
      />
      <div className={`${namespace}-content-container`}>
        <h3
          ref={titleRef}
          className={`${namespace}-content-title${
            isTitleVisible ? ` show` : ""
          }`}
        >
          {children}
        </h3>
        {btnData.url && !btnData.disabled ? (
          <Link
            className={`${namespace}-content-btn`}
            to={btnData.url}
            onClick={btnData.onClick}
          >
            {btnData.text}
          </Link>
        ) : (
          <button
            className={`${namespace}-content-btn`}
            onClick={btnData.onClick}
            disabled={btnData.disabled}
          >
            {btnData.text}
          </button>
        )}
      </div>
    </div>
  );
};
export default HomePageImageBannerFull;
