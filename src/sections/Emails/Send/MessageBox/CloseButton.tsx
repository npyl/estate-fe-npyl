import getBorderColor from "@/theme/borderColor";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, IconButtonProps, SxProps, Theme } from "@mui/material";
import { FC } from "react";

const CloseButtonSx: SxProps<Theme> = {
    position: "absolute",
    top: -50,
    left: 0,
    bgcolor: "background.paper",
    "&:hover": {
        bgcolor: "background.paper",
    },
    border: "1px solid",
    borderColor: getBorderColor,
};

const CloseButton: FC<IconButtonProps> = ({ sx, ...props }) => (
    <IconButton sx={{ ...(CloseButtonSx as any), ...sx }} {...props}>
        <CloseIcon />
    </IconButton>
);

export default CloseButton;
