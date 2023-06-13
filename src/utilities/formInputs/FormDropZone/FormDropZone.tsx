import { faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, memo } from "react";
import { unstable_batchedUpdates } from "react-dom";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import LoadingIcon from "../../loadingIcon/LoadingIcon";
import { v4 as uuid } from "uuid";
import {
  MediaLink,
  MediaFile,
  VideoThumbnail,
  ImageThumbnail,
  generateFileMap,
  isMediaLink,
} from "../Thumbnails";
import { useDropZoneProvider } from "./FormDropZoneContext";
interface FormDropZoneProps {
  name: string;
  maxSize: number;
  maxFiles: number;
  description: string | JSX.Element;
  mediaType: "videos" | "images";
  className?: string;
  defaultFiles?: MediaLink[];
  includeThumbnails?: boolean;
}
interface ErrorProps {
  err: boolean;
  files: FileRejection[];
}
export const StoredMedia = memo(
  ({
    mediaType,
    files,
  }: {
    mediaType: "images" | "videos";
    files?: MediaLink[];
  }) => {
    const { storedImages, storedVideos, setStoredImages, setStoredVideos } =
      useDropZoneProvider();
    useEffect(() => {
      let mounted = true;
      if (files && mounted) {
        if (mediaType === "images") setStoredImages(files);
        else if (mediaType === "videos") setStoredVideos(files);
      }
      return () => {
        mounted = false;
      };
    }, [files, mediaType, setStoredImages, setStoredVideos]);
    const onRemoveThumbnail = (e: React.MouseEvent<HTMLButtonElement>) => {
      //const fileName = e.currentTarget.dataset["fileName"];
      // if (mediaType === "images")
      //   setStoredImages((files) => files.filter((file) => file !== fileName));
      // if (mediaType === "videos")
      //   setStoredVideos((files) => files.filter((file) => file !== fileName));
    };
    const thumbnails =
      mediaType === "images"
        ? storedImages 
        : mediaType === "videos"
        ? storedVideos
        : [];

    return (
      <>
        {mediaType === "images" &&
          thumbnails.map((file) => (
            <ImageThumbnail
              key={file.id}
              file={file}
              onRemoveThumbnail={onRemoveThumbnail}
            />
          ))}
        {mediaType === "videos" &&
          thumbnails.map((file) => (
            <VideoThumbnail
              key={file.id}
              file={file}
              onRemoveThumbnail={onRemoveThumbnail}
            />
          ))}
      </>
    );
  }
);
const FormDropZone = ({
  name,
  maxSize,
  maxFiles,
  description,
  mediaType,
  className,
  defaultFiles,
  includeThumbnails = true,
}: FormDropZoneProps) => {
  const { newImages, newVideos, setNewImages, setNewVideos } =
    useDropZoneProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<ErrorProps>({
    err: false,
    files: [],
  });
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    let mounted = true;
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      if (mounted && mediaType === "images")
        newImages.forEach((file) => {
          URL.revokeObjectURL(isMediaLink(file) ? file.url : file.preview);
        });
      if (mounted && mediaType === "videos")
        newVideos.forEach((file) => {
          URL.revokeObjectURL(isMediaLink(file) ? file.url : file.preview);
        });
    };
  }, [mediaType, newImages, newVideos]);

  const onDragEnter = () => {
    setIsOver(true);
  };
  const onDragLeave = () => {
    setIsOver(false);
  };
  const onDrop = (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    unstable_batchedUpdates(() => {
      setIsOver(false);
      if (mediaType === "images")
        setNewImages((state) => {
          const map = generateFileMap(newImages);
          const allFiles = acceptedFiles.map((file) => {
            if (file.name in map) return null;
            else
              return Object.assign(file, {
                id: uuid(),
                preview: URL.createObjectURL(file),
              });
          });
          const isMediaFiles = (file: MediaFile | null): file is MediaFile =>
            file !== null;
          const newFiles: MediaFile[] = allFiles.filter(isMediaFiles);
          return [...state, ...newFiles];
        });
      if (mediaType === "videos")
        setNewVideos((state) => {
          const map = generateFileMap(newVideos);
          const allFiles = acceptedFiles.map((file) => {
            if (file.name in map) return null;
            else
              return Object.assign(file, {
                id: uuid(),
                preview: URL.createObjectURL(file),
              });
          });
          const isMediaFiles = (file: MediaFile | null): file is MediaFile =>
            file !== null;

          const newFiles: MediaFile[] = allFiles.filter(isMediaFiles);
          return [...state, ...newFiles];
        });
      setErr({
        err: fileRejections.length > 0,
        files: fileRejections,
      });
      setIsLoading(false);
    });
  };
  const onRemoveThumbnail = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileName = e.currentTarget.dataset["fileName"];
    if (mediaType === "images")
      setNewImages((files) =>
        files.filter((file) => isMediaLink(file) || file.name !== fileName)
      );
    if (mediaType === "videos")
      setNewVideos((files) =>
        files.filter((file) => isMediaLink(file) || file.name !== fileName)
      );
  };
  const onRemoveErr = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileName = e.currentTarget.dataset["fileName"];
    setErr((state) => {
      const newState = { ...state };
      const newFiles = newState.files.filter((a) => a.file.name !== fileName);
      newState.files = newFiles;
      if (newFiles.length <= 0) {
        newState.err = false;
        return newState;
      }
      return newState;
    });
  };
  const acceptedFiles: {
    [key: string]: string[];
  } =
    mediaType === "videos"
      ? { "video/*": [".mp4"] }
      : { "image/*": [".png", ".gif", ".jpeg", ".jpg"] };

  const newThumbnails =
    mediaType === "images"
      ? newImages.map((file) => (
          <ImageThumbnail
            key={isMediaLink(file) ? file.url : file.name}
            file={file}
            onRemoveThumbnail={onRemoveThumbnail}
          />
        ))
      : mediaType === "videos"
      ? newVideos.map((file) => (
          <VideoThumbnail
            key={isMediaLink(file) ? file.url : file.name}
            file={file}
            onRemoveThumbnail={onRemoveThumbnail}
          />
        ))
      : [];
  return (
    <>
      <Dropzone
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        accept={acceptedFiles}
        multiple
        maxSize={maxSize}
        maxFiles={maxFiles}
      >
        {({ getRootProps, getInputProps }) => {
          const inputProps = { ...getInputProps(), name: name, id: name };
          return (
            <section>
              <div
                {...getRootProps({
                  className: `form-inputs-dropzone ${className} ${
                    isOver ? "over-dropzone" : ""
                  }`,
                })}
              >
                {isLoading && (
                  <LoadingIcon
                    entireViewPort
                    width={50}
                    height={"100%"}
                    backgroundColor="white"
                  />
                )}
                <label htmlFor={name}>
                  <div>
                    <FontAwesomeIcon icon={faUpload} />
                  </div>
                  <span>{description}</span>
                </label>
                <input {...inputProps} />
              </div>
              {err.err && (
                <div className="form-inputs-err-container">
                  {err.files.map((f) => {
                    return (
                      <div
                        key={f.file.name}
                        className="form-inputs-dropzone-err"
                      >
                        <button
                          className="err-exit-btn"
                          aria-label={"close-error-message"}
                          data-file-name={f.file.name}
                          onClick={onRemoveErr}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <h5 className="dropzone-err-heading">{`File: ${f.file.name}`}</h5>
                        <div className="dropzone-err-body">
                          <h6>Errors:</h6>
                          {f.errors.map((e) => (
                            <li key={e.code}>{e.message}</li>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {includeThumbnails &&
                (newThumbnails.length > 0 ||
                  (defaultFiles && defaultFiles.length > 0)) && (
                  <div className="thumbnails-container">
                    {newThumbnails}
                    {<StoredMedia mediaType={mediaType} files={defaultFiles} />}
                  </div>
                )}
            </section>
          );
        }}
      </Dropzone>
    </>
  );
};
export default FormDropZone;
