import { v4 as uuid } from "uuid";
import { ProjectButtonItem } from "../types/types";
import { generateImgLocation } from "../helpers/generateImgLocation";
export const projectsClickableData: ProjectButtonItem[] = [
  {
    title: "PRIVATE RESIDENTIAL",
    url: "/projects/private-residential",
    itemType: "project-button-item",
    id: uuid(),
    orderIdx: 0,
    timestamp: Date.now(),
    pk: {
      itemType: "project-button-item",
      orderIdx: 0,
    },
    images: {
      [uuid()]: {
        pk: {
          itemType: "project-button-item",
          orderIdx: 0,
        },
        id: uuid(),
        timestamp: Date.now(),
        imgUrl: generateImgLocation(
          "Homepage/home/BrowseInteriorProjects/PrivateResidential/index"
        ).imgUrl,
        placeholderUrl: generateImgLocation(
          "Homepage/home/BrowseInteriorProjects/PrivateResidential/index"
        ).imgPlaceholderUrl,
        description: "",
        orderIdx: 0,
      },
    },
  },
  {
    title: "COMMERCIAL",
    url: "/projects/commercial",
    itemType: "project-button-item",
    id: uuid(),
    orderIdx: 1,
    timestamp: Date.now(),
    pk: {
      itemType: "project-button-item",
      orderIdx: 1,
    },
    images: {
      [uuid()]: {
        pk: {
          itemType: "project-button-item",
          orderIdx: 0,
        },
        id: uuid(),
        timestamp: Date.now(),
        imgUrl: generateImgLocation(
          "Homepage/home/BrowseInteriorProjects/Commercial/index"
        ).imgUrl,
        placeholderUrl: generateImgLocation(
          "Homepage/home/BrowseInteriorProjects/Commercial/index"
        ).imgPlaceholderUrl,
        description: "",
        orderIdx: 0,
      },
    },
  },
  {
    title: "FURNITURE MANUFACTURING",
    url: "/projects/furniture-manufacturing",
    itemType: "project-button-item",
    id: uuid(),
    orderIdx: 2,
    timestamp: Date.now(),
    pk: {
      itemType: "project-button-item",
      orderIdx: 2,
    },
    images: {
      [uuid()]: {
        pk: {
          itemType: "project-button-item",
          orderIdx: 0,
        },
        id: uuid(),
        timestamp: Date.now(),
        imgUrl: generateImgLocation(
          "Homepage/home/BrowseInteriorProjects/FurnitureManufacturing /index"
        ).imgUrl,
        placeholderUrl: generateImgLocation(
          "Homepage/home/BrowseInteriorProjects/FurnitureManufacturing /index"
        ).imgPlaceholderUrl,
        description: "",
        orderIdx: 0,
      },
    },
  },
  {
    title: "HOSPITALITY",
    url: "/projects/hospitality",
    itemType: "project-button-item",
    id: uuid(),
    orderIdx: 3,
    timestamp: Date.now(),
    pk: {
      itemType: "project-button-item",
      orderIdx: 3,
    },
    images: {
      [uuid()]: {
        pk: {
          itemType: "project-button-item",
          orderIdx: 0,
        },
        id: uuid(),
        timestamp: Date.now(),
        imgUrl: generateImgLocation(
          "Homepage/home/BrowseInteriorProjects/Hospitality/index"
        ).imgUrl,
        placeholderUrl: generateImgLocation(
          "Homepage/home/BrowseInteriorProjects/Hospitality/index"
        ).imgPlaceholderUrl,
        description: "",
        orderIdx: 0,
      },
    },
  },
];
