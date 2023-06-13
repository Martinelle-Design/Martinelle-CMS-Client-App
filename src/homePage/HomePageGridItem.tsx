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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const namespace = "home-pg";
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
      <form onSubmit={onSubmit} style={{ width: "85%" }}>
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
    </PopUpModal>
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
  console.log(imgsData);
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
          <FormControl fullWidth style={{ marginBottom: "1em" }}>
            <InputLabel>{"Banner Type"}</InputLabel>
            <Select
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
          <FormControl fullWidth style={{ marginBottom: "1em" }}>
            <InputLabel>{"Upload Image"}</InputLabel>
            <FormDropZone
              defaultFiles={imgData ? [imgData] : undefined}
              multiple={false}
              maxFiles={1}
              name={data?.id ? data.id : ""}
              maxSize={10 ** 7}
              mediaType="images"
              description={data?.textDescription ? data.textDescription : ""}
              includeThumbnails
            />
          </FormControl>

          <Button variant="contained" type="submit">
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
