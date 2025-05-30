import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { FC } from "react";

interface AddButtonProps {
    onClick: VoidFunction;
}

const AddButton: FC<AddButtonProps> = (props) => (
    <IconButton {...props}>
        <AddIcon />
    </IconButton>
);

export default AddButton;
