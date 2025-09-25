import { FC, useCallback } from "react";
import { ChevronRight } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

type TMode = "set" | "setYear" | "setMonth" | "monthOffset";

interface Props {
    changeShownDate: (value: Date | number | string, mode?: TMode) => void;
}

const NextButton: FC<Props> = ({ changeShownDate }) => {
    const onClick = useCallback(() => {
        changeShownDate(1, "monthOffset");
    }, [changeShownDate]);
    return (
        <IconButton size="small" onClick={onClick}>
            <ChevronRight />
        </IconButton>
    );
};

export default NextButton;
