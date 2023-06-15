import ProjectSubPage from "./ProjectSubPage";
import { generateProjectImagesLocation } from "./generateProjectImageLocation";
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
