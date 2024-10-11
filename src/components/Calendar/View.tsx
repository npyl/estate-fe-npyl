import { FC } from "react";
import BaseView from "@/components/BaseCalendar/View";
import { BaseCalendarViewProps } from "@/components/BaseCalendar/types";

const CalendarView: FC<BaseCalendarViewProps> = (props) => (
    <BaseView {...props} />
);

export default CalendarView;
