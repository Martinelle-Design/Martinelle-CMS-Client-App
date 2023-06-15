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
import { gridOnDragOver } from "../DnDKitComponents/gridLayoutComponents/gridOnDragOver";
import GridLayoutGrid from "../DnDKitComponents/gridLayoutComponents/GridLayoutGrid";
import useWindowWidth from "../../hooks/use-window-width";
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
  const mediumWindowWidth = useWindowWidth(768);
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
    <GridLayoutGrid
      items={items}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      namespace={namespace}
      columns={mediumWindowWidth ? 4 : 2}
      activeId={activeId}
    >
      {itemElements}
    </GridLayoutGrid>
  );
};
const ProjectsClickableBanner = () => {
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
    customOnDragOver: gridOnDragOver,
    addItemFunc,
    updateItemFunc,
  });
  const defaultItems = useRef<ProjectButtonItem[]>([]);
  const projectButtonItems = projectButtonItemsElements({
    items: orderedProjectButtonItems,
  });
  const edit = true;
  const {
    //edit,
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
      {editButtons}
      <div className={`${namespace}-bottom-banner`}>
        {!edit && projectButtonItems.map((item) => item.el)}
        {edit && (
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
