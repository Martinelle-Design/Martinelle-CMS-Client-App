import { useState, createContext, useContext } from "react";
import { MediaFile, MediaLink } from "../Thumbnails";

interface DropZoneProviderProps {
  newImages: (MediaFile | MediaLink)[];
  newVideos: (MediaFile | MediaLink)[];
  storedImages: MediaLink[];
  storedVideos: MediaLink[];
  setStoredImages: React.Dispatch<React.SetStateAction<MediaLink[]>>
  setStoredVideos: React.Dispatch<React.SetStateAction<MediaLink[]>>
  setNewImages: React.Dispatch<React.SetStateAction<(MediaFile | MediaLink)[]>>;
  setNewVideos: React.Dispatch<React.SetStateAction<(MediaFile | MediaLink)[]>>
}
const DropZoneFileContext = createContext<DropZoneProviderProps | null>(null);
export const useDropZoneProvider = () => {
  const context = useContext(DropZoneFileContext)
  if(!context)throw new Error(
    `You must call useDropZoneProvider inside of a DropZoneProvider`
  );
  return context
}
export const DropZoneProvider = ({
  storedMedia,
  children,
}: {
  storedMedia?: {
    images?: MediaLink[];
    videos?: MediaLink[]
  };
  children: JSX.Element;
}) => {
  const [newImages, setNewImages] = useState<(MediaFile | MediaLink)[]>([])
  const [newVideos, setNewVideos] = useState<(MediaFile | MediaLink)[]>([])
  const [storedImages, setStoredImages] = useState<MediaLink[]>(storedMedia?.images ? storedMedia.images : [])
  const [storedVideos, setStoredVideos] = useState<MediaLink[]>(storedMedia?.videos ? storedMedia.videos: [])
  const wrapped = {
    newImages,
    newVideos,
    storedImages, 
    setStoredImages,
    storedVideos, 
    setStoredVideos,
    setNewImages,
    setNewVideos,
  }
  return (
    <DropZoneFileContext.Provider value={wrapped}>
      {children}
    </DropZoneFileContext.Provider>
  );
};
