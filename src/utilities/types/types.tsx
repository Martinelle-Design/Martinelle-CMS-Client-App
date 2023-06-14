export const projectSubType = [
  "residential",
  "cultural",
  "multifamily",
  "hospitality",
] as const;
export const serviceSubType = [
  "markets",
  "furniture-manufacturing",
  "architecture-interior",
  "client-visualization",
] as const;
export type GeneralProps = {
  id: string;
  orderIdx: number;
  timestamp: number;
  pk: {
    itemType: string;
    orderIdx: number;
  };
};
export type Image = {
  imgUrl: string;
  placeholderUrl: string;
  description?: string;
} & GeneralProps;
export type HomePageItems = {
  itemType: "home-page-item";
  subType: "full-banner" | "half-banner-left" | "half-banner-right";
  images: {
    [key: string]: Image;
  };
  textDescription?: string;
  title: string;
  actionBtnData: {
    text: string;
    url: string;
  };
} & GeneralProps;
export type ServiceItem = {
  itemType: "service-item";
  images: {
    [key: string]: Image;
  };
  title: string;
  subCategories: string[];
} & GeneralProps;
export type ProjectItem = {
  itemType: "project-item";
  subType: string;
  images: {
    [key: string]: Image;
  };
  caption?: string;
} & GeneralProps;
export type ProjectButtonItem = {
  itemType: "project-button-item";
  images: Image;
  title: string;
  url: string;
} & GeneralProps;
