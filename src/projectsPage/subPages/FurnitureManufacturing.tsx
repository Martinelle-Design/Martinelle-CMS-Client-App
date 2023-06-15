import ProjectSubPage from "./ProjectSubPage";
import { generateProjectImagesLocation } from "./generateProjectImageLocation";
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
