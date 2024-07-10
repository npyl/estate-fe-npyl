import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { LabeledImage } from "@/components/image";
import UploadImage from "@/components/image/UploadImage";
import { useUploadFileContext } from "@/contexts/uploadFile";
import { IPropertyImage } from "@/types/file";

// ----------------------------------------------------------------------

interface ImagePreviewProps {
    images: IPropertyImage[];
    placeholder?: React.ReactNode;
    onImageClick?: (i: IPropertyImage) => void;
}

export default function ImagePreview({
    images,
    placeholder,
    onImageClick,
}: ImagePreviewProps) {
    const { uploadProgress } = useUploadFileContext();

    const getProgress = useCallback(
        (filename: string) =>
            uploadProgress.filename === filename ? uploadProgress.progress : -1,
        [uploadProgress]
    );

    return (
        <Grid container spacing={0.5}>
            {images?.map((image, index) => (
                <Grid item xs={4} key={index}>
                    {image.url ? (
                        <motion.div
                            whileHover={{ scale: 0.95, cursor: "pointer" }}
                        >
                            <LabeledImage
                                borderRadius={0.3}
                                src={image.url}
                                label={image.thumbnail ? "main" : ""}
                                hidden={image.hidden}
                                onClick={() =>
                                    onImageClick && onImageClick(image)
                                }
                            />
                        </motion.div>
                    ) : (
                        <UploadImage
                            animate
                            progress={getProgress(image.filename)}
                            borderRadius={0.3}
                        />
                    )}
                </Grid>
            ))}
            {placeholder && (
                <Grid item xs={4}>
                    {placeholder}
                </Grid>
            )}
        </Grid>
    );
}
