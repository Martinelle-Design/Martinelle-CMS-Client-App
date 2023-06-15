import { ImageSlide } from "../imageSlide/ImageSlide";
import { Link } from "react-router-dom";
import { projectsClickableData } from "./projectsClickableData";
import PageTitle from "../pageTitle/PageTitle";
import useEditLogic from "../../hooks/use-edit-logic";
import { useRef } from "react";
import useSortableList from "../../hooks/use-sortable-list";
import { ProjectButtonItem } from "../types/types";
import {
  addItemFunc,
  updateItemFunc,
  projectButtonItemsElements,
} from "./projectClickableBannerDataFuncs";

const namespace = "projects-clickable-banner";
export const ProjectClickableBannerEditable = () => {
  const namespace = "project-page";
  return (
    <div className={namespace}>
      <PageTitle text={"Project Categories".toUpperCase()} />
      <div className={`${namespace}-text-content`}>
        <h2>{""}</h2>
        <ProjectsClickableBanner />
      </div>
    </div>
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
      addItemFunc,
      updateItemFunc,
    });
    const defaultItems = useRef<ProjectButtonItem[]>([]);
    const projectButtonItems = projectButtonItemsElements({
      items: orderedProjectButtonItems,
    });
    const { edit, editButtons } = useEditLogic<ProjectButtonItem>({
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
    <div className={`${namespace}-bottom-banner`}>
      {editButtons}

      {!edit && projectButtonItems.map((item) => item.el)}
    </div>
  );
};
export default ProjectsClickableBanner;
