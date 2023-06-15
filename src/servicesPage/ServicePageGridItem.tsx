import { Button, FormControl, TextField } from "@mui/material";
import useSortableList, { SortableListProps } from "../hooks/use-sortable-list";
import { SortableFormWrapper } from "../utilities/formInputs/SortableFormWrapper";
import { MediaLink } from "../utilities/formInputs/Thumbnails";
import { ServiceItem } from "../utilities/types/types";
import { useRef, useState, useEffect } from "react";
import BannerSortableDndItem from "../utilities/DnDKitComponents/bannerSortableDndList/BannerSortableDndItem";
import FormDropZone from "../utilities/formInputs/FormDropZone/FormDropZone";
import { CategoryFormControl } from "../utilities/formInputs/CategoryFormControl";
import { v4 as uuid } from "uuid";
import GridLayoutGrid from "../utilities/DnDKitComponents/gridLayoutComponents/GridLayoutGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { gridOnDragOver } from "../utilities/DnDKitComponents/gridLayoutComponents/gridOnDragOver";
import { useOnClickOutside } from "usehooks-ts";
import { unstable_batchedUpdates } from "react-dom";
const namespace = "services-pg";
const inputHiddenStyles: React.CSSProperties = {
  opacity: 0,
  visibility: "hidden",
  lineHeight: 0,
  height: 0,
  padding: 0,
  margin: 0,
  border: "none",
};
const submitFormFunc = async () => {};
const addItemFunc = () => {
  return {
    id: uuid(),
    content: "Placeholder",
  };
};
type CategoryInput = {
  id: string;
  content: string;
};
const ServicePageGridItemCategoryItem = ({
  item,
  idx,
  deleteItem,
  setItems,
}: {
  item: CategoryInput;
  idx: number;
} & Partial<SortableListProps<CategoryInput>>) => {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(item.content);
  const ref = useRef(null);
  const handleClickOutside = () => {
    if (!setItems) return;
    unstable_batchedUpdates(() => {
      setOpenModal(false);
      setItems((state) => {
        const newState = [...state];
        const idx = newState.findIndex((el) => el.id === item.id);
        const el = newState[idx];
        if (el?.content !== value) {
          newState[idx] = {
            ...newState[idx],
            content: value,
          };
          return newState;
        }
        return state;
      });
    });
  };
  useOnClickOutside(ref, handleClickOutside);
  useEffect(() => {
    setValue(item.content);
  }, [item.content]);
  const el = <div key={item.id}>{item.content}</div>;
  const itemData = {
    el: el,
    data: item,
  };
  return (
    <>
      {!openModal && (
        <BannerSortableDndItem
          item={itemData}
          idx={idx}
          deleteItem={deleteItem}
          setOpenModal={setOpenModal}
          fontSize="0.4rem"
        />
      )}
      {openModal && (
        <div ref={ref}>
          <TextField
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            multiline
          />
        </div>
      )}
    </>
  );
};
const ServicePageGridItemCategoriesInput = ({
  defaultArr,
}: {
  defaultArr: CategoryInput[];
}) => {
  const {
    items,
    activeId,
    onDragEnd,
    onDragOver,
    onDragStart,
    addItem,
    deleteItem,
    setItems,
  } = useSortableList<CategoryInput>({
    customOnDragOver: gridOnDragOver,
    addItemFunc,
    defaultArr,
  });
  return (
    <>
      <input readOnly value={JSON.stringify(items)} style={inputHiddenStyles} />
      <Button onClick={addItem} fullWidth variant="contained">
        <FontAwesomeIcon icon={faPlus} />
        Add
      </Button>
      <GridLayoutGrid
        items={items}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        namespace={namespace}
        columns={2}
        activeId={activeId}
      >
        {items.map((item, idx) => (
          <ServicePageGridItemCategoryItem
            key={item.id}
            item={item}
            idx={idx}
            deleteItem={deleteItem}
            setItems={setItems}
          />
        ))}
      </GridLayoutGrid>
    </>
  );
};

export const ServicePageGridItem = ({
  idx,
  item,
  deleteItem,
  updateItem,
}: {
  item: {
    data: ServiceItem;
    el: JSX.Element;
  };
  idx: number;
} & Partial<SortableListProps<ServiceItem>>) => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<
    Omit<ServiceItem, "subCategories"> & {
      subCategories: CategoryInput[];
    }
  >({
    ...item.data,
    subCategories: item.data.subCategories.map((content) => ({
      id: uuid(),
      content: content,
    })),
  });
  const imgsData = Object.entries(data.images as ServiceItem["images"]).map(
    ([id, value]) => value
  );
  const imgData: MediaLink | undefined =
    imgsData.length > 0
      ? {
          id: imgsData[0].id,
          url: imgsData[0].imgUrl,
          placeholderUrl: imgsData[0].placeholderUrl,
          description: imgsData[0].description,
          mediaType: "image",
        }
      : undefined;

  return (
    <>
      {openModal && (
        <SortableFormWrapper
          submitFormFunc={submitFormFunc}
          updateItem={updateItem}
          setOpenModal={setOpenModal}
        >
          <input name="idx" value={idx} readOnly style={inputHiddenStyles} />
          <FormControl fullWidth style={{ marginBottom: "1em" }}>
            <TextField
              name={"title"}
              label="Service Banner Title"
              defaultValue={data.title}
              multiline
              variant="standard"
            />
          </FormControl>
          <CategoryFormControl heading="Service Categories">
            <ServicePageGridItemCategoriesInput
              defaultArr={data.subCategories}
            />
          </CategoryFormControl>
          <CategoryFormControl heading="Service Banner Image">
            <FormDropZone
              defaultFiles={imgData ? [imgData] : undefined}
              multiple={false}
              maxFiles={1}
              name={imgData?.id ? imgData.id : ""}
              maxSize={10 ** 7}
              mediaType="images"
              description={"Upload Image"}
              includeThumbnails
            />
            <TextField
              name={"imgDescription"}
              label="Image Description"
              defaultValue={""}
              multiline={false}
              variant="standard"
            />
          </CategoryFormControl>
          <Button
            variant="contained"
            type="submit"
            style={{ marginBottom: "1em" }}
          >
            Save
          </Button>
        </SortableFormWrapper>
      )}
      <BannerSortableDndItem
        item={item}
        idx={idx}
        deleteItem={deleteItem}
        setOpenModal={setOpenModal}
      />
    </>
  );
};
