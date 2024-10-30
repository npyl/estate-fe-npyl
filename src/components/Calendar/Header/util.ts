import { TCalendarView } from "@/components/BaseCalendar/types";
import { TCalendarLocale } from "../types";

interface RenderValue {
    main: string;
    sub: string;
}

const renderValue = (
    view: TCalendarView,
    date: Date,
    loc: TCalendarLocale
): RenderValue => {
    switch (view) {
        case "day":
            return {
                main: date.getDate().toString(),
                sub: date.toLocaleDateString(loc, { weekday: "short" }),
            };
        case "week":
            const startOfWeek = new Date(date);
            startOfWeek.setDate(date.getDate() - date.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            // If we are on the same month, show only that month
            if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
                return {
                    main: `${startOfWeek.toLocaleDateString(loc, {
                        month: "short",
                    })}`,
                    sub: endOfWeek.getFullYear().toString(),
                };
            }

            // Otherwise show range in the form Oct - Nov
            return {
                main: `${startOfWeek.toLocaleDateString(loc, {
                    month: "short",
                })} - ${endOfWeek.toLocaleDateString(loc, {
                    month: "short",
                })}`,
                sub: endOfWeek.getFullYear().toString(),
            };
        case "month":
            return {
                main: date.toLocaleDateString(loc, { month: "long" }),
                sub: date.getFullYear().toString(),
            };
        case "year":
            return {
                main: date.getFullYear().toString(),
                sub: "",
            };
    }
};

export { renderValue };
