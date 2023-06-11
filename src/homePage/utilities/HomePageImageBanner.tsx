import { LazyLoadImage } from "react-lazy-load-image-component";
import { ImageProps } from "../../utilities/imageSlide/ImageSlide";
import { Link } from "react-router-dom";
import { useRef } from "react";
import useIntersectionObserver from "../../hooks/use-intersection-observer";
import "react-lazy-load-image-component/src/effects/blur.css";
import useElementSize from "../../hooks/use-element-size";
const namespace = "home-page-img-banner";
export type HomePageImageBannerContentProps = {
  title: string;
  children: string | JSX.Element | JSX.Element[];
  intersectionAnimation?: boolean;
  btnData: {
    text: string;
    url?: string;
    disabled?: boolean;
    onClick?: (
      e:
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
        | React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => void;
  };
};
const HomePageImageBannerContent = ({
  title,
  children,
  btnData,
  intersectionAnimation = true,
}: HomePageImageBannerContentProps) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const titleEntry = useIntersectionObserver(titleRef, {});
  const isTitleVisible = intersectionAnimation
    ? !!titleEntry?.isIntersecting
    : true;
  return (
    <div className={`${namespace}-content-container`}>
      <div className={`${namespace}-content`}>
        <h3
          ref={titleRef}
          className={`${namespace}-content-title${
            isTitleVisible ? " show" : ""
          }`}
        >
          {title}
        </h3>
        <div className={`${namespace}-content-inner-container`}>{children}</div>
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
const HomePageImageBannerImage = ({
  imgUrl,
  imgDescription,
  imgPlaceholderUrl,
}: ImageProps) => (
  <div className={`${namespace}-img-container`}>
    <LazyLoadImage
      src={imgUrl}
      alt={imgDescription ? imgDescription : ""}
      placeholderSrc={imgPlaceholderUrl ? imgPlaceholderUrl : ""}
      useIntersectionObserver
      effect="blur"
    />
  </div>
);
const HomePageImageBanner = ({
  customClass,
  contentDirection = "left",
  imgUrl,
  imgDescription,
  imgPlaceholderUrl,
  title,
  children,
  btnData,
  intersectionAnimation = true,
}: {
  intersectionAnimation?: boolean;
  customClass?: string;
  contentDirection?: "left" | "right";
} & ImageProps &
  HomePageImageBannerContentProps) => {
  return (
    <div
      className={`${namespace}-container${
        customClass ? " " + customClass : ""
      }`}
    >
      {contentDirection === "left" && (
        <HomePageImageBannerImage
          imgUrl={imgUrl}
          imgDescription={imgDescription}
          imgPlaceholderUrl={imgPlaceholderUrl}
        />
      )}
      <HomePageImageBannerContent
        title={title}
        btnData={btnData}
        intersectionAnimation={intersectionAnimation}
      >
        {children}
      </HomePageImageBannerContent>
      {contentDirection === "right" && (
        <HomePageImageBannerImage
          imgUrl={imgUrl}
          imgDescription={imgDescription}
          imgPlaceholderUrl={imgPlaceholderUrl}
        />
      )}
    </div>
  );
};
export default HomePageImageBanner;
