import UploadImage from "@/components/image/UploadImage";
import { useUploadFileContext } from "../context/UploadProgress";
import React from "react";
import { useConditionalMemo } from "@/hooks/useConditionalMemo";
import { ImageItemProps } from "./types";
import { styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LabeledImage } from "@/components/image";

const StyledImage = styled(LabeledImage)({
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
        transform: "scale(0.95)",
        cursor: "pointer",
    },
});

const ImageItem: React.FC<ImageItemProps> = ({ image, onImageClick }) => {
    const { url, thumbnail, hidden, key } = image;

    const { t } = useTranslation();
    const { uploadProgress } = useUploadFileContext();

    const progress = useConditionalMemo(
        () => uploadProgress.p,
        () => uploadProgress.key === key,
        [key, uploadProgress]
    );

    if (url) {
        return (
            <StyledImage
                src={url}
                label={thumbnail ? t("_main_").toString() : ""}
                hidden={hidden}
                onClick={() => onImageClick(key)}
            />
        );
    }

    return <UploadImage animate progress={progress} />;
};

export default ImageItem;
