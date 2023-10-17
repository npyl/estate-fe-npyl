import { IPropertyImage } from "src/types/file";
import { LabeledImage } from "src/components/image";
import PreviewImage from "src/components/image/PreviewImage";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";

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
                                label={index === 0 ? "main" : ""}
                                hidden={image.hidden}
                                onClick={() =>
                                    onImageClick && onImageClick(image)
                                }
                            />
                        </motion.div>
                    ) : (
                        <PreviewImage animate borderRadius={0.3} />
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
