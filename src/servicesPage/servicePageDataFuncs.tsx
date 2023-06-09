import seperateToWords from "../utilities/helpers/seperateToWords";
import { ServiceItem } from "../utilities/types/types";
import { ServiceRow } from "./ServicesPage";
import getUnixTime from "date-fns/getUnixTime";
import { v4 as uuid } from "uuid";
import { submitClientAppItemsFormFunc } from "../utilities/helpers/submitClientAppItemsFormFunc";
import { SubmitFormFuncEventBody } from "../utilities/formInputs/SortableFormWrapper";
export const serviceItemsElements = ({ items }: { items: ServiceItem[] }) => {
  return items.map((service) => {
    const { id, images, subCategories, title } = service;
    const imgEntries = images ? Object.entries(images) : [];
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
          imgUrl={imgOrder?.[0]?.[1].imgUrl}
          imgDescription={imgOrder?.[0]?.[1].description}
          imgPlaceholderUrl={imgOrder?.[0]?.[1].placeholderUrl}
        />
      ),
    };
  });
};
export const addItemFunc = () => {
  const timestamp = getUnixTime(new Date());
  const newDoc: ServiceItem = {
    itemType: "service-item",
    pk: {
      timestamp,
      itemType: "service-item",
    },
    id: uuid(),
    images: {},
    orderIdx: 0,
    timestamp: getUnixTime(new Date()),
    subCategories: [],
    title: "Placeholder Title",
  };
  return newDoc;
};
export const updateItemFunc = (e?: { [k: string]: FormDataEntryValue }) => {
  if (!e) return;
  const idx = e.idx ? parseInt(e.idx.toString()) : 0;
  //we extract sub category arr here
  let subCategories: string[];
  try {
    const parsedArr = JSON.parse(e.subCategories.toString());
    if (!Array.isArray(parsedArr)) throw new Error();
    subCategories = parsedArr.map((subCategory) => subCategory.content);
  } catch (err) {
    subCategories = [];
  }
  const newDoc: Partial<ServiceItem> = {
    orderIdx: idx,
    title: e.title ? e.title.toString() : "",
    subCategories: subCategories,
  };
  return {
    itemIdx: idx,
    item: newDoc,
  };
};
export const submitFormFunc = async (
  event?: SubmitFormFuncEventBody<ServiceItem>
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
    itemType: "service-item-img",
  });
};
