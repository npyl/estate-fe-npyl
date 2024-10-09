import { SpaceBetween } from "@/components/styled";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { FC, useCallback } from "react";
import { TODAY } from "./constants";
import Stack from "@mui/material/Stack";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import YearIcon from "./YearIcon";

import { TCalendarView } from "./types";

const IconButtonSx = {
    borderRadius: "20px",
};

interface HeaderProps {
    date: Date;
    onDateChange: (d: Date) => void;

    view: TCalendarView;
    onViewChange: (v: TCalendarView) => void;
}

const Header: FC<HeaderProps> = ({
    date,
    onDateChange,
    // ...
    view,
    onViewChange,
}) => {
    const gotoPrev = useCallback(
        () => onDateChange(new Date(date.setMonth(date.getMonth() - 1))),
        []
    );
    const gotoNext = useCallback(
        () => onDateChange(new Date(date.setMonth(date.getMonth() + 1))),
        []
    );
    const gotoToday = useCallback(() => onDateChange(TODAY), []);

    const handleViewChange = useCallback(
        (_: any, v: TCalendarView) => v && onViewChange(v),
        [onViewChange]
    );

    return (
        <SpaceBetween>
            <IconButton onClick={gotoPrev} sx={IconButtonSx}>
                <ChevronLeft />
            </IconButton>
            <button onClick={gotoToday}>Today</button>

            <Stack direction="row">
                <ToggleButtonGroup
                    exclusive
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

                <IconButton onClick={gotoNext} sx={IconButtonSx}>
                    <ChevronRight />
                </IconButton>
            </Stack>
        </SpaceBetween>
    );
};

export default Header;
