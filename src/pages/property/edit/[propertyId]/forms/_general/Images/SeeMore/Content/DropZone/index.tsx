import usePropertyUpload from "@/hooks/property/uploadFile";
import React, { ReactNode } from "react";
import { useDropzone } from "react-dropzone";
import { styled } from "@mui/material/styles";
import DragOverlay from "./DragOverlay";

const StyledRoot = styled("div")({
    height: "100%",
});

interface DropZoneProps {
    children: ReactNode;
}

const DropZone: React.FC<DropZoneProps> = ({ children }) => {
    const { uploadFiles, isLoading } = usePropertyUpload("image");

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        disabled: isLoading,
        onDrop: uploadFiles,
        // Allow only file drop
        noClick: true,
        noKeyboard: true,
    });

    return (
        <StyledRoot {...getRootProps()}>
            <input {...getInputProps()} />

            {children}

            {isDragActive && !isLoading ? <DragOverlay /> : null}
        </StyledRoot>
    );
};

export default DropZone;
