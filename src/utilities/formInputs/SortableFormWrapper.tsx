import { CognitioCredentials } from "aws-cognito-hosted-ui-provider";
import { useAuthProvider } from "../../authentication/Authentication";
import useLoadingState from "../../hooks/use-loading-state";
import { SortableListProps } from "../../hooks/use-sortable-list";
import LoadingIcon from "../loadingIcon/LoadingIcon";
import PopUpModal from "../popUpModal/PopUpModal";
import { useDropZoneProvider } from "./FormDropZone/FormDropZoneContext";
import { MediaFile, MediaLink } from "./Thumbnails";
import { unstable_batchedUpdates } from "react-dom";
export type SubmitFormFuncEventBody<T> = {
  e: React.FormEvent<HTMLFormElement>;
  updateItem?: SortableListProps<T>["updateItem"];
  newImages: MediaFile[];
  storedImages: MediaLink[];
  token: CognitioCredentials | null;
};
export const SortableFormWrapper = <T,>({
  updateItem,
  setOpenModal,
  children,
  submitFormFunc,
}: {
  updateItem?: SortableListProps<T>["updateItem"];
  setOpenModal: (open: boolean) => void;
  children?: JSX.Element | JSX.Element[] | string;
  submitFormFunc: (e?: SubmitFormFuncEventBody<T>) => Promise<void>;
}) => {
  const { newImages, storedImages, setNewImages, setStoredImages } =
    useDropZoneProvider();
  const { status, callFunction } = useLoadingState({
    asyncFunc: submitFormFunc,
  });
  const auth = useAuthProvider();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //insert any images uploaded here
    const token = await auth?.refreshAccessToken();
    await callFunction({
      e,
      updateItem,
      newImages: newImages as MediaFile[],
      storedImages,
      token: token ? token : null,
    });
    setNewImages([]);
  };
  return (
    <PopUpModal
      onClose={() => {
        unstable_batchedUpdates(() => {
          setOpenModal(false);
          setNewImages([]);
          setStoredImages([]);
        });
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
