import { Button, FormControl, TextField } from "@mui/material";
import { SortableListProps } from "../../hooks/use-sortable-list";
import { SortableFormWrapper } from "../formInputs/SortableFormWrapper";
import { MediaLink } from "../formInputs/Thumbnails";
import { ProjectButtonItem } from "../types/types";
import { useState } from "react";
import { CategoryFormControl } from "../formInputs/CategoryFormControl";
import FormDropZone from "../formInputs/FormDropZone/FormDropZone";
import BannerSortableDndItem from "../DnDKitComponents/bannerSortableDndList/BannerSortableDndItem";
import { submitFormFunc } from "./projectClickableBannerDataFuncs";
const inputHiddenStyles: React.CSSProperties = {
  opacity: 0,
  visibility: "hidden",
  lineHeight: 0,
  height: 0,
  padding: 0,
  margin: 0,
  border: "none",
};
export const ProjectButtonsGridItem = ({
  idx,
  item,
  deleteItem,
  updateItem,
  colIdx,
  totalColumns,
}: {
  item: {
    data: ProjectButtonItem;
    el: JSX.Element;
  };
  idx: number;
  colIdx?: number;
  totalColumns?: number;
} & Partial<SortableListProps<ProjectButtonItem>>) => {
  const [openModal, setOpenModal] = useState(false);
  const data = item.data;
  const imgsObj = data.images as ProjectButtonItem["images"];
  const imgsData = imgsObj
    ? Object.entries(imgsObj).map(([id, value]) => value)
    : [];
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
              label="Project Button Title"
              defaultValue={data.title}
              multiline
              variant="standard"
            />
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: "1em" }}>
            <TextField
              name={"url"}
              label="Project Button URL"
              defaultValue={data.url}
              multiline={true}
              variant="standard"
            />
          </FormControl>
          <CategoryFormControl heading="Project Button Image">
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
              multiline={true}
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
        colIdx={colIdx}
        totalColumns={totalColumns}
      />
    </>
  );
};
