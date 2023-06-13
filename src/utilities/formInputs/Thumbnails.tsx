import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { has } from "lodash";
import ReactPlayer from "react-player/lazy";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import LoadingIcon from "../loadingIcon/LoadingIcon";
import LazyLoad from "react-lazyload";
export type MediaLink = {
  id: string;
  url: string;
  description?: string;
  mediaType: "image" | "video";
};
export type MediaFileProps = {
  readonly name: string;
  preview: string;
  id: string;
};
export function isMediaLink(e: any): e is MediaLink {
  try {
    return has(e, "url") && has(e, "mediaType");
  } catch (err) {
    return false;
  }
}
export function isMediaFile(e: any): e is MediaFile {
  try {
    return has(e, "name") && has(e, "preview");
  } catch (err) {
    return false;
  }
}
export const generateFileMap = (files: (MediaFileProps | MediaLink)[]) => {
  const map: { [key: string]: MediaFileProps | MediaLink } = {};
  for (let file of files) {
    if (!isMediaLink(file)) map[file.name] = file;
    else map[file.url] = file;
  }
  return map;
};
export interface ThumbnailProps {
  file: MediaFileProps | MediaLink;
  onRemoveThumbnail?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export type MediaFile = MediaFileProps & File;

export const ThumbnailWrapper = ({
  children,
  file,
  onRemoveThumbnail,
}: {
  children: JSX.Element;
} & ThumbnailProps): JSX.Element => {
  return (
    <>
      <button
        type="button"
        data-file-id={file.id}
        className="remove-thumbnail-btn"
        onClick={onRemoveThumbnail}
        aria-label="remove-file"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div className="form-thumbnail-inner">{children}</div>
    </>
  );
};
export const ImageThumbnail = ({ file, onRemoveThumbnail }: ThumbnailProps) => {
  const [loading, setLoading] = useState(true);
  const loadingIcon = (
    <div className="form-thumbnail-placeholder">
      <LoadingIcon />
    </div>
  );
  return (
    <div className="form-img-thumbnail">
      <ThumbnailWrapper file={file} onRemoveThumbnail={onRemoveThumbnail}>
        <>
          {loading && loadingIcon}
          <LazyLoadImage
            src={isMediaLink(file) ? file.url : file.preview}
            alt={isMediaLink(file) ? file.description : ""}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(isMediaLink(file) ? file.url : file.preview);
            }}
            useIntersectionObserver
            threshold={50}
            beforeLoad={() => {
              setLoading(false);
            }}
            placeholder={loadingIcon}
          />
        </>
      </ThumbnailWrapper>
    </div>
  );
};
export const VideoThumbnail = ({ file, onRemoveThumbnail }: ThumbnailProps) => {
  const loadingIcon = (
    <div className="form-thumbnail-placeholder">
      <LoadingIcon />
    </div>
  );
  return (
    <div className="form-video-thumbnail">
      <ThumbnailWrapper file={file} onRemoveThumbnail={onRemoveThumbnail}>
        <LazyLoad
          style={{ width: "100%", height: "100%" }}
          placeholder={loadingIcon}
          offset={50}
        >
          <ReactPlayer
            url={isMediaLink(file) ? file.url : file.preview}
            controls
            width={"100%"}
            height={"100%"}
            fallback={loadingIcon}
            alt={isMediaLink(file) ? file.description : ""}
          />
        </LazyLoad>
      </ThumbnailWrapper>
    </div>
  );
};
