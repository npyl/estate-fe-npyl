import { Grid, GridProps } from "@mui/material";
import { IPropertyImage } from "@/types/file";
import React from "react";
import ImageItem from "../_shared/ImageItem";

interface ImagePreviewProps extends GridProps {
    images: IPropertyImage[];
    placeholder?: React.ReactNode;
    onImageClick: (key: string) => void;
}

const ImagePreview = ({
    images,
    placeholder,
    onImageClick,
    ...props
}: ImagePreviewProps) => (
    <Grid container spacing={0.5} {...props}>
        {images.map((image) => (
            <Grid item xs={4} key={`${image.filename}-${image.key}`}>
                <ImageItem image={image} onImageClick={onImageClick} />
            </Grid>
        ))}

        {placeholder ? (
            <Grid item xs={4}>
                {placeholder}
            </Grid>
        ) : null}
    </Grid>
);

export default ImagePreview;
