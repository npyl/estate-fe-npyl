import { BaseCalendarViewProps } from "../types";
import { FC } from "react";
import dynamic from "next/dynamic";

import BaseDayView from "./Day";
const BaseWeekView = dynamic(() => import("./Week"));
const BaseYearView = dynamic(() => import("./Year"));
const BaseMonthView = dynamic(() => import("./Month"));

const BASE_VIEW_ID = "BaseCalendarView";

const BaseView: FC<BaseCalendarViewProps> = ({
    view,
    date,
    slots,
    ...props
}) => {
    const {
        DayView = BaseDayView,
        WeekView = BaseWeekView,
        MonthView = BaseMonthView,
        YearView = BaseYearView,
    } = slots || {};

    return (
        <div id={BASE_VIEW_ID} {...props}>
            {view === "day" ? <DayView date={date} /> : null}
            {view === "week" ? <WeekView date={date} /> : null}
            {view === "month" ? <MonthView date={date} /> : null}
            {view === "year" ? <YearView date={date} /> : null}
        </div>
    );
};

export { BASE_VIEW_ID };
export default BaseView;
