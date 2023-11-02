import { styled } from "@mui/material/styles";
import { ImgHTMLAttributes } from "react";

interface ComparisonImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    isSelected: boolean;
}

const ComparisonImage = styled("img")<ComparisonImageProps>(
    ({ theme, isSelected }) => ({
        width: "100%",
        maxWidth: "45%",
        height: "auto",
        borderRadius: theme.shape.borderRadius,
        marginBottom: "20px",
        marginTop: "20px",
        border: isSelected ? `5px solid ${theme.palette.primary.main}` : "none", // Green border for selected image
        cursor: "pointer", // Make the images clickable
    })
);

export default ComparisonImage;
