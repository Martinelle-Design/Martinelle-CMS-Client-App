import { LazyLoadImage } from "react-lazy-load-image-component";
import PageTitle from "../utilities/pageTitle/PageTitle";
import { servicesData } from "./servicesData";
import { ServiceItem } from "../utilities/types/types";
import { useRef } from "react";
import useSortableList, { SortableListProps } from "../hooks/use-sortable-list";
import {
  serviceItemsElements,
  addItemFunc,
  updateItemFunc,
} from "./servicePageDataFuncs";
import useEditLogic from "../hooks/use-edit-logic";
import { BannerSortableDnDList } from "../utilities/DnDKitComponents/bannerSortableDndList/BannerSortableDndList";
import { DropZoneProvider } from "../utilities/formInputs/FormDropZone/FormDropZoneContext";
import { ServicePageGridItem } from "./ServicePageGridItem";
import { AddItemButton } from "../utilities/formInputs/AddItemButton";
const namespace = "services-pg";
type ServiceRowProps = {
  title: string;
  imgUrl?: string;
  imgPlaceholderUrl?: string;
  imgDescription?: string;
  items: string[];
};
export const ServiceRow = ({
  title,
  imgUrl,
  imgPlaceholderUrl,
  imgDescription,
  items,
}: ServiceRowProps) => {
  return (
    <div className={`${namespace}-row`}>
      <h2>{title}</h2>
      <div className={`${namespace}-row-container`}>
        <div className={`${namespace}-row-img`}>
          <LazyLoadImage
            src={imgUrl}
            alt={imgDescription}
            placeholderSrc={imgPlaceholderUrl}
            effect="blur"
          />
        </div>
        <div className={`${namespace}-row-items-container`}>
          <ul className={`${namespace}-row-items`}>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
const ServicePageGridList = ({
  items,
  activeId,
  onDragEnd,
  onDragOver,
  onDragStart,
  addItem,
  updateItem,
  deleteItem,
}: Partial<SortableListProps<ServiceItem>>) => {
  if (!items) return <></>;
  const itemElements = serviceItemsElements({ items }).map((item, idx) => (
   
      <DropZoneProvider key={item.el.key}>
        <ServicePageGridItem
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
const ServicesPage = () => {
  const orderedServicePageItems = servicesData.sort(
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
  } = useSortableList<ServiceItem>({
    defaultArr: orderedServicePageItems,
    addItemFunc,
    updateItemFunc,
  });
  const defaultItems = useRef<ServiceItem[]>([]);
  const serviceItems = serviceItemsElements({ items: orderedServicePageItems });
  const { edit, editButtons } = useEditLogic<ServiceItem>({
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
    <div className={namespace}>
      <PageTitle text={"Services".toUpperCase()} />
      {editButtons}
      <div className={`${namespace}-rows`}>
        {!edit && serviceItems.map((serviceItem) => serviceItem.el)}
        {edit && (
          <ServicePageGridList
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
    </div>
  );
};
export default ServicesPage;
