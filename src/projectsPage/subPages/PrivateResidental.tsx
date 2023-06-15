import ProjectSubPage from "./projectSubPage/ProjectSubPage";
import { generateProjectImagesLocation } from "./projectSubPage/generateProjectImageLocation";
const imageArr = generateProjectImagesLocation({
  folderName: "ResidentialPage",
  number: 30,
  subType: "residential",
});
const PrivateResidental = () => {
  return (
    <ProjectSubPage title="Featured Residental" projectItemArr={imageArr} />
  );
};
export default PrivateResidental;
