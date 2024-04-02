import { useCallback, useState } from "react";
// @mui
import { Stack } from "@mui/material";

// components
import { UploadBox } from "src/components/upload";
import { fileToBase64 } from "@/utils/file-to-base64";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";

// ----------------------------------------------------------------------

type Props = {
    attachments: string[];
    onChange: (attachments: string[]) => void;
};

export default function KanbanDetailsAttachments({
    attachments,
    onChange,
}: Props) {
    const [files, setFiles] = useState<string[]>(attachments);

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newFiles = acceptedFiles.map((f) => fileToBase64(f));

            Promise.all(newFiles).then((base64Files) => {
                setFiles((oldFiles) => {
                    const newAttachments = [
                        ...oldFiles,
                        ...(base64Files as string[]),
                    ];
                    onChange(newAttachments); // Call the onChange prop with the new attachments
                    return newAttachments;
                });
            });
        },
        [onChange]
    );

    return (
        <Stack direction="row" flexWrap="wrap">
            <UploadBox onDrop={handleDrop} />
            {files.map((file, index) => (
                <FilePresentOutlinedIcon
                    key={index}
                    color="success"
                    style={{ marginTop: "10px" }}
                />
            ))}
        </Stack>
    );
}
