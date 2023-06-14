import { ServiceItem } from "../utilities/types/types";
import { v4 as uuid } from "uuid";
import { generateImgLocation } from "../utilities/helpers/generateImgLocation";
export const servicesData: ServiceItem[] = [
  {
    title: "markets",
    id: uuid(),
    itemType: "service-item",
    orderIdx: 0,
    timestamp: Date.now(),
    pk: {
      itemType: "service-item",
      orderIdx: 0,
    },
    images: {
      [uuid()]: {
        pk: {
          itemType: "service-item",
          orderIdx: 0,
        },
        id: uuid(),
        timestamp: Date.now(),
        imgUrl: generateImgLocation("ServicesPage /Services/Markets/index")
          .imgUrl,
        placeholderUrl: generateImgLocation(
          "ServicesPage /Services/Markets/index"
        ).imgPlaceholderUrl,
        description: "",
        orderIdx: 0,
      },
    },
    subCategories: [
      "Residential Design",
      "Retail Design",
      "Restaurant Design",
      "Hospitality Design ",
      "Workplace Design",
      "Pop-Up Experiences",
      "Shop-In-Shop’s",
      "Sports & Entertainment Venues",
      "Multifamily Developments",
      "Senior Living / Student Housing",
      "Experience Adaptations",
      "Landscape Design",
      "Mixed-Use",
      "Art Galleries",
    ],
  },
  {
    title: "architecture-interior",
    id: uuid(),
    itemType: "service-item",
    orderIdx: 1,
    timestamp: Date.now(),
    pk: {
      itemType: "service-item",
      orderIdx: 1,
    },
    images: {
      [uuid()]: {
        pk: {
          itemType: "service-item",
          orderIdx: 0,
        },
        id: uuid(),
        timestamp: Date.now(),
        imgUrl: generateImgLocation(
          "ServicesPage /Services/Architecture:InteriorDesign/index"
        ).imgUrl,
        placeholderUrl: generateImgLocation(
          "ServicesPage /Services/Architecture:InteriorDesign/index"
        ).imgPlaceholderUrl,
        description: "",
        orderIdx: 0,
      },
    },
    subCategories: [
      "Project Planning",
      "Floor Plans",
      "Concept Development",
      "Color & Material Selection",
      "Options Selection",
      "Artwork & Accessory",
      "Services Lighting/Ceiling Design",
      "Theme & Concept Development",
      "Sustainable Space Planning",
      "Consultation Material & Finish Selections",
      "Sustainable Space Planning",
      "Custom Cabinetry Design",
      "Adaptive Re-use",
    ],
  },
  {
    title: "furniture-manufacturing",
    id: uuid(),
    itemType: "service-item",
    orderIdx: 2,
    timestamp: Date.now(),
    pk: {
      itemType: "service-item",
      orderIdx: 2,
    },
    images: {
      [uuid()]: {
        pk: {
          itemType: "service-item",
          orderIdx: 0,
        },
        id: uuid(),
        timestamp: Date.now(),
        imgUrl: generateImgLocation(
          "ServicesPage /Services/FurnitureManufacturing/index"
        ).imgUrl,
        placeholderUrl: generateImgLocation(
          "ServicesPage /Services/FurnitureManufacturing/index"
        ).imgPlaceholderUrl,
        description: "",
        orderIdx: 0,
      },
    },
    subCategories: [
      "Custom Furniture Design",
      "Textile Technology",
      "Furniture Selection",
      "Wall Panelling Design",
      "Mirror Design",
      "Custom Cabinetry Manufacturing",
      "Custom Outdoor Furniture",
      "Custom Baby & Child",
      "Development Inventories / Re-Use Analysis",
      "Furniture Plans & Detailed Specifications",
      "Custom Interior/Exterior Doors",
    ],
  },
  {
    title: "client-visualization",
    id: uuid(),
    itemType: "service-item",
    orderIdx: 3,
    timestamp: Date.now(),
    pk: {
      itemType: "service-item",
      orderIdx: 3,
    },
    images: {
      [uuid()]: {
        pk: {
          itemType: "service-item",
          orderIdx: 0,
        },
        id: uuid(),
        timestamp: Date.now(),
        imgUrl: generateImgLocation(
          "ServicesPage /Services/ClientVisualization/index"
        ).imgUrl,
        placeholderUrl: generateImgLocation(
          "ServicesPage /Services/ClientVisualization/index"
        ).imgPlaceholderUrl,
        description: "",
        orderIdx: 0,
      },
    },
    subCategories: [
      "Animations & Renderings",
      "3D Architectural Modeling",
      "Photo-Real / Non-Photo-Real Renderings",
      "3D Animations",
      "360 Degree VR Tours",
      "Coordination Design",
      "Analysis Material & Finish",
      "Mood Boards",
    ],
  },
];
