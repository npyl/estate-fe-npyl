import { FC } from "react";
import { BaseCalendarProps } from "./types";
import { TODAY } from "./constants";
import BaseHeader from "./Header";
import BaseView from "./View";
import { CookiesProvider } from "react-cookie";

const BASE_VIEW_ID = "calendar-base-view-id";

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
        <div id={BASE_VIEW_ID} {...props}>
            <CookiesProvider>
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
            </CookiesProvider>
        </div>
    );
};

export { BASE_VIEW_ID };
export default BaseCalendar;
