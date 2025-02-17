import React, { ReactNode } from "react";
import { useDropzone } from "react-dropzone";
import { styled } from "@mui/material/styles";
import DragOverlay from "./DragOverlay";
import { useImageOperations } from "../../../context/ImageOperations";

const StyledRoot = styled("div")({
    height: "100%",
});

interface DropZoneProps {
    children: ReactNode;
    disabled?: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({ disabled = false, children }) => {
    const { upload, isLoading } = useImageOperations();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        disabled: disabled || isLoading,
        onDrop: upload,
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
