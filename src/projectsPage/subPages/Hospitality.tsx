import ProjectSubPage from "./ProjectSubPage";
import { ImageProps } from "../../utilities/imageSlide/ImageSlide";
import { generateProjectImagesLocation } from "./generateProjectImageLocation";
const imageArr: (ImageProps & {
  id: string;
})[] = generateProjectImagesLocation({
  folderName: "HospitalityPage",
  number: 15,
});
const Hospitality = () => {
  return (
    <ProjectSubPage
      title="Featured Hospitality"
      imgArr={imageArr}
      className="hospitality-pg"
    />
  );
};
export default Hospitality;
