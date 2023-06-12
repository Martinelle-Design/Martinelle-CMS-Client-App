import HomePageImageBanner from "./utilities/HomePageImageBanner";
import HomePageImageBannerFull from "./utilities/HomePageImgBannerFull";
import PageTitle from "../utilities/pageTitle/PageTitle";
import homePageData from "./homePageData";
import { HomePageItems } from "../utilities/types/types";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { SortableItem } from "../utilities/DnDKitComponents/SortableItem";
import useSortableList from "../hooks/use-sortable-list";
import { useRef, useState } from "react";
import { Button, Stack } from "@mui/material";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid } from "uuid";
import getUnixTime from "date-fns/getUnixTime";
const namespace = "home-pg";
const homePageItemElements = (items: HomePageItems[]) =>
  items.map((item, idx) => {
    const { id, subType, actionBtnData, title, textDescription, images } = item;
    const imgEntries = Object.entries(images);
    const imgOrder = imgEntries.sort((a, b) =>
      a[1].orderIdx > b[1].orderIdx ? 1 : -1
    );
    if (subType === "full-banner")
      return (
        <HomePageImageBannerFull
          key={id}
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
      );
    const bannerDirection = subType === "half-banner-left" ? "left" : "right";
    return (
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
  });
const HomePageGridList = ({
  items,
  activeId,
  onDragEnd,
  onDragOver,
  onDragStart,
}: {
  items: HomePageItems[];
  activeId: string | number | null;
  onDragEnd: (event: any) => void;
  onDragOver: (event: any) => void;
  onDragStart: (event: any) => void;
}) => {
  const itemElements = homePageItemElements(items).map((item, idx) => (
    <SortableItem
      key={item.key}
      id={item.key ? item.key.toString() : idx.toString()}
    >
      {item}
    </SortableItem>
  ));
  const itemElementMap = Object.fromEntries(
    Object.entries(itemElements).map(([key, value]) => [value.key, value])
  );
  return (
    <DndContext
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={() => {
          return null;
        }}
      >
        {itemElements}
        <DragOverlay adjustScale={false}>
          {activeId ? itemElementMap[activeId] : null}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};
const addItemFunc = (e?: { [k: string]: FormDataEntryValue }) => {
  if (!e) return;
  const newDoc: HomePageItems = {
    itemType: "home-page-item",
    pk: {
      orderIdx: 0,
      itemType: "home-page-item",
    },
    id: uuid(),
    subType: e.subType as HomePageItems["subType"],
    images: {},
    orderIdx: 0,
    timestamp: getUnixTime(new Date()),
    textDescription: e.textDescription
      ? e.textDescription.toString()
      : undefined,
    title: e.title ? e.title.toString() : "",
    actionBtnData: {
      text: e.actionBtnText ? e.actionBtnText.toString() : "",
      url: e.actionBtnUrl ? e.actionBtnUrl.toString() : "",
    },
  };
  return newDoc;
};
const updateItemFunc = (e?: { [k: string]: FormDataEntryValue }) => {
  if (!e) return;
  const idx = e.idx ? parseInt(e.idx.toString()) : 0;
  const newDoc: Partial<HomePageItems> = {};
  return {
    itemIdx: idx,
    item: newDoc,
  };
};
const HomePage = () => {
  const orderedHomePageItems = homePageData.sort(
    (a, b) => a.orderIdx - b.orderIdx
  );
  const {
    items,
    activeId,
    onDragEnd,
    onDragOver,
    onDragStart,
    setItems,
    addItem,
    updateItem,
  } = useSortableList<HomePageItems>({
    defaultArr: orderedHomePageItems,
    addItemFunc,
    updateItemFunc,
  });
  const defaultItems = useRef<HomePageItems[]>([]);
  const [edit, setEdit] = useState(false);
  return (
    <div className={`${namespace}-container`}>
      <div className={`${namespace}-inner-container`}>
        <PageTitle text={"Home Page".toUpperCase()} />
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"flex-end"}
          marginTop={"2em"}
        >
          {!edit && (
            <Button
              variant="contained"
              onClick={() => {
                setEdit(true);
                defaultItems.current = items;
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
              <span style={{ marginLeft: "0.5em" }}>Edit</span>
            </Button>
          )}
          {edit && (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  defaultItems.current = [];
                  setEdit(false);
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setEdit(false);
                  setItems(defaultItems.current);
                  defaultItems.current = [];
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </Stack>

        {edit && (
          <div className={`${namespace}-grid-list`}>
            <HomePageGridList
              items={items}
              activeId={activeId}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
              onDragStart={onDragStart}
            />
          </div>
        )}
        {!edit && homePageItemElements(items)}
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
