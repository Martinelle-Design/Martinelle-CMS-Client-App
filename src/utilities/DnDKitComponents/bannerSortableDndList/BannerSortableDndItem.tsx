import { SortableItem } from "../SortableItem";
import { Button, Stack } from "@mui/material";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SortableListProps } from "../../../hooks/use-sortable-list";
const BannerSortableDndItem = <T,>({
  item,
  idx,
  colIdx,
  setOpenModal,
  deleteItem,
  hideEditBtn,
  fontSize,
  totalColumns,
}: {
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  item: {
    data: T;
    el: JSX.Element;
  };
  idx: number;
  colIdx?: number;
  totalColumns?: number;
  hideEditBtn?: boolean;
  fontSize?: string;
} & Partial<SortableListProps<T>>) => {
  const btnStyles: React.CSSProperties = {
    minWidth: "2.5em",
    width: "5%",
    aspectRatio: "1",
    padding: "0.5em",
    fontSize: fontSize ? fontSize : "",
  };
  return (
    <SortableItem
      key={item.el.key}
      id={item.el.key ? item.el.key.toString() : idx.toString()}
      colIdx={colIdx}
      totalColumns={totalColumns}
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
        {!hideEditBtn && (
          <Button
            variant="contained"
            color="info"
            onClick={(e) => {
              if (setOpenModal) setOpenModal(true);
            }}
            data-id={item.el.key}
            style={btnStyles}
          >
            <FontAwesomeIcon icon={faEdit} style={{ height: "80%" }} />
          </Button>
        )}
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
