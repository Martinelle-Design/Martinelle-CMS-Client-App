import { SortableListProps } from "../../hooks/use-sortable-list";
import { MediaFile, MediaLink, isMediaLink } from "../formInputs/Thumbnails";
import { unstable_batchedUpdates } from "react-dom";
import { generateSingleImg, uploadImgToS3 } from "./generateImgDoc";
import { GeneralProps } from "../types/types";
export const submitClientAppItemsFormFunc = async <T,>({
  e,
  updateItem,
  newImages,
  storedImages,
  itemType,
  token,
}: {
  e: React.FormEvent<HTMLFormElement>;
  updateItem?: SortableListProps<
    T & GeneralProps & { itemType: string }
  >["updateItem"];
  newImages: MediaFile[];
  storedImages: MediaLink[];
  itemType: string;
  token: string;
}) => {
  if (!updateItem) return;
  //this means there's no images to upload, so we can immeaditely update
  const images = [...newImages, ...storedImages];
  if (images.length <= 0) {
    updateItem(e);
    return;
  }
  //we continue since we need to upload images
  const result = updateItem(e, false);
  if (!result) return;
  const { setItems, newItems, itemIdx, data } = result;
  const currItemData = newItems[itemIdx];
  const createSingleDoc = generateSingleImg({});
  //upload content to s3 bucket
  if (isMediaLink(images[0])) {
    const { placeholderUrl, url, description } = images[0];
    if (!placeholderUrl || !url) return;
    newItems[itemIdx].images = {
      ...currItemData.images,
      [createSingleDoc.id]: {
        ...createSingleDoc,
        pk: {
          ...createSingleDoc.pk,
          itemType: itemType,
        },
        imgUrl: url,
        placeholderUrl: placeholderUrl,
        description: description ? description : undefined,
      },
    };
    unstable_batchedUpdates(() => {
      setItems(newItems);
    });
    return;
  }
  const fileData = images[0];
  const arrayBuffer = await fileData.file.arrayBuffer();
  const { imgUrl, imgPlaceholderUrl } = await uploadImgToS3({
    token: token,
    itemType: currItemData.itemType,
    id: currItemData.id,
    resizeProps: {
      mimeType: fileData.file.type,
      fileBuffer: Buffer.from(arrayBuffer),
    },
  });
  newItems[itemIdx].images = {
    ...currItemData.images,
    [createSingleDoc.id]: {
      ...createSingleDoc,
      pk: {
        ...createSingleDoc.pk,
        itemType: itemType,
      },
      imgUrl: imgUrl,
      placeholderUrl: imgPlaceholderUrl,
      description: data.imgDescription.toString(),
    },
  };
  unstable_batchedUpdates(() => {
    setItems(newItems);
  });
  return;
};