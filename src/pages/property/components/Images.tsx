import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

import UploadDnd from "src/components/upload/UploadDnd";
import GalleryManager from "src/components/GalleryManager";

interface IImageSectionProps {
  images: string[];
  setFiles: Dispatch<SetStateAction<string[]>>;
}

const ImagesSection: React.FC<IImageSectionProps> = ({ images, setFiles }) => {

  const [galleryImage, setGalleryImage] = useState<string>();
  const [galleryManagerOpen, setGalleryManagerOpen] = useState(false);

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([
        ...images.map((image) => {
          return image;
        }),
        ...acceptedFiles.map((file) => URL.createObjectURL(file)),
      ]);
    },
    [images]
  );

  const handleRemoveFile = (input: File | string) => {
    const filtered = images.filter((image) => image !== input);
    setFiles(filtered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleImageClick = (image: string) => {
    setGalleryImage(image);
    setGalleryManagerOpen(true);
  }

  return (
    <>
      <Card>
        <CardHeader title="Upload Images" />
        <CardContent>
          <UploadDnd
            multiple
            thumbnail={true}
            files={images}
            onImageClick={handleImageClick}
            onDrop={handleDropMultiFile}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
          />
        </CardContent>
      </Card>

      {galleryImage &&
        <GalleryManager open={galleryManagerOpen} image={galleryImage} onClose={() => {
          setGalleryManagerOpen(false);
        }} onDelete={(image: string) => {
          handleRemoveFile(image);
          setGalleryManagerOpen(false);
        }} />
      }

    </>
  );
};
export default ImagesSection;
