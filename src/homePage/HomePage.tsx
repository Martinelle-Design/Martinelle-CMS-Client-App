import PageTitle from "../utilities/pageTitle/PageTitle";
import homePageData from "./homePageData";
import { HomePageItems } from "../utilities/types/types";
import useSortableList, { SortableListProps } from "../hooks/use-sortable-list";
import { useRef } from "react";
import {
  homePageItemElements,
  updateItemFunc,
  addItemFunc,
} from "./homePageDataFuncs";
import { DropZoneProvider } from "../utilities/formInputs/FormDropZone/FormDropZoneContext";
import { HomePageGridItem } from "./HomePageGridItem";
import useEditLogic from "../hooks/use-edit-logic";
import { BannerSortableDnDList } from "../utilities/DnDKitComponents/bannerSortableDndList/BannerSortableDndList";
const namespace = "home-pg";
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
  if (!items) return <></>;
  const itemElements = homePageItemElements(items).map((item, idx) => (
    <DropZoneProvider key={item.el.key}>
      <HomePageGridItem
        key={item.el.key}
        idx={idx}
        item={item}
        deleteItem={deleteItem}
        updateItem={updateItem}
      />
    </DropZoneProvider>
  ));
  return (
    <BannerSortableDnDList
      items={items}
      activeId={activeId}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      namespace={namespace}
    >
      {itemElements}
    </BannerSortableDnDList>
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
  const { edit, editButtons } = useEditLogic<HomePageItems>({
    onCancel: () => {
      setItems(defaultItems.current);
      defaultItems.current = [];
    },
    onSave: () => {
      defaultItems.current = [];
    },
    onEdit: () => {
      defaultItems.current = items;
    },
  });
  return (
    <div className={`${namespace}-container`}>
      <div className={`${namespace}-inner-container`}>
        <PageTitle text={"Home Page".toUpperCase()} />
        {editButtons}
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