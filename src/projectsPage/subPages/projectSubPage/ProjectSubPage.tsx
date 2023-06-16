import PageTitle from "../../../utilities/pageTitle/PageTitle";
import { useRef } from "react";
import { ProjectItem } from "../../../utilities/types/types";
import useEditLogic from "../../../hooks/use-edit-logic";
import {
  projectItemsElements,
  addItemFunc,
  updateItemFunc,
} from "./projectPageDataFuncs";
import useSortableList, {
  SortableListProps,
} from "../../../hooks/use-sortable-list";
import { BannerSortableDnDList } from "../../../utilities/DnDKitComponents/bannerSortableDndList/BannerSortableDndList";
import { DropZoneProvider } from "../../../utilities/formInputs/FormDropZone/FormDropZoneContext";
import { ProjectItemsGridItem } from "./ProjectItemsGridItem";
const namespace = "project-subpage-pg";
const ProjectButtonsGridItemData = ({
  idx,
  item,
  addItem,
  updateItem,
  deleteItem,
  colIdx,
  totalColumns,
}: Partial<SortableListProps<ProjectItem>> & {
  idx: number;
  colIdx?: number;
  totalColumns?: number;
  item: {
    data: ProjectItem;
    el: JSX.Element;
  };
}) => {
  return (
    <DropZoneProvider key={item.el.key}>
      <ProjectItemsGridItem
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
const ProjectItemsGridList = ({
  items,
  activeId,
  onDragEnd,
  onDragOver,
  onDragStart,
  addItem,
  updateItem,
  deleteItem,
}: Partial<SortableListProps<ProjectItem>>) => {
  if (!items) return <></>;
  const itemElements = projectItemsElements({ items }).map((item, idx) => (
    <ProjectButtonsGridItemData
      key={item.el.key}
      item={item}
      idx={idx}
      updateItem={updateItem}
      deleteItem={deleteItem}
    />
  ));
  return (
    <>
      
      <BannerSortableDnDList
        items={items}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        namespace={namespace}
        activeId={activeId}
        itemWrapper
      >
        {itemElements}
      </BannerSortableDnDList>
    </>
  );
};
const ProjectSubPage = ({
  className,
  title,
  projectItemArr,
}: {
  className?: string;
  title: string;
  projectItemArr: ProjectItem[];
}) => {
  const orderedProjectItems = projectItemArr.sort(
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
  } = useSortableList<ProjectItem>({
    defaultArr: orderedProjectItems,
    addItemFunc,
    updateItemFunc,
  });
  const defaultItems = useRef<ProjectItem[]>([]);
  const projectItems = projectItemsElements({
    items: orderedProjectItems,
  });
  const { edit, editButtons } = useEditLogic<ProjectItem>({
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
  console.log(edit)
  return (
    <div className={`${namespace} ${className ? className : ""}`}>
      <PageTitle text={title.toUpperCase()} />
      {editButtons}
      {!edit && (
        <div className={`${namespace}-media-container`}>
          {projectItems.map((item) => item.el)}
        </div>
      )}
      {edit && (
        <ProjectItemsGridList
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
  );
};
export default ProjectSubPage;
