import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import PrintIcon from "@mui/icons-material/Print";
import { FC } from "react";

const PrintButton: FC<IconButtonProps> = (props) => (
    <IconButton {...props}>
        <PrintIcon />
    </IconButton>
);
export default PrintButton;
