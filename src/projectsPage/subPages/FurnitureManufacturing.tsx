import ProjectSubPage from "./ProjectSubPage";
import { ImageProps } from "../../utilities/imageSlide/ImageSlide";
import { generateProjectImagesLocation } from "./generateProjectImageLocation";
const imageArr: (ImageProps & {
  id: string;
})[] = generateProjectImagesLocation({
  folderName: "FurnitureManufacturingPage", 
  number: 36,
});
const FurnitureManufacturing = () => {
  return (
    <ProjectSubPage
      title="Featured Furniture Manufacturing"
      imgArr={imageArr}
    />
  );
};
export default FurnitureManufacturing;
