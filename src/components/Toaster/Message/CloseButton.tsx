import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { FC } from "react";
import { SxProps, Theme } from "@mui/material";

const CloseSx: SxProps<Theme> = {
    top: "50%",
    transform: "translateY(-50%)",
    right: 5,
    position: "absolute",
};

const CloseButton: FC<IconButtonProps> = ({ sx, ...props }) => (
    <IconButton size="small" sx={{ ...CloseSx, ...sx }} {...props}>
        <CloseIcon fontSize="small" />
    </IconButton>
);

export default CloseButton;
