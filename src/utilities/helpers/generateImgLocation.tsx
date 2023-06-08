export const generateImgLocation = (str: string) => {
    const mediaFilesUrl = `https://${process.env.REACT_APP_MEDIA_FILES_URL}`;
    const newStr = str.replace(/ /g, "+");
    const imgSrc = `${mediaFilesUrl}/${newStr}`;
    const imgPlaceholder = `${imgSrc}-placeholder`;
    const extension = ".jpg";
    return {
      imgUrl: `${imgSrc}${extension}`,
      imgPlaceholderUrl: `${imgPlaceholder}${extension}`,
    };
  };