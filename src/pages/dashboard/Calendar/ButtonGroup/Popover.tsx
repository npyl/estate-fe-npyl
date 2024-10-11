import { Popover as MuiPopover } from "@mui/material";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import YearIcon from "./YearIcon";
import { FC, useCallback } from "react";
import { TCalendarView } from "@/components/BaseCalendar/types";

// -----------------------------------------------------------------------

const ToggleButtonSx = {
    border: 0,
};

// -----------------------------------------------------------------------

interface PopoverProps {
    anchorEl: HTMLElement;
    view: TCalendarView;
    onViewChange: (v: TCalendarView) => void;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({
    anchorEl,
    view,
    onViewChange,
    onClose,
}) => {
    const handleViewChange = useCallback(
        (_: any, v: TCalendarView) => v && onViewChange(v),
        [onViewChange]
    );

    return (
        <MuiPopover open anchorEl={anchorEl} onClose={onClose}>
            <ToggleButtonGroup
                exclusive
                orientation="vertical"
                value={view}
                onChange={handleViewChange}
            >
                <ToggleButton value="day" sx={ToggleButtonSx}>
                    <TodayIcon />
                </ToggleButton>
                <ToggleButton value="week" sx={ToggleButtonSx}>
                    <DateRangeIcon />
                </ToggleButton>
                <ToggleButton value="month" sx={ToggleButtonSx}>
                    <CalendarMonthIcon />
                </ToggleButton>
                <ToggleButton value="year" sx={ToggleButtonSx}>
                    <YearIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </MuiPopover>
    );
};

export default Popover;
