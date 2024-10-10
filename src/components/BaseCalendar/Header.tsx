import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ButtonHTMLAttributes, CSSProperties, FC, useCallback } from "react";
import { TODAY } from "./constants";

import { BaseCalendarHeaderProps, ViewButtonGroupProps } from "./types";

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
        () => onDateChange(new Date(date.setMonth(date.getMonth() - 1))),
        []
    );
    const gotoNext = useCallback(
        () => onDateChange(new Date(date.setMonth(date.getMonth() + 1))),
        []
    );
    const gotoToday = useCallback(() => onDateChange(TODAY), []);

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
