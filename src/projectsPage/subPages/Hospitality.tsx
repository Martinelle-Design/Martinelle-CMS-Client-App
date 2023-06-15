import ProjectSubPage from "./projectSubPage/ProjectSubPage";
import { generateProjectImagesLocation } from "./projectSubPage/generateProjectImageLocation";
const imageArr = generateProjectImagesLocation({
  folderName: "HospitalityPage",
  number: 15,
  subType: "hospitality",
});
const Hospitality = () => {
  return (
    <ProjectSubPage
      title="Featured Hospitality"
      projectItemArr={imageArr}
      className="hospitality-pg"
    />
  );
};
export default Hospitality;
