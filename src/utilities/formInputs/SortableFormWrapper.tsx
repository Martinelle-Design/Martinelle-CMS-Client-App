import useLoadingState from "../../hooks/use-loading-state";
import { SortableListProps } from "../../hooks/use-sortable-list";
import LoadingIcon from "../loadingIcon/LoadingIcon";
import PopUpModal from "../popUpModal/PopUpModal";
import { useDropZoneProvider } from "./FormDropZone/FormDropZoneContext";
export const SortableFormWrapper = <T,>({
  updateItem,
  setOpenModal,
  children,
  submitFormFunc
}: {
  updateItem?: SortableListProps<T>["updateItem"];
  setOpenModal: (open: boolean) => void;
    children?: JSX.Element | JSX.Element[] | string;
  submitFormFunc: (e?: any) => | Promise<void>;
}) => {
  const { newImages, storedImages, setNewImages, setStoredImages } =
    useDropZoneProvider();
  const { status, callFunction } = useLoadingState({
    asyncFunc: submitFormFunc,
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //insert any images uploaded here
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
