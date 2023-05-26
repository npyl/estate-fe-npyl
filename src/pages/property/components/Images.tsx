import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

import { SoftButton } from "src/components/SoftButton";
import UploadDnd from "src/components/upload/UploadDnd";
import GalleryManager from "src/components/GalleryManager";

interface IImageSectionProps {
  files: (File | string)[];
  setFiles: Dispatch<SetStateAction<(string | File)[]>>;
}

const ImagesSection: React.FC<IImageSectionProps> = ({ files, setFiles }) => {

  const [galleryManagerOpen, setGalleryManagerOpen] = useState(false);

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <>
      <Card>
        <CardHeader title="Upload Images" />
        <CardContent>
          <UploadDnd
            multiple
            thumbnail={true}
            files={files}
            onDrop={handleDropMultiFile}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
          />
        </CardContent>
      </Card>

      <GalleryManager open={galleryManagerOpen} onClose={() => {
        setGalleryManagerOpen(false);
      }} onDelete={() => { }} />
    </>
  );
};
export default ImagesSection;
