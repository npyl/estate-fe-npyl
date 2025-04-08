import { CalendarCellProps, TOnEventClick } from "@/components/Calendar/types";
import { ComponentType, useCallback, MouseEvent } from "react";
import useTimeFromOffset from "./useTimeFromOffset";
import useAuthenticatedClick from "./useAuthenticatedClick";
import {
    EVENTS,
    usePopperContext,
} from "@/sections/Calendar/View/PopperContext";
import useEventsWithCreate from "./useEventsWithCreate";

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithClick = (Cell: AnyCalendarCell) => {
    const WrappedComponent = (props: CalendarCellProps) => {
        const events = useEventsWithCreate(props.date, props.events);

        const { dispatch } = usePopperContext();

        //
        //  View / Edit
        //
        const onEventClick: TOnEventClick = useCallback(
            (me, ce) =>
                dispatch({
                    event: EVENTS.CLICK_EVENT,
                    // ...
                    other: {
                        me,
                        ce,
                    },
                }),
            []
        );

        //
        //  Create
        //
        const onClickWithOffset = useCallback(
            (me: MouseEvent<HTMLDivElement>, date: string) =>
                dispatch({
                    event: EVENTS.CLICK,
                    // ...
                    other: {
                        me,
                        date,
                    },
                }),
            []
        );
        const { onClick } = useTimeFromOffset(props.date, onClickWithOffset);
        const { onAuthenticatedClick } = useAuthenticatedClick(onClick);

        return (
            <Cell
                {...props}
                events={events}
                onClick={onAuthenticatedClick}
                onEventClick={onEventClick}
            />
        );
    };

    WrappedComponent.displayName = `WithClick(View)`;

    return WrappedComponent;
};

export default WithClick;
