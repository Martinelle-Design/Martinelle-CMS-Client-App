import { ImageSlide } from "../imageSlide/ImageSlide";
import { Link } from "react-router-dom";
import { projectsClickableData } from "./projectsClickableData";
import PageTitle from "../pageTitle/PageTitle";
const namespace = "projects-clickable-banner";
export const ProjectClickableBannerEditable = () => {
  const namespace = 'project-page';
  return (
    <div className={namespace}>
      <PageTitle text={"Project Categories".toUpperCase()} />
      <div className={`${namespace}-text-content`}>
        <h2>{""}</h2>
        <ProjectsClickableBanner />
      </div>
    </div>
  )
}
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
