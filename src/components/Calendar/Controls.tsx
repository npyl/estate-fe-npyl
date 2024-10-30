import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { IconButtonSx } from "./styles";
import { FC } from "react";

const CalendarIconButton: FC<IconButtonProps> = (props) => (
    <IconButton sx={IconButtonSx} {...props} />
);

export default CalendarIconButton;
