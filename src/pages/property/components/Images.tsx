import { Card, CardContent, CardHeader } from "@mui/material";
import { Upload } from "src/components/upload";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useDispatch } from "react-redux";

interface IImageSectionProps {
  files: (File | string)[];
  setFiles: Dispatch<SetStateAction<(string | File)[]>>;
}

const ImagesSection: React.FC<IImageSectionProps> = ({ files, setFiles }) => {
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
        />
      </CardContent>
    </Card>
  );
};
export default ImagesSection;
