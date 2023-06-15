import ProjectSubPage from "./ProjectSubPage";
import { generateProjectImagesLocation } from "./generateProjectImageLocation";
const imageArr = generateProjectImagesLocation({
  folderName: "ResidentialPage",
  number: 30,
  subType: "residential",
});
const PrivateResidental = () => {
  return <ProjectSubPage title="Featured Residental" projectItemArr={imageArr} />;
};
export default PrivateResidental;
