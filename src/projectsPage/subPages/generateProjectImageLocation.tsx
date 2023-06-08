import { generateImgLocation } from "../../utilities/helpers/generateImgLocation";
import {v4 as uuid} from 'uuid'
export const generateProjectImagesLocation = ({
  folderName,
  number,
}: {
  folderName: string;
  number: number;
}) => {
  const arr = Array(number).fill({
    id: '',
    imgUrl: "",
    imgPlaceholderUrl: "",
    imgDescription: "",
  });
  return arr.map((img, idx) => {
    return {
      ...img,
      id: uuid(),
      ...generateImgLocation(`${folderName}/${idx + 1}/index`),
    };
  });
};
