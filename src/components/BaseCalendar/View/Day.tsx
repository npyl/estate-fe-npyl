import { FC } from "react";
import { BaseCalendarDayViewProps } from "../types";

// INFO: Here, Cell is responsible for rendering the whole content below BaseHeader

const DayView: FC<BaseCalendarDayViewProps> = ({ date, Cell }) => (
    <Cell date={date} />
);

export default DayView;
