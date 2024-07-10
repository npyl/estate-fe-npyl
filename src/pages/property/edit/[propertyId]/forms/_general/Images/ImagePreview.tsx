import { Grid } from "@mui/material";
import { motion } from "framer-motion";
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

    return (
        <Grid container spacing={0.5}>
            {images?.map((image) => (
                <Grid item xs={4} key={image.key}>
                    {image.url ? (
                        <motion.div
                            whileHover={{ scale: 0.95, cursor: "pointer" }}
                        >
                            <LabeledImage
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
                            progress={uploadProgress[image.key]}
                            borderRadius={0.3}
                        />
                    )}
                </Grid>
            ))}
            {placeholder ? (
                <Grid item xs={4}>
                    {placeholder}
                </Grid>
            ) : null}
        </Grid>
    );
}
