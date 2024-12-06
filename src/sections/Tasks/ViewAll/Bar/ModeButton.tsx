import { IconButton, SxProps, Theme } from "@mui/material";
import { TMode } from "../types";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import { FC } from "react";

const ModeButtonSx: SxProps<Theme> = {
    border: "1px solid",
    borderColor: "divider",
};

interface ModeButtonProps {
    mode: TMode;
    onClick: VoidFunction;
}

const ModeButton: FC<ModeButtonProps> = ({ mode, onClick }) => (
    <IconButton sx={ModeButtonSx} onClick={onClick}>
        {mode === "board" ? <AlignHorizontalLeftIcon /> : null}
        {mode === "list" ? <AlignVerticalBottomIcon /> : null}
    </IconButton>
);

export default ModeButton;
