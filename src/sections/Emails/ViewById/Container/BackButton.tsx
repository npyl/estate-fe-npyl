import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { FC } from "react";

const BackButton: FC<IconButtonProps> = (props) => (
    <IconButton {...props}>
        <ArrowBackIcon fontSize="small" />
    </IconButton>
);

export default BackButton;
