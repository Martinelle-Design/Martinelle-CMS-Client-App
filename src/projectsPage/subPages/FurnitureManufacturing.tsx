import ProjectSubPage from "./projectSubPage/ProjectSubPage";
import { generateProjectImagesLocation } from "./projectSubPage/generateProjectImageLocation";
const imageArr = generateProjectImagesLocation({
  folderName: "FurnitureManufacturingPage",
  number: 36,
  subType: "furniture-manufacturing",
});
const FurnitureManufacturing = () => {
  return (
    <ProjectSubPage
      title="Featured Furniture Manufacturing"
      projectItemArr={imageArr}
    />
  );
};
export default FurnitureManufacturing;
