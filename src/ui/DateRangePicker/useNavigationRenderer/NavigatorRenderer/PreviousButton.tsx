import { FC, useCallback } from "react";
import { ChevronLeft } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { TMode } from "./types";

interface Props {
    changeShownDate: (value: Date | number | string, mode?: TMode) => void;
}

const PreviousButton: FC<Props> = ({ changeShownDate }) => {
    const onClick = useCallback(() => {
        changeShownDate(-1, "monthOffset");
    }, [changeShownDate]);
    return (
        <IconButton size="small" onClick={onClick}>
            <ChevronLeft />
        </IconButton>
    );
};

export default PreviousButton;
