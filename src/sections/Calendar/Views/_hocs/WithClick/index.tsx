import {
    CalendarCellProps,
    TCalendarEvent,
    TOnEventClick,
} from "@/components/Calendar/types";
import uuidv4 from "@/utils/uuidv4";
import dynamic from "next/dynamic";
import { ComponentType, useCallback, MouseEvent, useMemo } from "react";
import useTimeFromOffset from "./useTimeFromOffset";
import useAuthenticatedClick from "./useAuthenticatedClick";
import useExclusivePopper from "./useExclusivePopper";

const EventPopper = dynamic(() => import("@/sections/Calendar/Event/View"));
const CreatePopper = dynamic(() => import("@/sections/Calendar/Event/Create"));

type AnyCalendarCell = ComponentType<CalendarCellProps>;

const getEndDate = (startDate: string) => {
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);
    return endDate.toISOString();
};

const getEventWith = (startDate: string): TCalendarEvent => ({
    id: uuidv4(),
    startDate,
    endDate: getEndDate(startDate),
    title: "",
    type: "TASK",
    colorId: "",
    description: "",
    location: "",
    people: [],
});

const EVENT_POPPER_CLOSED = undefined;
const CREATE_POPPER_CLOSED = "";

const WithClick = (Cell: AnyCalendarCell) => {
    const WrappedComponent = ({
        events: _events,
        ...props
    }: CalendarCellProps) => {
        const [
            anchorEl,
            // ...
            event,
            startDate,
            // ...
            setEvent,
            setStartDate,
            // ...
            closePopper,
        ] = useExclusivePopper<TCalendarEvent, string>(
            EVENT_POPPER_CLOSED,
            CREATE_POPPER_CLOSED
        );

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
            (e: MouseEvent<HTMLDivElement>, date: string) =>
                setStartDate(e.currentTarget, date),
            []
        );
        const { onClick } = useTimeFromOffset(props.date, onClickWithOffset);
        const { onAuthenticatedClick } = useAuthenticatedClick(onClick);

        //
        // General
        //
        const events = useMemo(
            () => (startDate ? [..._events, getEventWith(startDate)] : _events),
            [_events, startDate]
        );

        return (
            <>
                <Cell
                    events={events}
                    {...props}
                    onClick={onAuthenticatedClick}
                    onEventClick={onEventClick}
                />

                {event ? (
                    <EventPopper
                        anchorEl={anchorEl}
                        event={event}
                        onClose={closePopper}
                    />
                ) : null}

                {startDate && anchorEl ? (
                    <CreatePopper
                        anchorEl={anchorEl}
                        startDate={startDate}
                        onClose={closePopper}
                    />
                ) : null}
            </>
        );
    };

    WrappedComponent.displayName = `WithClick(Cell)`;

    return WrappedComponent;
};

export default WithClick;
