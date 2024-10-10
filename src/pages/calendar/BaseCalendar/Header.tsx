import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ButtonHTMLAttributes, CSSProperties, FC, useCallback } from "react";
import { TODAY } from "./constants";
import Stack from "@mui/material/Stack";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import YearIcon from "./YearIcon";

import { BaseCalendarHeaderProps, TCalendarView } from "./types";

const HeaderStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
};

// INFO: Wrapper for html element
const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
    <button {...props} />
);

const BaseHeader: FC<BaseCalendarHeaderProps> = ({
    date,
    onDateChange,
    // ...
    view,
    onViewChange,
    // ...
    slots,
}) => {
    const {
        PreviousButton = Button,
        TodayButton = Button,
        NextButton = Button,
    } = slots || {};

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
        <div style={HeaderStyle}>
            <PreviousButton onClick={gotoPrev}>
                <ChevronLeft />
            </PreviousButton>

            <TodayButton onClick={gotoToday}>Today</TodayButton>

            {/* TODO: convert this aswell! */}
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

                <NextButton onClick={gotoNext}>
                    <ChevronRight />
                </NextButton>
            </Stack>
        </div>
    );
};

export default BaseHeader;
