import { Button, FormControl, TextField } from "@mui/material";
import { SortableListProps } from "../../../hooks/use-sortable-list";
import { SortableFormWrapper } from "../../../utilities/formInputs/SortableFormWrapper";
import { MediaLink } from "../../../utilities/formInputs/Thumbnails";
import { useState } from "react";
import { CategoryFormControl } from "../../../utilities/formInputs/CategoryFormControl";
import FormDropZone from "../../../utilities/formInputs/FormDropZone/FormDropZone";
import BannerSortableDndItem from "../../../utilities/DnDKitComponents/bannerSortableDndList/BannerSortableDndItem";
import { ProjectItem } from "../../../utilities/types/types";
import useWindowWidth from "../../../hooks/use-window-width";
import { submitFormFunc } from "./projectPageDataFuncs";
const inputHiddenStyles: React.CSSProperties = {
  opacity: 0,
  visibility: "hidden",
  lineHeight: 0,
  height: 0,
  padding: 0,
  margin: 0,
  border: "none",
};
export const ProjectItemsGridItem = ({
  idx,
  item,
  deleteItem,
  updateItem,
  colIdx,
  totalColumns,
}: {
  item: {
    data: ProjectItem;
    el: JSX.Element;
  };
  idx: number;
  colIdx?: number;
  totalColumns?: number;
} & Partial<SortableListProps<ProjectItem>>) => {
  const [openModal, setOpenModal] = useState(false);
  const mediumWidth = useWindowWidth(768);
  const data = item.data;
  const imgsObj = data.images as ProjectItem["images"];
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
          <CategoryFormControl heading="Project Item Image">
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
          <FormControl fullWidth style={{ marginBottom: "1em" }}>
            <TextField
              name={"caption"}
              label="Project Item Caption"
              defaultValue={data.caption}
              multiline
              variant="standard"
            />
          </FormControl>
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
        fontSize={mediumWidth ? undefined : "0.5em"}
      />
    </>
  );
};
