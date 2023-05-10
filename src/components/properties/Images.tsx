import { Dispatch, SetStateAction } from "react";
import Typography from "@mui/material/Typography";
import { Card, CardHeader, CardContent } from "@mui/material";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { Box } from "@mui/system";

import { useState, useEffect, useCallback } from "react";
import { Upload } from "../upload";
import { useDispatch } from "react-redux";
import { log } from "console";
import { fileData } from "../file-thumbnail";

interface IImageSectionProps {
  enums: IGlobalProperty;
  files: (File | string)[];
  setFiles: Dispatch<SetStateAction<(string | File)[]>>;
}

const ImagesSection: React.FC<IImageSectionProps> = ({
  enums,
  files,
  setFiles,
}) => {
  const details = enums?.details as IGlobalPropertyDetails;

  const dispatch = useDispatch();

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
  console.log("elaaaaaaaaaaaa");
  return (
    <Card>
      <CardHeader title="Upload Images" />
      <CardContent>
        <Upload
          multiple
          thumbnail={true}
          files={files}
          onDrop={handleDropMultiFile}
          onRemove={handleRemoveFile}
          onRemoveAll={handleRemoveAllFiles}
          onUpload={() => console.log("ON UPLOAD")}
        />
      </CardContent>
    </Card>
  );
};
export default ImagesSection;
