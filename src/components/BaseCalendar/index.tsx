import { FC } from "react";
import { BaseCalendarProps } from "./types";
import { TODAY } from "./constants";
import BaseHeader from "./Header";
import BaseView from "./View";

const BaseCalendar: FC<BaseCalendarProps> = ({
    date = TODAY,
    onDateChange,
    view = "month",
    onViewChange,
    // ...
    slots,
    // ...
    HeaderSlots,
    ViewSlots,
    ...props
}) => {
    const { Header = BaseHeader, View = BaseView } = slots || {};

    return (
        <div {...props}>
            <Header
                date={date}
                view={view}
                // ...
                onDateChange={onDateChange}
                onViewChange={onViewChange}
                // ...
                slots={HeaderSlots}
            />

            <View view={view} date={date} slots={ViewSlots} />
        </div>
    );
};

export default BaseCalendar;
