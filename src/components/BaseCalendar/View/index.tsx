import { BaseCalendarCellProps, BaseCalendarViewProps } from "../types";
import { FC } from "react";
import dynamic from "next/dynamic";

import BaseDayView from "./Day";
const BaseWeekView = dynamic(() => import("./Week"));
const BaseYearView = dynamic(() => import("./Year"));
const BaseMonthView = dynamic(() => import("./Month"));

const EmptyCell: FC<BaseCalendarCellProps> = () => null;
const NoNumbering = () => null;

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
            {view === "day" ? (
                <DayView date={date} Cell={EmptyCell} Numbering={NoNumbering} />
            ) : null}
            {view === "week" ? (
                <WeekView
                    date={date}
                    Cell={EmptyCell}
                    Numbering={NoNumbering}
                />
            ) : null}
            {view === "month" ? (
                <MonthView
                    date={date}
                    Cell={EmptyCell}
                    Numbering={NoNumbering}
                />
            ) : null}
            {view === "year" ? (
                <YearView
                    date={date}
                    Cell={EmptyCell}
                    Numbering={NoNumbering}
                />
            ) : null}
        </div>
    );
};

export default BaseView;
