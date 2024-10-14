import { BaseCalendarViewProps } from "../types";
import { FC } from "react";
import dynamic from "next/dynamic";

import BaseDayView from "./Day";
const BaseWeekView = dynamic(() => import("./Week"));
const BaseYearView = dynamic(() => import("./Year"));
const BaseMonthView = dynamic(() => import("./Month"));

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
        <div {...props}>
            {view === "day" ? <DayView date={date} /> : null}
            {view === "week" ? <WeekView date={date} /> : null}
            {view === "month" ? <MonthView date={date} /> : null}
            {view === "year" ? <YearView date={date} /> : null}
        </div>
    );
};

export default BaseView;
