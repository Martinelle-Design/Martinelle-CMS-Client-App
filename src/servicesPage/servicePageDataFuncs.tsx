import seperateToWords from "../utilities/helpers/seperateToWords";
import { ServiceItem } from "../utilities/types/types";
import { ServiceRow } from "./ServicesPage";
import getUnixTime from "date-fns/getUnixTime";
import { generateSingleImg } from "../utilities/helpers/generateImgDoc";
import { v4 as uuid } from "uuid";

export const serviceItemsElements = ({ items }: { items: ServiceItem[] }) => {
  return items.map((service) => {
    const { id, images, subCategories, title } = service;
    const imgEntries = Object.entries(images);
    const imgOrder = imgEntries.sort((a, b) =>
      a[1].orderIdx > b[1].orderIdx ? 1 : -1
    );
    const newTitle = seperateToWords(title).toUpperCase();
    return {
      data: service,
      el: (
        <ServiceRow
          items={subCategories}
          title={newTitle}
          key={id}
          imgUrl={imgOrder[0][1].imgUrl}
          imgDescription={imgOrder[0][1].description}
          imgPlaceholderUrl={imgOrder[0][1].placeholderUrl}
        />
      ),
    };
  });
};
export const addItemFunc = (e?: { [k: string]: FormDataEntryValue }) => {
  if (!e) return;
  const newDoc: ServiceItem = {
    itemType: "service-item",
    pk: {
      orderIdx: 0,
      itemType: "service-item",
    },
    id: uuid(),
    images: {},
    orderIdx: 0,
    timestamp: getUnixTime(new Date()),
    subCategories: [],
    title: e.title ? e.title.toString() : "",
  };
  return newDoc;
};
export const updateItemFunc = (e?: { [k: string]: FormDataEntryValue }) => {
  if (!e) return;
  const idx = e.idx ? parseInt(e.idx.toString()) : 0;
  const newDoc: Partial<ServiceItem> = {
    orderIdx: idx,
    pk: {
      itemType: "service-item",
      orderIdx: idx,
    },
    title: e.title ? e.title.toString() : "",
    //we need to add a subcategory logic here...
    subCategories: [],
  };
  const img = generateSingleImg({
    imgUrl: e.imgUrl?.toString(),
    placeholderUrl: e.imgPlaceholderUrl?.toString(),
    description: e.imgDescription?.toString(),
    pk: {
      itemType: "home-pg-item-img",
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
