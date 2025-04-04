import { CalendarCellProps, TOnEventClick } from "@/components/Calendar/types";
import { ComponentType, useCallback, MouseEvent } from "react";
import useTimeFromOffset from "./useTimeFromOffset";
import useAuthenticatedClick from "./useAuthenticatedClick";
import { usePopperContext } from "@/sections/Calendar/View/PopperContext";

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const WithClick = (Cell: AnyCalendarCell) => {
    const WrappedComponent = (props: CalendarCellProps) => {
        const { setEvent, setStartDate } = usePopperContext();

        //
        //  View / Edit
        //
        const onEventClick: TOnEventClick = useCallback(
            (ce, me) => setEvent(me.currentTarget, ce),
            []
        );

        //
        //  Create
        //
        const onClickWithOffset = useCallback(
            (e: MouseEvent<HTMLDivElement>, date: string) => {
                setStartDate(e.currentTarget, date);
            },
            []
        );
        const { onClick } = useTimeFromOffset(props.date, onClickWithOffset);
        const { onAuthenticatedClick } = useAuthenticatedClick(onClick);

        return (
            <Cell
                {...props}
                onClick={onAuthenticatedClick}
                onEventClick={onEventClick}
            />
        );
    };

    WrappedComponent.displayName = `WithClick(View)`;

    return WrappedComponent;
};

export default WithClick;
