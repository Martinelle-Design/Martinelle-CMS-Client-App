import { ImageSlide } from "../imageSlide/ImageSlide";
import { Link } from "react-router-dom";
import { projectsClickableData } from "./projectsClickableData";
const namespace = "projects-clickable-banner";
const ProjectsClickableBanner = () => {
  const orderedProjectButtonItems = projectsClickableData.sort(
    (a, b) => a.orderIdx - b.orderIdx
  );
  return (
    <div className={`${namespace}-bottom-banner`}>
      {orderedProjectButtonItems.map((category) => {
        const { title, images, url, id } = category;
        const el = url ? (
          <Link key={id} to={url} className={`${namespace}-bottom-banner-link`}>
            <ImageSlide
              name={title}
              imgUrl={images.imgUrl}
              imgDescription={images.description}
              imgPlaceholderUrl={images.placeholderUrl}
            />
          </Link>
        ) : (
          <button
            key={id}
            // onClick={category.onClick}
            className={`${namespace}-bottom-banner-link`}
          >
            <ImageSlide
              name={title}
              imgUrl={images.imgUrl}
              imgDescription={images.description}
              imgPlaceholderUrl={images.placeholderUrl}
            />
          </button>
        );
        return el;
      })}
    </div>
  );
};
export default ProjectsClickableBanner;
