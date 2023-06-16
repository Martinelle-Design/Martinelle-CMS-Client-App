import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Stack } from "@mui/material";
export const AddItemButton = ({
  onClickFunc,
}: {
  onClickFunc?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => any | Promise<any> | void;
}) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={onClickFunc} fullWidth>
        <FontAwesomeIcon icon={faPlus} />{" "}
        <span style={{ marginLeft: "0.5em" }}>Add Item</span>
      </Button>
    </Stack>
  );
};
