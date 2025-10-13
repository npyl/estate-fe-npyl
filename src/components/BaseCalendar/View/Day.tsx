import { CSSProperties, FC } from "react";
import { BaseCalendarDayViewProps } from "../types";
import { EmptyCell, NoNumbering } from "./Empty";
import { GRID_VIEW_ID } from "../constants";
import BaseContainer from "./_BaseContainer";

// INFO: Here, Cell is responsible for rendering the whole content below BaseHeader

const contentStyle: CSSProperties = {
    width: "100%",
};

const DayView: FC<BaseCalendarDayViewProps> = ({
    date,
    Cell = EmptyCell,
    Numbering = NoNumbering,
    ...props
}) => (
    <BaseContainer Numbering={Numbering} {...props}>
        <div id={GRID_VIEW_ID} style={contentStyle}>
            <Cell date={date} />
        </div>
    </BaseContainer>
);

export default DayView;
