import { Link } from "react-router-dom";
import ImageSlide from "../imageSlide/ImageSlide";
import { ProjectButtonItem } from "../types/types";
import { v4 as uuid } from "uuid";
import getUnixTime from "date-fns/getUnixTime";
import { generateSingleImg } from "../helpers/generateImgDoc";
import { SubmitFormFuncEventBody } from "../formInputs/SortableFormWrapper";
import { submitClientAppItemsFormFunc } from "../helpers/submitClientAppItemsFormFunc";
const namespace = "projects-clickable-banner";
export const projectButtonItemsElements = ({
  items,
}: {
  items: ProjectButtonItem[];
}) =>
  items.map((category) => {
    const { title, images, url, id } = category;
    const imageArr = images ? Object.entries(images) : undefined;
    const image = imageArr && imageArr.length > 0 ? imageArr[0][1] : undefined;
    const el = url ? (
      <Link key={id} to={url} className={`${namespace}-bottom-banner-link`}>
        {
          <ImageSlide
            name={title}
            imgUrl={image?.imgUrl}
            imgDescription={image?.description}
            imgPlaceholderUrl={image?.placeholderUrl}
          />
        }
      </Link>
    ) : (
      <button
        key={id}
        // onClick={category.onClick}
        className={`${namespace}-bottom-banner-link`}
      >
        {
          <ImageSlide
            name={title}
            imgUrl={image?.imgUrl}
            imgDescription={image?.description}
            imgPlaceholderUrl={image?.placeholderUrl}
          />
        }
      </button>
    );
    return {
      data: category,
      el: el,
    };
  });
export const addItemFunc = () => {
  const timestamp = getUnixTime(new Date());
  const newDoc: ProjectButtonItem = {
    itemType: "project-button-item",
    id: uuid(),
    timestamp,
    pk: {
      itemType: "project-button-item",
      timestamp,
    },
    orderIdx: 0,
    title: "Placeholder Caption".toUpperCase(),
    url: "/projects",
    images: {},
  };
  return newDoc;
};
export const updateItemFunc = (e?: { [k: string]: FormDataEntryValue }) => {
  if (!e) return;
  const timestamp = getUnixTime(new Date());
  const idx = e.idx ? parseInt(e.idx.toString()) : 0;
  const newDoc: Partial<ProjectButtonItem> = {
    orderIdx: idx,
    title: e.title ? e.title.toString() : "",
    url: e.url ? e.url.toString() : "",
  };
  const img = generateSingleImg({
    imgUrl: e.imgUrl?.toString(),
    placeholderUrl: e.imgPlaceholderUrl?.toString(),
    description: e.imgDescription?.toString(),
    pk: {
      itemType: "project-button-item-img",
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
  event?: SubmitFormFuncEventBody<ProjectButtonItem>
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
    itemType: "project-button-img",
  });
};
