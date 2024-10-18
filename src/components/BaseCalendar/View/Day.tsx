import { CSSProperties, FC } from "react";
import { BaseCalendarDayViewProps } from "../types";
import { EmptyCell, NoNumbering } from "./Empty";

// INFO: Here, Cell is responsible for rendering the whole content below BaseHeader

const defaultStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
};

const contentStyle: CSSProperties = {
    position: "relative",
    width: "100%",
};

const DayView: FC<BaseCalendarDayViewProps> = ({
    date,
    Cell = EmptyCell,
    Numbering = NoNumbering,
    style,
    ...props
}) => (
    <div
        {...props}
        style={{
            ...defaultStyle,
            ...style,
        }}
    >
        <Numbering />

        <div style={contentStyle}>
            <Cell date={date} />
        </div>
    </div>
);

export default DayView;
