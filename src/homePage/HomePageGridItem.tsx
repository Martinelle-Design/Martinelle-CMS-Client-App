import { HomePageItems } from "../utilities/types/types";
import { SortableListProps } from "../hooks/use-sortable-list";
import { useState } from "react";
import { Button } from "@mui/material";
import FormDropZone from "../utilities/formInputs/FormDropZone/FormDropZone";
import { MediaLink } from "../utilities/formInputs/Thumbnails";
import { CategoryFormControl } from "../utilities/formInputs/CategoryFormControl";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SortableFormWrapper } from "../utilities/formInputs/SortableFormWrapper";
import { submitFormFunc } from "./homePageDataFuncs";
import BannerSortableDndItem from "../utilities/bannerSortableDndList/BannerSortableDndItem";
// const namespace = "home-pg";
export const HomePageGridItem = ({
  idx,
  item,
  deleteItem,
  updateItem,
}: {
  item: {
    data: HomePageItems;
    el: JSX.Element;
  };
  idx: number;
} & Partial<SortableListProps<HomePageItems>>) => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(item.data);
  if (!data) return <></>;
  const imgsData = Object.entries(data.images as HomePageItems["images"]).map(
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
          <FormControl
            fullWidth
            style={{ marginBottom: "1em", marginTop: "0.7em" }}
          >
            <InputLabel>{"Banner Type"}</InputLabel>
            <Select
              name="subType"
              value={data.subType}
              label="Banner Type"
              onChange={(e) => {
                setData({
                  ...data,
                  subType: e.target.value as HomePageItems["subType"],
                });
              }}
            >
              <MenuItem value={"full-banner"}>Full Banner</MenuItem>
              <MenuItem value={"half-banner-left"}>Left-Sided Banner</MenuItem>
              <MenuItem value={"half-banner-right"}>
                Right-Sided Banner
              </MenuItem>
            </Select>
          </FormControl>
          <CategoryFormControl heading={"Banner Info"}>
            <FormControl fullWidth style={{ marginBottom: "1em" }}>
              <TextField
                name={"title"}
                label="Banner Title"
                defaultValue={data.title}
                multiline
                variant="standard"
              />
            </FormControl>
            <FormControl fullWidth style={{ marginBottom: "1em" }}>
              <TextField
                name={"textDescription"}
                label="Banner Description/Content"
                defaultValue={data.textDescription}
                multiline
                variant="standard"
              />
            </FormControl>
          </CategoryFormControl>
          <CategoryFormControl heading={"Action Button Info"}>
            <FormControl fullWidth style={{ marginBottom: "1em" }}>
              <TextField
                name={"actionBtnText"}
                label="Action Button Text"
                defaultValue={data.actionBtnData.text}
                multiline={false}
                variant="standard"
              />
            </FormControl>
            <FormControl fullWidth style={{ marginBottom: "1em" }}>
              <TextField
                name={"actionBtnUrl"}
                label="Action Button URL"
                defaultValue={data.actionBtnData.url}
                multiline={false}
                variant="standard"
              />
            </FormControl>
          </CategoryFormControl>
          <CategoryFormControl heading="Banner Image">
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
        deleteItem={deleteItem}
        setOpenModal={setOpenModal}
        idx={idx}
      />
    </>
  );
};
