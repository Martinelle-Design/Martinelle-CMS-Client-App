import * as Jimp from "jimp/browser/lib/jimp";
export type ResizeProps = {
  mimeType?: string | null;
  fileBuffer?: Buffer | null;
  width: number;
};
export const resizeImg = async ({
  mimeType,
  fileBuffer,
  width,
}: ResizeProps) => {
  if (!fileBuffer || !mimeType) return null;
  const img = await Jimp.default.read(fileBuffer);
  const newImg = img.resize(width, Jimp.AUTO);
  const [buffer, base64] = await Promise.all([
    newImg.getBufferAsync(mimeType),
    newImg.getBase64Async(mimeType),
  ]);
  return {
    buffer,
    base64,
  };
};
