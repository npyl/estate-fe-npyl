import { Card, CardContent, CardHeader } from "@mui/material";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

import UploadDnd from "src/components/upload/UploadDnd";
import GalleryManager from "src/components/GalleryManager";
import { SoftButton } from "src/components/SoftButton";

interface IImageSectionProps {
  files: File[];
  setFiles: Dispatch<SetStateAction<(string | File)[]>>;
}

const ImagesSection: React.FC<IImageSectionProps> = ({ files, setFiles }) => {

  const [galleryManagerOpen, setGalleryManagerOpen] = useState(false);

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((acceptedFile) => URL.createObjectURL(acceptedFile))
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

  const handleOpenGalleryManager = () => {
    setGalleryManagerOpen(true);
  }
  const handleCloseGalleryManager = () => {
    setGalleryManagerOpen(false);
  }

  return (
    <>
      <Card>
        <CardHeader title="Upload Images" action={files.length > 0 && <SoftButton onClick={handleOpenGalleryManager}>Edit</SoftButton>}
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& .MuiCardHeader-action': {
              position: 'absolute',
              alignSelf: 'flex-end'
            },
          }} />
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

      {files && files.length > 0 && <GalleryManager open={galleryManagerOpen} images={files} onClose={handleCloseGalleryManager} onDelete={(file: File) => {
        handleRemoveFile(file);
      }} />}

    </>
  );
};
export default ImagesSection;
