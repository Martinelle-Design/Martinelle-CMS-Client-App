import { Button, Stack } from "@mui/material";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
type UseEditLogicProps = {
  onEdit?: () => void | Promise<void>;
  onSave?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
};
const EditButtons = ({
  edit,
  setEdit,
  onCancel,
  onSave,
  onEdit,
}: UseEditLogicProps & {
  edit: boolean;
  setEdit: (edit: boolean) => void;
}) => {
  return (
    <Stack
      direction={"row"}
      spacing={2}
      justifyContent={"center"}
      marginTop={"2em"}
      marginBottom={"0.5em"}
    >
      {!edit && (
        <Button
          variant="contained"
          onClick={() => {
            setEdit(true);
            if (onEdit) onEdit();
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
          <span style={{ marginLeft: "0.5em" }}>Edit</span>
        </Button>
      )}
      {edit && (
        <>
          <Button
            variant="contained"
            onClick={() => {
              setEdit(false);
              if (onSave) onSave();
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setEdit(false);
              if (onCancel) onCancel();
            }}
          >
            Cancel
          </Button>
        </>
      )}
    </Stack>
  );
};
const useEditLogic = <T,>({ onEdit, onSave, onCancel }: UseEditLogicProps) => {
  const [edit, setEdit] = useState(false);
  const editButtons = (
    <EditButtons
      edit={edit}
      setEdit={setEdit}
      onEdit={onEdit}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
  return {
    edit,
    setEdit,
    editButtons,
  };
};
export default useEditLogic;
