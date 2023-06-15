import { generateImgLocation } from "../../utilities/helpers/generateImgLocation";
import { v4 as uuid } from "uuid";
import { ProjectItem } from "../../utilities/types/types";
import { getUnixTime } from "date-fns";
export const generateProjectImagesLocation = ({
  folderName,
  number,
  subType,
}: {
  folderName: string;
  number: number;
  subType: string;
}): ProjectItem[] => {
  const arr = Array(number)
    .fill(0)
    .map((_, idx) => {
      const imgId = uuid();
      const imgData = generateImgLocation(`${folderName}/${idx + 1}/index`);
      const data: ProjectItem = {
        itemType: "project-item",
        subType,
        id: uuid(),
        caption: "",
        orderIdx: idx,
        timestamp: getUnixTime(new Date()),
        pk: {
          itemType: "project-item",
          orderIdx: idx,
        },
        images: {
          [imgId]: {
            orderIdx: 0,
            pk: {
              itemType: "project-item-img",
              orderIdx: 0,
            },
            timestamp: getUnixTime(new Date()),
            id: imgId,
            imgUrl: imgData.imgUrl,
            placeholderUrl: imgData.imgPlaceholderUrl,
            description: "",
          },
        },
      };
      return data;
    });
  return arr;
};
