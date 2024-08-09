import UploadImage from "@/components/image/UploadImage";
import { useUploadFileContext } from "../context/UploadProgress";
import React from "react";
import { useConditionalMemo } from "@/hooks/useConditionalMemo";
import { ImageItemProps } from "./types";
import SmartImage from "./SmartImage";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material";

const SmartImageContainerSx: SxProps<Theme> = {
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
        transform: "scale(0.95)",
        cursor: "pointer",
    },
};

const ImageItem: React.FC<ImageItemProps> = ({ image, onImageClick }) => {
    const { url, thumbnail, hidden, key } = image;

    const { uploadProgress } = useUploadFileContext();

    const progress = useConditionalMemo(
        () => uploadProgress.p,
        () => uploadProgress.key === key,
        [key, uploadProgress]
    );

    if (url) {
        return (
            <SmartImage
                src={url}
                label={thumbnail ? "main" : ""}
                hidden={hidden}
                onClick={() => onImageClick(key)}
                containerSx={SmartImageContainerSx}
            />
        );
    }

    return <UploadImage animate progress={progress} />;
};

export default ImageItem;
