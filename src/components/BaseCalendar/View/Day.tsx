import { CSSProperties, FC } from "react";
import { BaseCalendarDayViewProps } from "../types";
import { EmptyCell, NoNumbering } from "./Empty";

// INFO: Here, Cell is responsible for rendering the whole content below BaseHeader

const defaultStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    position: "relative",
};

const contentStyle: CSSProperties = {
    width: "100%",
    position: "relative",
};

const DayView: FC<BaseCalendarDayViewProps> = ({
    date,
    Cell = EmptyCell,
    Numbering = NoNumbering,
    style,
    ...props
}) => (
    <div
        style={{
            ...defaultStyle,
            ...style,
        }}
        {...props}
    >
        <Numbering />

        <div style={contentStyle}>
            <Cell date={date} />
        </div>
    </div>
);

export default DayView;
