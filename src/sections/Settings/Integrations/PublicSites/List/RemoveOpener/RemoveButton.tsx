import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import { FC } from "react";

interface AddButtonProps {
    onClick: VoidFunction;
}

const RemoveButton: FC<AddButtonProps> = (props) => (
    <IconButton {...props}>
        <RemoveIcon />
    </IconButton>
);

export default RemoveButton;
