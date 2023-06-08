import ProjectSubPage from "./ProjectSubPage";
import { ImageProps } from "../../utilities/imageSlide/ImageSlide";
import { generateProjectImagesLocation } from "./generateProjectImageLocation";
const imageArr: (ImageProps & {
  id: string;
})[] = generateProjectImagesLocation({
  folderName: "ResidentialPage",
  number: 30,
});
const PrivateResidental = () => {
  return <ProjectSubPage title="Featured Residental" imgArr={imageArr} />;
};
export default PrivateResidental;
