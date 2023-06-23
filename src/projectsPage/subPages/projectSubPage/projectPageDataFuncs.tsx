import { ProjectItem } from "../../../utilities/types/types";
import getUnixTime from "date-fns/getUnixTime";
import { generateSingleImg } from "../../../utilities/helpers/generateImgDoc";
import { v4 as uuid } from "uuid";
import { submitClientAppItemsFormFunc } from "../../../utilities/helpers/submitClientAppItemsFormFunc";
import { ProjectSubPageImage } from "./ProjectSubPageImage";
import { SubmitFormFuncEventBody } from "../../../utilities/formInputs/SortableFormWrapper";
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
  const timestamp = getUnixTime(new Date());

  return () => {
    const newDoc: ProjectItem = {
      itemType: "project-item",
      subType,
      pk: {
        timestamp,
        itemType: "project-item",
      },
      id: uuid(),
      images: {},
      orderIdx: 0,
      timestamp,
      caption: "placeholder",
    };
    return newDoc;
  };
};
export const updateItemFunc = (e?: { [k: string]: FormDataEntryValue }) => {
  if (!e) return;
  const timestamp = getUnixTime(new Date());
  const idx = e.idx ? parseInt(e.idx.toString()) : 0;
  const newDoc: Partial<ProjectItem> = {
    orderIdx: idx,
    caption: e.caption ? e.caption.toString() : "",
  };
  const img = generateSingleImg({
    imgUrl: e.imgUrl?.toString(),
    placeholderUrl: e.imgPlaceholderUrl?.toString(),
    description: e.imgDescription?.toString(),
    pk: {
      itemType: "project-item-img",
      timestamp,
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
export const submitFormFunc = async (
  event?: SubmitFormFuncEventBody<ProjectItem>
) => {
  if (!event) return;
  const { e, updateItem, newImages, storedImages, token } = event;
  if (!token) return;
  return await submitClientAppItemsFormFunc({
    e,
    token: token.id_token,
    updateItem,
    newImages,
    storedImages,
    itemType: "project-item-img",
  });
};
