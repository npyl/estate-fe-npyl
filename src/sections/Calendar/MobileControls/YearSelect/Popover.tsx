import { FC, useCallback } from "react";
import MuiPopover from "@mui/material/Popover";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface Props {
    anchorEl: HTMLElement;
    date: Date;
    onDateChange: (d: Date) => void;
    onClose: VoidFunction;
}

const changeDate = (date: Date, amount: number) => {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() + amount);
    return newDate;
};

const Popover: FC<Props> = ({ anchorEl, date, onDateChange, onClose }) => {
    const handlePrevYear = useCallback(
        () => onDateChange(changeDate(date, -1)),
        [date, onDateChange]
    );

    const handleNextYear = useCallback(
        () => onDateChange(changeDate(date, 1)),
        [date, onDateChange]
    );

    return (
        <MuiPopover
            open
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            onClose={onClose}
        >
            <IconButton onClick={handlePrevYear}>
                <ChevronLeft />
            </IconButton>
            <IconButton onClick={handleNextYear}>
                <ChevronRight />
            </IconButton>
        </MuiPopover>
    );
};

export default Popover;
