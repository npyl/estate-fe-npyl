import { FC } from "react";
import { BaseCalendarProps } from "./types";
import { TODAY } from "./constants";
import BaseHeader from "./Header";
import BaseView from "./View";
import { SettingsProvider } from "./Settings";

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
            <SettingsProvider>
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
            </SettingsProvider>
        </div>
    );
};

export default BaseCalendar;
