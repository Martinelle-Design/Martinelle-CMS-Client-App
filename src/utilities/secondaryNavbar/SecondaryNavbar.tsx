import AdaptiveCarousel from "../adaptiveCarousel/AdaptiveCarousel";
const namespace = "secondary-navbar";
export const pages = [
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
  { name: "Projects", url: "/projects" },
  { name: "Project Categories", url: "/project-categories" },
];
const pagesArr = pages.map((e) => ({
  url: e.url,
  id: e.url,
  children: e.name.toUpperCase(),
}));
const SecondaryNavbar = () => {
  return (
    <div className={`${namespace}-container`}>
      <AdaptiveCarousel
        arr={pagesArr}
        classPrefix={namespace}
        spaceBetween={0}
      />
    </div>
  );
};
export default SecondaryNavbar;
