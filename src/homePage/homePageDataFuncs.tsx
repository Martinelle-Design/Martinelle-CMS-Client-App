import HomePageImageBanner from "./utilities/HomePageImageBanner";
import HomePageImageBannerFull from "./utilities/HomePageImgBannerFull";
import { HomePageItems } from "../utilities/types/types";
import { v4 as uuid } from "uuid";
import getUnixTime from "date-fns/getUnixTime";
import { generateSingleImg } from "../utilities/helpers/generateImgDoc";
import { submitClientAppItemsFormFunc } from "../utilities/helpers/submitClientAppItemsFormFunc";
import { SubmitFormFuncEventBody } from "../utilities/formInputs/SortableFormWrapper";
const namespace = "home-pg";
export const submitFormFunc = async (
  event?: SubmitFormFuncEventBody<HomePageItems>
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
    itemType: "home-page-img",
  });
};
export const homePageItemElements = (items: HomePageItems[]) =>
  items.map((item, idx) => {
    const { id, subType, actionBtnData, title, textDescription, images } = item;
    const imgEntries = images ? Object.entries(images) : [];
    const imgOrder = imgEntries.sort((a, b) =>
      a[1].orderIdx > b[1].orderIdx ? 1 : -1
    );
    const newItem = {
      data: item,
      el: <></>,
    };
    if (subType === "full-banner") {
      newItem.el = (
        <HomePageImageBannerFull
          key={id}
          customClass={`${namespace}-intro-banner`}
          imgUrl={imgOrder?.[0]?.[1]?.imgUrl}
          imgPlaceholderUrl={imgOrder?.[0]?.[1]?.placeholderUrl}
          imgDescription={imgOrder?.[0]?.[1]?.description}
          intersectionAnimation={false}
          btnData={{
            text: actionBtnData.text.toUpperCase(),
            url: actionBtnData.url,
            disabled: true,
          }}
        >
          {title}
        </HomePageImageBannerFull>
      );
      return newItem;
    }

    const bannerDirection = subType === "half-banner-left" ? "left" : "right";
    newItem.el = (
      <HomePageImageBanner
        key={id}
        customClass={`${namespace}-img-banner-${bannerDirection}`}
        contentDirection={bannerDirection}
        imgUrl={imgOrder[0][1].imgUrl}
        imgPlaceholderUrl={imgOrder[0][1].placeholderUrl}
        title={title.toUpperCase()}
        intersectionAnimation={false}
        btnData={{
          text: actionBtnData.text.toUpperCase(),
          url: actionBtnData.url,
          disabled: true,
        }}
      >
        {textDescription
          ? textDescription
              .split("\n")
              .map((item, idx) => <p key={idx}>{item}</p>)
          : []}
      </HomePageImageBanner>
    );
    return newItem;
  });
export const addItemFunc = () => {
  const timestamp = getUnixTime(new Date());
  const newDoc: HomePageItems = {
    itemType: "home-page-item",
    pk: {
      timestamp,
      itemType: "home-page-item",
    },
    id: uuid(),
    subType: "full-banner",
    images: {},
    orderIdx: 0,
    timestamp: getUnixTime(new Date()),
    textDescription: "",
    title: "Placeholder Title",
    actionBtnData: {
      text: "Learn More",
      url: "/home",
    },
  };
  return newDoc;
};
export const updateItemFunc = (e?: { [k: string]: FormDataEntryValue }) => {
  if (!e) return;
  const idx = e.idx ? parseInt(e.idx.toString()) : 0;
  const timestamp = getUnixTime(new Date());
  const newDoc: Partial<HomePageItems> = {
    orderIdx: idx,
    subType: e.subType as HomePageItems["subType"],
    textDescription: e.textDescription
      ? e.textDescription.toString()
      : undefined,
    title: e.title ? e.title.toString() : "",
    actionBtnData: {
      text: e.actionBtnText ? e.actionBtnText.toString() : "",
      url: e.actionBtnUrl ? e.actionBtnUrl.toString() : "",
    },
  };
  const img = generateSingleImg({
    imgUrl: e.imgUrl?.toString(),
    placeholderUrl: e.imgPlaceholderUrl?.toString(),
    description: e.imgDescription?.toString(),
    pk: {
      itemType: "home-pg-item-img",
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
