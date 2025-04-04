import {
    CalendarCellProps,
    TCalendarEvent,
    TOnEventClick,
} from "@/components/Calendar/types";
import uuidv4 from "@/utils/uuidv4";
import dynamic from "next/dynamic";
import {
    ComponentType,
    useCallback,
    useRef,
    useState,
    MouseEvent,
    useMemo,
} from "react";
import useTimeFromOffset from "../_hooks/useTimeFromOffset";
import useAuthenticatedClick from "../_hooks/useAuthenticatedClick";

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

const WithClick = (Cell: AnyCalendarCell) => {
    const WrappedComponent = ({
        events: _events,
        ...props
    }: CalendarCellProps) => {
        const anchorRef = useRef<HTMLDivElement>();

        //
        //  View / Edit
        //
        const [event, setEvent] = useState<TCalendarEvent>();
        const onEventClick: TOnEventClick = useCallback((ce, me) => {
            closePopper();
            anchorRef.current = me.currentTarget;
            setEvent(ce);
        }, []);

        //
        //  Create
        //
        const [startDate, setStartDate] = useState("");
        const onClickWithOffset = useCallback(
            (e: MouseEvent<HTMLDivElement>, date: string) => {
                closePopper();
                anchorRef.current = e.currentTarget;
                setStartDate(date);
            },
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
        const closePopper = useCallback(() => {
            setEvent(undefined);
            setStartDate("");
        }, []);

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
                        anchorEl={anchorRef.current}
                        event={event}
                        onClose={closePopper}
                    />
                ) : null}

                {startDate && anchorRef.current ? (
                    <CreatePopper
                        anchorEl={anchorRef.current}
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
