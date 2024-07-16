import { styled } from "@mui/material/styles";
import { ImgHTMLAttributes } from "react";
import { Dialog, DialogActions } from "@mui/material";

export const ComparisonFrame = styled("div")(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    minHeight: "40vh",
}));

interface ComparisonImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    isSelected: boolean;
}

export const ComparisonImage = styled("img")<ComparisonImageProps>(
    ({ theme, isSelected }) => ({
        width: "100%",
        maxWidth: "45%",
        borderRadius: theme.shape.borderRadius,
        marginBottom: "20px",
        marginTop: "20px",
        border: isSelected ? `5px solid ${theme.palette.primary.main}` : "none", // Green border for selected image
        cursor: "pointer", // Make the images clickable
    })
);

// ------

export const StyledDialog = styled(Dialog)({
    "& .MuiDialog-container": {
        "& .MuiPaper-root": {
            minWidth: "90vw",
        },
    },
});
export const StyledActions = styled(DialogActions)(({ theme }) => ({
    float: "right",
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(1),
    justifyContent: "right",
}));
