import { HomePageItems } from "../utilities/types/types";
import { SortableItem } from "../utilities/DnDKitComponents/SortableItem";
import { SortableListProps } from "../hooks/use-sortable-list";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { submitFormFunc } from "./homePageDataFuncs";
import PopUpModal from "../utilities/popUpModal/PopUpModal";
import { useDropZoneProvider } from "../utilities/formInputs/FormDropZone/FormDropZoneContext";
import FormDropZone from "../utilities/formInputs/FormDropZone/FormDropZone";
import { MediaLink } from "../utilities/formInputs/Thumbnails";
import LoadingIcon from "../utilities/loadingIcon/LoadingIcon";
import useLoadingState from "../hooks/use-loading-state";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
// const namespace = "home-pg";
const HomePageGridItemForm = ({
  updateItem,
  setOpenModal,
  children,
}: {
  updateItem?: SortableListProps<HomePageItems>["updateItem"];
  setOpenModal: (open: boolean) => void;
  children?: JSX.Element | JSX.Element[] | string;
}) => {
  const { newImages, storedImages, setNewImages, setStoredImages } =
    useDropZoneProvider();
  const { status, callFunction } = useLoadingState({
    asyncFunc: submitFormFunc,
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    callFunction({
      e,
      updateItem,
      newImages,
      storedImages,
    });
  };
  return (
    <PopUpModal
      onClose={() => {
        setOpenModal(false);
        setNewImages([]);
        setStoredImages([]);
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          height: "100%",
          alignItems: "start",
          justifyContent: "center",
          overflow: "auto",
          maxHeight: "80vh",
        }}
      >
        <form
          onSubmit={onSubmit}
          style={{
            width: "85%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {status === "loading" && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ebebeb",
              }}
            >
              <LoadingIcon
                strokeColor="#37673F"
                backgroundColor="#ebebeb"
                width={"35%"}
              />
            </div>
          )}
          {children}
        </form>
      </div>
    </PopUpModal>
  );
};
export const CategoryFormControl = ({
  children,
  heading,
}: {
  children: JSX.Element | JSX.Element[] | string;
  heading: string;
}) => {
  const categoryBoxesStyles: React.CSSProperties = {
    marginBottom: "1em",
    padding: "7% 10%",
    boxSizing: "border-box",
    border: "1.5px solid lightgray",
    borderRadius: "0.3em",
  };
  return (
    <FormControl fullWidth style={categoryBoxesStyles}>
      <h3
        style={{
          width: "100%",
          marginTop: 0,
          fontFamily: `"Roboto","Helvetica","Arial","sans-serif"`,
        }}
      >
        {heading}
      </h3>
      {children}
    </FormControl>
  );
};
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
  const btnStyles: React.CSSProperties = {
    minWidth: "2.5em",
    width: "5%",
    aspectRatio: "1",
  };

  return (
    <>
      {openModal && (
        <HomePageGridItemForm
          updateItem={updateItem}
          setOpenModal={setOpenModal}
        >
          <input
            name="idx"
            value={idx}
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
        </HomePageGridItemForm>
      )}
      <SortableItem
        key={item.el.key}
        id={item.el.key ? item.el.key.toString() : idx.toString()}
      >
        <Stack
          direction={"row"}
          spacing={1}
          justifyContent={"flex-end"}
          style={{
            position: "absolute",
            top: "0.5em",
            right: "0.5em",
            zIndex: 3,
          }}
        >
          <Button
            variant="contained"
            color="info"
            onClick={(e) => {
              setOpenModal(true);
            }}
            data-id={item.el.key}
            style={btnStyles}
          >
            <FontAwesomeIcon icon={faEdit} style={{ height: "80%" }} />
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={(e) => {
              if (!deleteItem) return;
              deleteItem(e);
            }}
            data-id={item.el.key}
            style={btnStyles}
          >
            <FontAwesomeIcon icon={faClose} style={{ height: "100%" }} />
          </Button>
        </Stack>
        {item.el}
      </SortableItem>
    </>
  );
};
