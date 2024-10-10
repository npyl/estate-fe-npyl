import { BaseCalendarViewProps } from "../types";
import { FC } from "react";
import dynamic from "next/dynamic";

const BaseDayView = dynamic(() => import("./Day"));
const BaseWeekView = dynamic(() => import("./Week"));
const BaseYearView = dynamic(() => import("./Year"));
import BaseMonthView from "./Month";

const BaseView: FC<BaseCalendarViewProps> = ({
    view,
    date,
    slots,
    ...props
}) => {
    const {
        DayView = BaseDayView,
        WeekView = BaseWeekView,
        MonthView = BaseYearView,
        YearView = BaseMonthView,
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
