import { FC, useState } from "react";
import { BaseCalendarProps, TCalendarView } from "./types";
import { TODAY } from "./constants";
import BaseHeader from "./Header";
import BaseView from "./View";

const BaseCalendar: FC<BaseCalendarProps> = ({
    slots,
    // ...
    HeaderSlots,
    ViewSlots,
}) => {
    const { Header = BaseHeader, View = BaseView } = slots || {};

    const [date, setDate] = useState(TODAY);
    const [view, setView] = useState<TCalendarView>("month");

    return (
        <>
            <Header
                date={date}
                view={view}
                // ...
                onDateChange={setDate}
                onViewChange={setView}
                // ...
                slots={HeaderSlots}
            />

            <View view={view} date={date} slots={ViewSlots} />
        </>
    );
};

export default BaseCalendar;
