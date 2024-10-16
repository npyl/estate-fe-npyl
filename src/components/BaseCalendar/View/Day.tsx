import { CSSProperties, FC } from "react";
import { BaseCalendarDayViewProps } from "../types";
import { EmptyCell, NoNumbering } from "./Empty";

// INFO: Here, Cell is responsible for rendering the whole content below BaseHeader

const defaultStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
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
        <Cell date={date} />
    </div>
);

export default DayView;
