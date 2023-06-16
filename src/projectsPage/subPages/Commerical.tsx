import ProjectSubPage from "./projectSubPage/ProjectSubPage";
import { generateProjectImagesLocation } from "./projectSubPage/generateProjectImageLocation";
const imageArr = generateProjectImagesLocation({
  folderName: "CommercialPage",
  number: 18,
  subType: "commercial",
});
const Commercial = () => {
  return (
    <ProjectSubPage
      title="Featured Commercial"
      projectItemArr={imageArr}
      subType="commercial"
    />
  );
};
export default Commercial;
