import { motion } from "framer-motion";
import UploadImage from "@/components/image/UploadImage";
import { useUploadFileContext } from "../context/UploadProgress";
import React from "react";
import { useConditionalMemo } from "@/hooks/useConditionalMemo";
import { ImageItemProps } from "./types";
import SmartImage from "./SmartImage";

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
            <motion.div
                whileHover={{
                    scale: 0.95,
                    cursor: "pointer",
                }}
            >
                <SmartImage
                    src={url}
                    label={thumbnail ? "main" : ""}
                    hidden={hidden}
                    onClick={() => onImageClick(key)}
                />
            </motion.div>
        );
    }

    return <UploadImage animate progress={progress} />;
};

export default ImageItem;
