import { projectsClickableData } from "./projectsClickableData";
import PageTitle from "../pageTitle/PageTitle";
import useEditLogic from "../../hooks/use-edit-logic";
import { useRef } from "react";
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
  addItem,
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
        addItem={addItem}
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
        addItem={addItem}
        updateItem={updateItem}
        deleteItem={deleteItem}
      />
    )
  );
  return (
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
  );
};
const ProjectsClickableBanner = ({
  noEdit
}: {
  noEdit?: boolean;
}) => {
  const orderedProjectButtonItems = projectsClickableData.sort(
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
  } = useSortableList<ProjectButtonItem>({
    defaultArr: orderedProjectButtonItems,
    addItemFunc,
    updateItemFunc,
  });
  const defaultItems = useRef<ProjectButtonItem[]>([]);
  const projectButtonItems = projectButtonItemsElements({
    items: orderedProjectButtonItems,
  });
  const {
    edit,
    editButtons,
  } = useEditLogic<ProjectButtonItem>({
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
    <>
      {!noEdit && editButtons}
      <div className={`${namespace}-bottom-banner`}>
        {(noEdit || !edit) && projectButtonItems.map((item) => item.el)}
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
      </div>
    </>
  );
};
export default ProjectsClickableBanner;
