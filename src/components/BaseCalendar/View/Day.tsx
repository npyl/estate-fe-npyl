import React, { CSSProperties, forwardRef } from "react";
import { BaseCalendarDayViewProps } from "../types";

// INFO: Here, Cell is responsible for rendering the whole content below BaseHeader

const defaultStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
};

const DayView = forwardRef<HTMLDivElement, BaseCalendarDayViewProps>(
    ({ date, Cell, Numbering, style, ...props }, ref) => (
        <div
            {...props}
            ref={ref}
            style={{
                ...defaultStyle,
                ...style,
            }}
        >
            <Numbering />
            <Cell date={date} />
        </div>
    )
);

DayView.displayName = "BaseCalendarDayView";

export default DayView;
