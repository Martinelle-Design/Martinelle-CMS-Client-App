import { SortableItem } from "../SortableItem";
import { Button, Stack } from "@mui/material";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SortableListProps } from "../../../hooks/use-sortable-list";
const BannerSortableDndItem = <T,>({
  item,
  idx,
  setOpenModal,
  deleteItem,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  item: {
    data: T;
    el: JSX.Element;
  };
  idx: number;
} & Partial<SortableListProps<T>>) => {
  const btnStyles: React.CSSProperties = {
    minWidth: "2.5em",
    width: "5%",
    aspectRatio: "1",
  };
  return (
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
  );
};
export default BannerSortableDndItem;
