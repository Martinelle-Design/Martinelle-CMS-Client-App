import { Button, FormControl, TextField } from "@mui/material";
import useSortableList, { SortableListProps } from "../hooks/use-sortable-list";
import { SortableFormWrapper } from "../utilities/formInputs/SortableFormWrapper";
import { MediaLink } from "../utilities/formInputs/Thumbnails";
import { ServiceItem } from "../utilities/types/types";
import { useState } from "react";
import BannerSortableDndItem from "../utilities/DnDKitComponents/bannerSortableDndList/BannerSortableDndItem";
import FormDropZone from "../utilities/formInputs/FormDropZone/FormDropZone";
import { CategoryFormControl } from "../utilities/formInputs/CategoryFormControl";
import { v4 as uuid } from "uuid";
import GridLayoutGrid from "../utilities/DnDKitComponents/gridLayoutComponents/GridLayoutGrid";
const namespace = "services-pg";
const submitFormFunc = async () => {};
const addItemFunc = () => {
  return {
    id: uuid(),
    content: "",
  };
};
type CategoryInput = {
  id: string;
  content: string;
};
const ServicePageGridItemCategoriesInput = ({
  defaultArr,
}: {
  defaultArr: CategoryInput[];
}) => {
  const {
    items,
    onDragEnd,
    onDragOver,
    onDragStart,
    addItem,
    deleteItem,
    setItems,
  } = useSortableList<CategoryInput>({
    addItemFunc,
    defaultArr,
  });
  return (
    <GridLayoutGrid
      items={items}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      namespace={namespace}
      columns={2}
    >
      {[]}
    </GridLayoutGrid>
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
  const [data, setData] = useState(item.data);
  if (!data) return <></>;
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
          <input
            name="idx"
            value={idx}
            readOnly
            style={{
              opacity: 0,
              visibility: "hidden",
              lineHeight: 0,
              height: 0,
              padding: 0,
              margin: 0,
              border: "none",
            }}
          />
          <FormControl fullWidth style={{ marginBottom: "1em" }}>
            <TextField
              name={"title"}
              label="Service Banner Title"
              defaultValue={data.title}
              multiline
              variant="standard"
            />
          </FormControl>
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
