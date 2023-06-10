import HomePageImageBanner from "./utilities/HomePageImageBanner";
import HomePageImageBannerFull from "./utilities/HomePageImgBannerFull";
import PageTitle from "../utilities/pageTitle/PageTitle";
import homePageData from "./homePageData";
import { useState } from "react";
import { HomePageItems } from "../utilities/types/types";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { SortableItem } from "../utilities/DnDKitComponents/SortableItem";
const namespace = "home-pg";
const HomePageGridList = () => {
  const orderedHomePageItems = homePageData.sort(
    (a, b) => a.orderIdx - b.orderIdx
  );
  const [items, setItems] = useState<HomePageItems[]>(orderedHomePageItems);

  const [activeId, setActiveId] = useState<null | string | number>(null);
  const itemElements = items.map((item, idx) => {
    const { id, subType, actionBtnData, title, textDescription, images } = item;
    const imgEntries = Object.entries(images);
    const imgOrder = imgEntries.sort((a, b) =>
      a[1].orderIdx > b[1].orderIdx ? 1 : -1
    );
    if (subType === "full-banner")
      return (
        <SortableItem key={id} id={id}>
          <HomePageImageBannerFull
            customClass={`${namespace}-intro-banner`}
            imgUrl={imgOrder[0][1].imgUrl}
            imgPlaceholderUrl={imgOrder[0][1].placeholderUrl}
            imgDescription={imgOrder[0][1].description}
            intersectionAnimation={false}
            btnData={{
              text: actionBtnData.text.toUpperCase(),
              url: actionBtnData.url,
              disabled: true,
            }}
          >
            {title}
          </HomePageImageBannerFull>
        </SortableItem>
      );
    const bannerDirection = subType === "half-banner-left" ? "left" : "right";
    return (
      <SortableItem key={id} id={id}>
        <HomePageImageBanner
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
      </SortableItem>
    );
  });
  const itemElementMap = Object.fromEntries(
    Object.entries(itemElements).map(([key, value]) => [value.key, value])
  );
  return (
    <DndContext
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragEnd={(e) => {
        setActiveId(null);
        const activeData = e.active as any;
        const overData = e.over as any;
        const newItems = [...items];
        const activeId = e.active.id;
        const activeItemIdx = activeData.data?.current?.sortable?.index;
        const newActiveItemIdx = overData.data?.current?.sortable?.index;
        if (activeItemIdx === undefined || newActiveItemIdx === undefined)
          return;
        const newItem = items.find((item) => item.id === activeId);
        if (!newItem) return;
        newItems.splice(activeItemIdx, 1);
        newItems.splice(newActiveItemIdx, 0, newItem);
        setItems(newItems);
      }}
    >
      <SortableContext items={items.map((item) => item.id)}>
        {itemElements}
        <DragOverlay>{activeId ? itemElementMap[activeId] : null}</DragOverlay>
      </SortableContext>
    </DndContext>
  );
};
const HomePage = () => {
  return (
    <div className={`${namespace}-container`}>
      <div className={`${namespace}-inner-container`}>
        <PageTitle text={"Home Page".toUpperCase()} />
        <div className={`${namespace}-grid-list`}>
          <HomePageGridList />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
// import { WidthProvider, Responsive } from "react-grid-layout";
// import { Size } from "../hooks/use-element-size";
// const ResponsiveReactGridLayout = WidthProvider(Responsive);
// const GridItem: React.FC<{
//   idx: number;
//   children: JSX.Element | JSX.Element[] | string;
//   id: string;
//   // "data-grid"?: {
//   //   x: number;
//   //   y: number;
//   //   w: number;
//   //   h: number;
//   //   isBounded: boolean;
//   // };
//   ref?: React.Ref<HTMLDivElement>;
// }> = forwardRef(({ children, id, idx, ...props }, ref) => {
//   const [] = useElementSize();
//   return (
//     <div ref={ref} key={id} {...props}>
//       {children}
//     </div>
//   );
// });
// <ResponsiveReactGridLayout
//   cols={{
//     lg: 12,
//     md: 12,
//     sm: 12,
//     xs: 12,
//     xxs: 12,
//   }}
//   margin={[0, 10]}
//   autoSize={true}
//   compactType={"vertical"}
//   resizeHandle={false}
//   isResizable={false}
// >
