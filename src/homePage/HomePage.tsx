import HomePageImageBanner from "./utilities/HomePageImageBanner";
import HomePageImageBannerFull from "./utilities/HomePageImgBannerFull";
import ProjectsClickableBanner from "../utilities/projectsClickableBanner/ProjectsClickableBanner";
import { Link } from "react-router-dom";
import ContactActionButton from "../utilities/contactActionBanner/ContactActionBanner";
import homePageData from "./homePageData";
const namespace = "home-pg";
const HomePageBottomBanner = () => {
  return (
    <>
      <div className={`${namespace}-bottom-banner-action`}>
        <h3>Browse Interior Projects</h3>
        <Link to="/projects">EXPLORE</Link>
      </div>
      <ProjectsClickableBanner />
      <ContactActionButton />
    </>
  );
};
const HomePage = () => {
  const orderedHomePageItems = homePageData.sort(
    (a, b) => a.orderIdx - b.orderIdx
  );
  return (
    <div className={`${namespace}-container`}>
      <div className={`${namespace}-inner-container`}>
        {orderedHomePageItems.map((item) => {
          const { id, subType, actionBtnData, title, textDescription, images } =
            item;
          const imgEntries = Object.entries(images);
          const imgOrder = imgEntries.sort((a, b) =>
            a[1].orderIdx > b[1].orderIdx ? 1 : -1
          );
          if (subType === "full-banner")
            return (
              <HomePageImageBannerFull
                key={id}
                customClass={`${namespace}-intro-banner`}
                imgUrl={imgOrder[0][1].imgUrl}
                imgPlaceholderUrl={imgOrder[0][1].placeholderUrl}
                imgDescription={imgOrder[0][1].description}
                btnData={{
                  text: actionBtnData.text.toUpperCase(),
                  url: actionBtnData.url,
                }}
              >
                {title}
              </HomePageImageBannerFull>
            );
          const bannerDirection =
            subType === "half-banner-left" ? "left" : "right";
          return (
            <HomePageImageBanner
              key={id}
              customClass={`${namespace}-img-banner-${bannerDirection}`}
              contentDirection={bannerDirection}
              imgUrl={imgOrder[0][1].imgUrl}
              imgPlaceholderUrl={imgOrder[0][1].placeholderUrl}
              title={title.toUpperCase()}
              btnData={{
                text: actionBtnData.text.toUpperCase(),
                url: actionBtnData.url,
              }}
            >
              {textDescription
                ? textDescription
                    .split("\n")
                    .map((item, idx) => <p key={idx}>{item}</p>)
                : []}
            </HomePageImageBanner>
          );
        })}
        <HomePageBottomBanner />
      </div>
    </div>
  );
};
export default HomePage;
