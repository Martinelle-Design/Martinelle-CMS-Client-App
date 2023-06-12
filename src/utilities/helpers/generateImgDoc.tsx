import { Image } from "../types/types";
import { v4 as uuid } from "uuid";
import getUnixTime from "date-fns/getUnixTime";
import { ResizeProps, resizeImg } from "./resizeImg";
import axios from "axios";
export const uploadImg = async ({
  token,
  itemType,
  id,
  resizeProps,
}: {
  token: string;
  itemType: string;
  id: string;
  resizeProps: ResizeProps;
}) => {
  //get presigned urls
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    url: `${process.env.REACT_APP_API_URL}/presignImgUrls`,
    data: {
      itemType,
      id,
      mimeType: resizeProps.mimeType,
    },
  });
  const { imgKey, placeholderKey, signedImgUrl, signedImgPlaceholderUrl } =
    data;
  const file = resizeProps.fileBuffer;
  //resizeImg
  const imageWidth = resizeProps.width;
  const originalImgBuffer = resizeProps.fileBuffer;
  const newPlaceholderBuffer = await resizeImg({
    mimeType: resizeProps.mimeType,
    fileBuffer: originalImgBuffer,
    width:
      (!imageWidth && imageWidth !== 0) || imageWidth > 100 ? 100 : imageWidth,
  });
  //upload img
  const originalImgResult = axios({
    method: "PUT",
    url: signedImgUrl,
    data: file,
    headers: {
      "Content-Type": resizeProps.mimeType,
    },
  });
  const placeholderImgResult = axios({
    method: "PUT",
    url: signedImgPlaceholderUrl,
    data: newPlaceholderBuffer,
    headers: {
      "Content-Type": resizeProps.mimeType,
    },
  });
  await Promise.all([originalImgResult, placeholderImgResult]);
  return {
    imgUrl: `${process.env.REACT_APP_MEDIA_FILES_URL}/${imgKey}`,
    imgPlaceholderUrl: `${process.env.REACT_APP_MEDIA_FILES_URL}/${placeholderKey}`,
  };
};

export const generateSingleImg = (e: Partial<Image>): Image | undefined => {
  const { imgUrl, placeholderUrl, description, pk, id } = e;
  if (
    !imgUrl ||
    !placeholderUrl ||
    !pk?.itemType ||
    (!pk?.orderIdx && pk.orderIdx !== 0)
  )
    return;
  const imageId = id ? id : uuid();
  return {
    timestamp: getUnixTime(new Date()),
    pk: {
      itemType: pk?.itemType,
      orderIdx: pk?.orderIdx,
    },
    id: imageId,
    orderIdx: 0,
    imgUrl: imgUrl.toString(),
    placeholderUrl: placeholderUrl.toString(),
    description: description?.toString(),
  };
};
