import { ImageSlide } from "../imageSlide/ImageSlide";
import { Link } from "react-router-dom";
import { projectsClickableData } from "./projectsClickableData";
import PageTitle from "../pageTitle/PageTitle";
const namespace = "projects-clickable-banner";
export const ProjectClickableBannerEditable = () => {
  const namespace = "project-page";
  return (
    <div className={namespace}>
      <PageTitle text={"Project Categories".toUpperCase()} />
      <div className={`${namespace}-text-content`}>
        <h2>{""}</h2>
        <ProjectsClickableBanner />
      </div>
    </div>
  );
};
const ProjectsClickableBanner = () => {
  const orderedProjectButtonItems = projectsClickableData.sort(
    (a, b) => a.orderIdx - b.orderIdx
  );
  return (
    <div className={`${namespace}-bottom-banner`}>
      {orderedProjectButtonItems.map((category) => {
        const { title, images, url, id } = category;
        const imageArr = images ? Object.entries(images) : undefined;
        const image =
          imageArr && imageArr.length > 0 ? imageArr[0][1] : undefined;
        const el = url ? (
          <Link key={id} to={url} className={`${namespace}-bottom-banner-link`}>
            {image && (
              <ImageSlide
                name={title}
                imgUrl={image.imgUrl}
                imgDescription={image.description}
                imgPlaceholderUrl={image.placeholderUrl}
              />
            )}
          </Link>
        ) : (
          <button
            key={id}
            // onClick={category.onClick}
            className={`${namespace}-bottom-banner-link`}
          >
            {image && (
              <ImageSlide
                name={title}
                imgUrl={image.imgUrl}
                imgDescription={image.description}
                imgPlaceholderUrl={image.placeholderUrl}
              />
            )}
          </button>
        );
        return el;
      })}
    </div>
  );
};
export default ProjectsClickableBanner;
