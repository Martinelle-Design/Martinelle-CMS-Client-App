import PageTitle from "../utilities/pageTitle/PageTitle";
import { HomePageItems } from "../utilities/types/types";
import useSortableList, { SortableListProps } from "../hooks/use-sortable-list";
import {
  homePageItemElements,
  updateItemFunc,
  addItemFunc,
} from "./homePageDataFuncs";
import { DropZoneProvider } from "../utilities/formInputs/FormDropZone/FormDropZoneContext";
import { HomePageGridItem } from "./HomePageGridItem";
import useEditLogic from "../hooks/use-edit-logic";
import { BannerSortableDnDList } from "../utilities/DnDKitComponents/bannerSortableDndList/BannerSortableDndList";
import { AddItemButton } from "../utilities/formInputs/AddItemButton";
import useClientAppItems from "../hooks/use-client-app-items";
import LoadingIcon from "../utilities/loadingIcon/LoadingIcon";
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
    <>
      <AddItemButton onClickFunc={addItem} />
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
    </>
  );
};
const HomePage = () => {
  const {
    items: databaseItems,
    updateItems: updateDatabaseItems,
    status,
  } = useClientAppItems<HomePageItems>({
    itemType: "homePage",
  });
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
    defaultArr: databaseItems,
    addItemFunc,
    updateItemFunc,
    updateDatabaseItems,
  });
  const { edit, editButtons } = useEditLogic({
    onCancel: () => {
      setItems(databaseItems);
    },
    onSave: () => {
      updateDatabaseItems(items);
    },
    onEdit: () => {
      setItems(databaseItems);
    },
  });
  return (
    <div className={`${namespace}-container`}>
      {status === "loading" && (
        <LoadingIcon
          entireViewPort
          width={50}
          height={"100%"}
          backgroundColor="white"
        />
      )}
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
