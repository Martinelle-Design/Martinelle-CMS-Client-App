import PageTitle from "../pageTitle/PageTitle";
import useEditLogic from "../../hooks/use-edit-logic";
import useSortableList, {
  SortableListProps,
} from "../../hooks/use-sortable-list";
import { ProjectButtonItem } from "../types/types";
import {
  addItemFunc,
  updateItemFunc,
  projectButtonItemsElements,
} from "./projectClickableBannerDataFuncs";
import { DropZoneProvider } from "../formInputs/FormDropZone/FormDropZoneContext";
import { ProjectButtonsGridItem } from "./ProjectsButtonGridItem";
import { BannerSortableDnDList } from "../DnDKitComponents/bannerSortableDndList/BannerSortableDndList";
import { AddItemButton } from "../formInputs/AddItemButton";
import useClientAppItems from "../../hooks/use-client-app-items";
import LoadingIcon from "../loadingIcon/LoadingIcon";
const namespace = "projects-clickable-banner";
export const ProjectClickableBannerEditable = () => {
  const namespace = "project-page";
  return (
    <div className={namespace}>
      <PageTitle text={"Project Categories".toUpperCase()} />
      <div className={`${namespace}-text-content`}>
        <ProjectsClickableBanner />
      </div>
    </div>
  );
};
const ProjectButtonsGridItemData = ({
  idx,
  item,
  updateItem,
  deleteItem,
  colIdx,
  totalColumns,
}: Partial<SortableListProps<ProjectButtonItem>> & {
  idx: number;
  colIdx?: number;
  totalColumns?: number;
  item: {
    data: ProjectButtonItem;
    el: JSX.Element;
  };
}) => {
  return (
    <DropZoneProvider key={item.el.key}>
      <ProjectButtonsGridItem
        key={item.el.key}
        idx={idx}
        item={item}
        deleteItem={deleteItem}
        updateItem={updateItem}
        colIdx={colIdx}
        totalColumns={totalColumns}
      />
    </DropZoneProvider>
  );
};
const ProjectButtonsGridList = ({
  items,
  activeId,
  onDragEnd,
  onDragOver,
  onDragStart,
  addItem,
  updateItem,
  deleteItem,
}: Partial<SortableListProps<ProjectButtonItem>>) => {
  if (!items) return <></>;
  const itemElements = projectButtonItemsElements({ items }).map(
    (item, idx) => (
      <ProjectButtonsGridItemData
        key={item.el.key}
        item={item}
        idx={idx}
        updateItem={updateItem}
        deleteItem={deleteItem}
      />
    )
  );
  return (
    <>
      <AddItemButton onClickFunc={addItem} />
      <BannerSortableDnDList
        items={items}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        namespace={namespace}
        activeId={activeId}
      >
        {itemElements}
      </BannerSortableDnDList>
    </>
  );
};
const ProjectsClickableBanner = ({ noEdit }: { noEdit?: boolean }) => {
  const {
    items: databaseItems,
    updateItems: updateDatabaseItems,
    status,
  } = useClientAppItems<ProjectButtonItem>({
    itemType: "projectButtons",
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
  } = useSortableList<ProjectButtonItem>({
    defaultArr: databaseItems,
    addItemFunc,
    updateItemFunc,
    updateDatabaseItems
  });
  const projectButtonItems = projectButtonItemsElements({
    items,
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
    <>
      {status === "loading" && (
        <LoadingIcon
          entireViewPort
          width={50}
          height={"100%"}
          backgroundColor="white"
        />
      )}
      {!noEdit && editButtons}
      {(noEdit || !edit) && (
        <div className={`${namespace}-bottom-banner`}>
          {projectButtonItems.map((item) => item.el)}
        </div>
      )}
      {!noEdit && edit && (
        <ProjectButtonsGridList
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
    </>
  );
};
export default ProjectsClickableBanner;
