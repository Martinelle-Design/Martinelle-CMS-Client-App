import { SortableListProps } from "../../hooks/use-sortable-list";
import { MediaFile, MediaLink, isMediaLink } from "../formInputs/Thumbnails";
import { unstable_batchedUpdates } from "react-dom";
import { generateSingleImg, uploadImgToS3 } from "./generateImgDoc";
import { GeneralProps, Image } from "../types/types";
import { getUnixTime } from "date-fns";
import { Buffer } from "buffer";
import _ from "lodash";
window.Buffer = window.Buffer || Buffer;
const removeUndefinedVals = <T,>({
  newItems,
  itemIdx,
  newImgObj,
  imgId,
}: {
  newItems: (T &
    GeneralProps & {
      itemType: string;
    } & {
      id: string;
    })[];
  itemIdx: number;
  imgId: string;
  newImgObj: {
    [key: string]: Image;
  };
}) => {
  const imgDataObj = _(newImgObj[imgId]).omitBy(_.isUndefined).value() as Image;
  newImgObj[imgId] = imgDataObj;
  newItems[itemIdx].images = _(newImgObj).omitBy(_.isUndefined).value() as
    | {
        [key: string]: Image;
      }
    | undefined;
  const newItemsWithoutEmpty = _(newItems[itemIdx])
    .omitBy(_.isUndefined)
    .value() as T &
    GeneralProps & {
      itemType: string;
    } & {
      id: string;
    };
  return newItemsWithoutEmpty;
};
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
    await updateItem(e, true);
    return;
  }
  //we continue since we need to upload images
  const result = await updateItem(e, false);
  if (!result) return;
  const { setItems, newItems, itemIdx, data, updateDatabaseItems } = result;
  const currItemData = newItems[itemIdx];
  const createSingleDoc = generateSingleImg({});
  //update the items in the database
  const updateResources = async (
    newItems: (T &
      GeneralProps & {
        itemType: string;
      } & {
        id: string;
      })[]
  ) => {
    unstable_batchedUpdates(() => {
      setItems(newItems);
    });
    if (updateDatabaseItems) await updateDatabaseItems(newItems);
  };
  //upload content to s3 bucket
  if (isMediaLink(images[0])) {
    const {
      placeholderUrl,
      url,
      description,
      id,
      timestamp: imgTimestamp,
    } = images[0];
    const timestamp = imgTimestamp
      ? imgTimestamp.toString()
      : getUnixTime(new Date());
    const newImgObj = {
      [id]: {
        ...createSingleDoc,
        id: id,
        pk: {
          ...createSingleDoc.pk,
          timestamp,
          itemType: itemType,
        },
        timestamp,
        imgUrl: url ? url : "",
        placeholderUrl: placeholderUrl ? placeholderUrl : "",
        description: description ? description : undefined,
      },
    };
    newItems[itemIdx] = removeUndefinedVals({
      itemIdx,
      newImgObj,
      newItems,
      imgId: id,
    });
    return await updateResources(newItems);
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
  const newImgObj = {
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
  newItems[itemIdx] = removeUndefinedVals({
    itemIdx,
    newImgObj,
    newItems,
    imgId: createSingleDoc.id,
  });
  return await updateResources(newItems);
};
