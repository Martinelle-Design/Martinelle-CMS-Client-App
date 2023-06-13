import PageTitle from "../utilities/pageTitle/PageTitle";
import homePageData from "./homePageData";
import { HomePageItems } from "../utilities/types/types";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { SortableItem } from "../utilities/DnDKitComponents/SortableItem";
import useSortableList, { SortableListProps } from "../hooks/use-sortable-list";
import { useRef, useState } from "react";
import { Button, Stack } from "@mui/material";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createPortal } from "react-dom";
import {
  homePageItemElements,
  updateItemFunc,
  addItemFunc,
} from "./homePageDataFuncs";
import PopUpModal from "../utilities/popUpModal/PopUpModal";
const namespace = "home-pg";
const HomePageGridItem = ({
  idx,
  item,
  deleteItem,
  updateItem,
}: {
  item: {
    data: HomePageItems;
    el: JSX.Element;
  };
  idx: number;
} & Partial<SortableListProps<HomePageItems>>) => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<HomePageItems | undefined>(item.data);
  const btnStyles: React.CSSProperties = {
    minWidth: "2.5em",
    width: "5%",
    aspectRatio: "1",
  };
  return (
    <>
      {openModal && (
        <PopUpModal
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <form onSubmit={updateItem}>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </form>
        </PopUpModal>
      )}
      <SortableItem
        key={item.el.key}
        id={item.el.key ? item.el.key.toString() : idx.toString()}
      >
        <Stack
          direction={"row"}
          spacing={1}
          justifyContent={"flex-end"}
          style={{
            position: "absolute",
            top: "0.5em",
            right: "0.5em",
            zIndex: 3,
          }}
        >
          <Button
            variant="contained"
            color="info"
            onClick={(e) => {
              setOpenModal(true);
            }}
            data-id={item.el.key}
            style={btnStyles}
          >
            <FontAwesomeIcon icon={faEdit} style={{ height: "80%" }} />
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={(e) => {
              if (!deleteItem) return;
              deleteItem(e);
            }}
            data-id={item.el.key}
            style={btnStyles}
          >
            <FontAwesomeIcon icon={faClose} style={{ height: "100%" }} />
          </Button>
        </Stack>
        {item.el}
      </SortableItem>
    </>
  );
};
const HomePageGridList = ({
  items,
  activeId,
  onDragEnd,
  onDragOver,
  onDragStart,
  addItem,
  updateItem,
  deleteItem,
}: Partial<SortableListProps<HomePageItems>>) => {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  if (!items) return <></>;
  const itemElements = homePageItemElements(items).map((item, idx) => (
    <HomePageGridItem
      key={item.el.key}
      idx={idx}
      item={item}
      deleteItem={deleteItem}
      updateItem={updateItem}
      addItem={addItem}
    />
  ));
  const itemElementMap = Object.fromEntries(
    Object.entries(itemElements).map(([key, value]) => [value.key, value])
  );
  return (
    <div className={`${namespace}-grid-list`}>
      <div ref={(ref) => setContainerRef(ref)}></div>
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
        </SortableContext>
        {containerRef &&
          createPortal(
            <DragOverlay>
              {activeId ? itemElementMap[activeId] : null}
            </DragOverlay>,
            containerRef
          )}
      </DndContext>
    </div>
  );
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
    deleteItem,
  } = useSortableList<HomePageItems>({
    defaultArr: orderedHomePageItems,
    addItemFunc,
    updateItemFunc,
  });
  const defaultItems = useRef<HomePageItems[]>([]);
  // const [edit, setEdit] = useState(false);
  const [edit, setEdit] = useState(true);

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
          <HomePageGridList
            items={items}
            activeId={activeId}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
            addItem={addItem}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
        )}
        {!edit && homePageItemElements(items).map((item) => item.el)}
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
