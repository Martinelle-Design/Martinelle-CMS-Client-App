import { ProjectItem } from "../../../utilities/types/types";
import getUnixTime from "date-fns/getUnixTime";
import { generateSingleImg } from "../../../utilities/helpers/generateImgDoc";
import { v4 as uuid } from "uuid";
import { MediaFile, MediaLink } from "../../../utilities/formInputs/Thumbnails";
import { SortableListProps } from "../../../hooks/use-sortable-list";
import { submitClientAppItemsFormFunc } from "../../../utilities/helpers/submitClientAppItemsFormFunc";
import { ProjectSubPageImage } from "./ProjectSubPageImage";
export const projectItemsElements = ({ items }: { items: ProjectItem[] }) => {
  const imgArr = items.map((item) => {
    const imgsObj = item.images;
    const images = imgsObj ? Object.entries(imgsObj) : [];
    const image = images.length > 0 ? images[0][1] : null;
    return {
      id: item.id,
      imgPlaceholderUrl: image ? image.placeholderUrl : "",
      imgUrl: image ? image.imgUrl : "",
      imgDescription: image ? image.description : "",
    };
  });
  return imgArr.map((img, i) => ({
    data: items[i], //this is the data that is passed to the SortableItem
    el: <ProjectSubPageImage img={img} key={img.id} />,
  }));
};
export const addItemFunc = (subType: string) => {
  if (!subType) return;
  return () => {
    const newDoc: ProjectItem = {
      itemType: "project-item",
      subType,
      pk: {
        orderIdx: 0,
        itemType: "project-item",
      },
      id: uuid(),
      images: {},
      orderIdx: 0,
      timestamp: getUnixTime(new Date()),
      caption: "placeholder",
    };
    return newDoc;
  };
};
export const updateItemFunc = (e?: { [k: string]: FormDataEntryValue }) => {
  if (!e) return;
  const idx = e.idx ? parseInt(e.idx.toString()) : 0;
  const newDoc: Partial<ProjectItem> = {
    orderIdx: idx,
    pk: {
      itemType: "project-item",
      orderIdx: idx,
    },
    caption: e.caption ? e.caption.toString() : "",
  };
  const img = generateSingleImg({
    imgUrl: e.imgUrl?.toString(),
    placeholderUrl: e.imgPlaceholderUrl?.toString(),
    description: e.imgDescription?.toString(),
    pk: {
      itemType: "project-item-img",
      orderIdx: 0,
    },
  });
  if (img)
    newDoc.images = {
      [img.id]: img,
    };

  return {
    itemIdx: idx,
    item: newDoc,
  };
};
export const submitFormFunc = async ({
  e,
  updateItem,
  newImages,
  storedImages,
}: {
  e: React.FormEvent<HTMLFormElement>;
  updateItem?: SortableListProps<ProjectItem>["updateItem"];
  newImages: MediaFile[];
  storedImages: MediaLink[];
}) => {
  return await submitClientAppItemsFormFunc({
    e,
    token: "",
    updateItem,
    newImages,
    storedImages,
    itemType: "service-item-img",
  });
};
