import { IconButton, Popover } from "@mui/material";
import { FC, useCallback, useRef } from "react";
import {
    TCalendarView,
    ViewButtonGroupProps,
} from "@/components/BaseCalendar/types";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import YearIcon from "./YearIcon";
import MenuIcon from "@mui/icons-material/Menu";
import useDialog from "@/hooks/useDialog";
import { IconButtonSx } from "./styles";

const CalendarButtonGroup: FC<ViewButtonGroupProps> = ({
    view,
    onViewChange,
}) => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [isOpen, openGroup, closeGroup] = useDialog();

    const handleViewChange = useCallback(
        (_: any, v: TCalendarView) => v && onViewChange(v),
        [onViewChange]
    );

    return (
        <>
            <IconButton ref={anchorRef} sx={IconButtonSx} onClick={openGroup}>
                <MenuIcon />
            </IconButton>

            {isOpen && anchorRef.current ? (
                <Popover open anchorEl={anchorRef.current} onClose={closeGroup}>
                    <ToggleButtonGroup
                        exclusive
                        orientation="vertical"
                        value={view}
                        onChange={handleViewChange}
                    >
                        <ToggleButton value="day">
                            <TodayIcon />
                        </ToggleButton>
                        <ToggleButton value="week">
                            <DateRangeIcon />
                        </ToggleButton>
                        <ToggleButton value="month">
                            <CalendarMonthIcon />
                        </ToggleButton>
                        <ToggleButton value="year">
                            <YearIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Popover>
            ) : null}
        </>
    );
};

export default CalendarButtonGroup;
