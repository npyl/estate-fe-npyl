import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ButtonHTMLAttributes, CSSProperties, FC, useCallback } from "react";
import { TODAY } from "./constants";

import {
    BaseCalendarHeaderProps,
    TCalendarView,
    ViewButtonGroupProps,
} from "./types";

const HeaderStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
};

const ContentRightStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
};

// INFO: Wrapper for html element
const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
    <button {...props} />
);

const BaseButtonGroup: FC<ViewButtonGroupProps> = () => null;

/* 
    amount: +1 or -1 (next/previous)
    date: current date
    view: current calendar mode
*/
const getDate = (amount: number, date: Date, view: TCalendarView) => {
    const newDate = new Date(date);

    switch (view) {
        case "day":
            newDate.setDate(date.getDate() + amount);
            break;
        case "week":
            newDate.setDate(date.getDate() + amount * 7);
            break;
        case "month":
            newDate.setMonth(date.getMonth() + amount);
            break;
        case "year":
            newDate.setFullYear(date.getFullYear() + amount);
            break;
    }

    return newDate;
};

const BaseHeader: FC<BaseCalendarHeaderProps> = ({
    date,
    onDateChange,
    // ...
    view,
    onViewChange,
    // ...
    slots,

    children,

    style,

    ...props
}) => {
    const {
        PreviousButton = Button,
        TodayButton = Button,
        NextButton = Button,
        ViewButtonGroup = BaseButtonGroup,
    } = slots || {};

    const gotoPrev = useCallback(
        () => onDateChange(getDate(-1, date, view)),
        [date, view, onDateChange]
    );
    const gotoNext = useCallback(
        () => onDateChange(getDate(1, date, view)),
        [date, view, onDateChange]
    );

    const gotoToday = useCallback(() => onDateChange(TODAY), [onDateChange]);

    return (
        <div
            {...props}
            style={{
                ...HeaderStyle,
                ...style,
            }}
        >
            <PreviousButton onClick={gotoPrev}>
                <ChevronLeft />
            </PreviousButton>

            <TodayButton
                className="pp-calendar-header-today-button"
                onClick={gotoToday}
            >
                Today
            </TodayButton>

            <div style={ContentRightStyle}>
                <ViewButtonGroup view={view} onViewChange={onViewChange} />
                <NextButton onClick={gotoNext}>
                    <ChevronRight />
                </NextButton>
            </div>

            {children}
        </div>
    );
};

export default BaseHeader;
