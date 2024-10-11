import { BaseCalendarCellProps, BaseCalendarViewProps } from "../types";
import { FC } from "react";
import dynamic from "next/dynamic";

const BaseDayView = dynamic(() => import("./Day"));
const BaseWeekView = dynamic(() => import("./Week"));
const BaseYearView = dynamic(() => import("./Year"));
import BaseMonthView from "./Month";

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
        MonthView = BaseYearView,
        YearView = BaseMonthView,
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
