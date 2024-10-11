import { FC } from "react";
import BaseView from "@/components/BaseCalendar/View";
import { BaseCalendarViewProps } from "@/components/BaseCalendar/types";

const CalendarView: FC<BaseCalendarViewProps> = (props) => (
    <BaseView
        {...props}
        style={{
            width: "100%",
            backgroundColor: "",
        }}
    />
);

export default CalendarView;
