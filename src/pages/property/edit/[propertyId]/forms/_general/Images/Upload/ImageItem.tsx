import { motion } from "framer-motion";
import { LabeledImage } from "@/components/image";
import UploadImage from "@/components/image/UploadImage";
import { useUploadFileContext } from "@/contexts/uploadFile";
import { IPropertyImage } from "@/types/file";
import React from "react";
import { useConditionalMemo } from "@/hooks/useConditionalMemo";

interface ImageItemProps {
    image: IPropertyImage;
    onImageClick: (key: string) => void;
}

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
                <LabeledImage
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
