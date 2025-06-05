import { IconButton, IconButtonProps } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { FC } from "react";

type ClickerProps = Omit<IconButtonProps, "onClick"> & {
    onClick: VoidFunction;
};

const Clicker: FC<ClickerProps> = (props) => (
    <IconButton {...props}>
        <AddCircle />
    </IconButton>
);

export default Clicker;
