import ProjectSubPage from "./ProjectSubPage";
import { generateProjectImagesLocation } from "./generateProjectImageLocation";
const imageArr = generateProjectImagesLocation({
  folderName: "CommercialPage", 
  number: 18,
  subType: "commercial",
});
const Commercial = () => {
  return <ProjectSubPage title="Featured Commercial" projectItemArr={imageArr} />;
};
export default Commercial;
