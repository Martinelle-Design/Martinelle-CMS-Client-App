import PageTitle from "../../../utilities/pageTitle/PageTitle";
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
import { AddItemButton } from "../../../utilities/formInputs/AddItemButton";
import useClientAppItems from "../../../hooks/use-client-app-items";
import LoadingIcon from "../../../utilities/loadingIcon/LoadingIcon";
import { createPortal } from "react-dom";
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
      <AddItemButton onClickFunc={addItem} />
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
  subType,
}: {
  className?: string;
  title: string;
  subType: string;
}) => {
  const {
    items: databaseItems,
    updateItems: updateDatabaseItems,
    status,
  } = useClientAppItems<ProjectItem>({
    itemType: "projectsPage",
    subType: subType,
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
  } = useSortableList<ProjectItem>({
    defaultArr: databaseItems,
    addItemFunc: addItemFunc(subType),
    updateDatabaseItems,
    updateItemFunc,
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
  const projectItems = projectItemsElements({
    items,
  });
  return (
    <div className={`${namespace} ${className ? className : ""}`}>
      {status === "loading" &&
        createPortal(
          <LoadingIcon
            entireViewPort
            width={50}
            height={"100%"}
            backgroundColor="white"
            strokeColor="#154e1e"
          />,
          document.body
        )}
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
