import { HomePageItems } from "../utilities/types/types";
import { v4 as uuid } from "uuid";
import { generateImgLocation } from "../utilities/helpers/generateImgLocation";
const homePageData: HomePageItems[] = [
  {
    id: uuid(),
    itemType: "home-page-item",
    title: "Creating Unique Functional Interiors & Crafting Custom Furniture",
    orderIdx: 0,
    timestamp: Date.now(),
    subType: "full-banner",
    pk: {
      itemType: "home-page-item",
      orderIdx: 0,
    },
    actionBtnData: {
      text: "Learn More".toUpperCase(),
      url: "/about",
    },
    images: {
      [uuid()]: {
        pk: {
          itemType: "home-page-item",
          orderIdx: 0,
        },
        id: uuid(),
        timestamp: Date.now(),
        imgUrl: generateImgLocation("Homepage/home/MainImage/index").imgUrl,
        placeholderUrl: generateImgLocation("Homepage/home/MainImage/index")
          .imgPlaceholderUrl,
        description: "",
        orderIdx: 0,
      },
    },
  },
  {
    id: uuid(),
    itemType: "home-page-item",
    title: "Services",
    orderIdx: 1,
    timestamp: Date.now(),
    subType: "half-banner-left",
    textDescription:
      "Our services offer a customized and comprehensive approach to design. We help you envision the full potential of your interior, by ensuring your project is delivered to the highest quality.\n Custom designed furniture is our speciality. Our pieces are created exclusively for your interior. We take pride in assuring each piece not only fits the space perfectly, but that it also reflects our client’s personality.",
    pk: {
      itemType: "home-page-item",
      orderIdx: 1,
    },
    actionBtnData: {
      text: "Show More".toUpperCase(),
      url: "/services",
    },
    images: {
      [uuid()]: {
        pk: {
          itemType: "home-page-item",
          orderIdx: 0,
        },
        id: uuid(),
        timestamp: Date.now(),
        imgUrl: generateImgLocation("Homepage/home/ServicesImage/index").imgUrl,
        placeholderUrl: generateImgLocation("Homepage/home/ServicesImage/index")
          .imgPlaceholderUrl,
        description: "",
        orderIdx: 0,
      },
    },
  },
  {
    id: uuid(),
    itemType: "home-page-item",
    title: "Projects",
    orderIdx: 2,
    timestamp: Date.now(),
    subType: "half-banner-right",
    textDescription:
      "Martinelle excels at building character in all our commercial and residential projects. Our priority is to make sure the identity of your brand is present in every corner, detail and accent.\nWe are fully committed to a design concept that meets your vision from the functionality, aesthetic and ambiance perspective.",
    pk: {
      itemType: "home-page-item",
      orderIdx: 2,
    },
    actionBtnData: {
      text: "Show More".toUpperCase(),
      url: "/projects",
    },
    images: {
      [uuid()]: {
        pk: {
          itemType: "home-page-item",
          orderIdx: 0,
        },
        id: uuid(),
        timestamp: Date.now(),
        imgUrl: generateImgLocation("Homepage/home/ProjectsImage/index").imgUrl,
        placeholderUrl: generateImgLocation("Homepage/home/ProjectsImage/index")
          .imgPlaceholderUrl,
        description: "",
        orderIdx: 0,
      },
    },
  },
];

export default homePageData;
