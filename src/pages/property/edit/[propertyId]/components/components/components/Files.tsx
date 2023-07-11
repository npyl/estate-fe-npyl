import { Card, CardHeader, CardContent } from "@mui/material";
import { Upload } from "src/components/upload";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useDispatch } from "react-redux";

interface FileSectionProps {
  fileData: string[];
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
        {/* <Upload
          multiple
          thumbnail={false}
          files={fileData}
          onDrop={handleDropMultiFile}
          onRemove={handleRemoveFile}
          onRemoveAll={handleRemoveAllFileData}
        /> */}
      </CardContent>
    </Card>
  );
};
export default FileSection;
