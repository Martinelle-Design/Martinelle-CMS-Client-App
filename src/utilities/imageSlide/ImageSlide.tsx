import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const namespace = "image-slide";
export type ImageProps = {
  imgPlaceholderUrl?: string;
  imgUrl: string;
  imgDescription?: string;
};
export const ImageSlide = ({
  imgUrl,
  name,
  imgDescription,
  imgPlaceholderUrl,
}: {
  name?: string;
} & ImageProps) => (
  <div className={`${namespace}-img-slide`}>
    <div className={`${namespace}-img-container`}>
      <LazyLoadImage
        src={imgUrl}
        alt={imgDescription ? imgDescription : ""}
        placeholderSrc={imgPlaceholderUrl ? imgPlaceholderUrl : ""}
        useIntersectionObserver
        effect="blur"
      />
    </div>
    {name && <span className={`${namespace}-img-title`}>{name}</span>}
  </div>
);

export default ImageSlide;
