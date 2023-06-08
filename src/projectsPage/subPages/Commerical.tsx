import ProjectSubPage from "./ProjectSubPage";
import { ImageProps } from "../../utilities/imageSlide/ImageSlide";
import { generateProjectImagesLocation } from "./generateProjectImageLocation";
const imageArr: (ImageProps & {
  id: string;
})[] = generateProjectImagesLocation({
  folderName: "CommercialPage", 
  number: 18,
});
const Commercial = () => {
  return <ProjectSubPage title="Featured Commercial" imgArr={imageArr} />;
};
export default Commercial;
