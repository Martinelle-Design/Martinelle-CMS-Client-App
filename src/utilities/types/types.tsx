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
  timestamp: number | string;
  pk: {
    itemType: string;
    timestamp: number | string;
  };
  images?: {
    [key: string]: Image;
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
  textDescription?: string;
  title: string;
  actionBtnData: {
    text: string;
    url: string;
  };
} & GeneralProps;
export type ServiceItem = {
  itemType: "service-item";
  title: string;
  subCategories: string[];
} & GeneralProps;
export type ProjectItem = {
  itemType: "project-item";
  subType: string;
  caption?: string;
} & GeneralProps;
export type ProjectButtonItem = {
  itemType: "project-button-item";
  title: string;
  url: string;
} & GeneralProps;
