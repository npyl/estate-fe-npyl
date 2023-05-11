import { Dispatch, SetStateAction } from "react";
import Typography from "@mui/material/Typography";
import { Card, CardHeader, CardContent } from "@mui/material";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
import { Box } from "@mui/system";

import { useState, useEffect, useCallback } from "react";

import { Upload } from "../upload";

import { useDispatch } from "react-redux";
import { any } from "prop-types";

interface FileSectionProps {
  fileData: (File | string)[];
  setFileData: Dispatch<SetStateAction<(string | File)[]>>;
}

const FileSection: React.FC<FileSectionProps> = ({ fileData, setFileData }) => {
  const dispatch = useDispatch();

  const handleDropMultiFile = useCallback(
    (acceptedFileData: File[]) => {
      setFileData([
        ...fileData,
        ...acceptedFileData.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [fileData]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = fileData.filter((file) => file !== inputFile);
    setFileData(filtered);
  };

  const handleRemoveAllFileData = () => {
    setFileData([]);
  };

  return (
    <Card>
      <CardHeader title="fileData" />
      <CardContent>
        <Upload
          multiple
          thumbnail={false}
          files={fileData}
          onDrop={handleDropMultiFile}
          onRemove={handleRemoveFile}
          onRemoveAll={handleRemoveAllFileData}
          onUpload={() => console.log("ON UPLOAD")}
        />
      </CardContent>
    </Card>
  );
};
export default FileSection;
