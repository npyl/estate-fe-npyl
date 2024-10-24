import { Paper, styled } from "@mui/material";
import { FC, useCallback, useState } from "react";
import React from "react";
import Numbering from "@/components/Calendar/Views/Numbering";
import CalendarGoogle from "@/components/CalendarGoogle";
import IsAuthenticatedIndicator from "@/components/CalendarGoogle/ButtonGroup/IsAuthenticatedIndicator";
import CalendarGoogleDayView from "@/components/CalendarGoogle/Views/Day";
import {
    CalendarCellProps,
    CalendarDayViewProps,
    TCalendarEvent,
} from "@/components/Calendar/types";
import CalendarEvent from "@/components/Calendar/Event";
import { EventProps } from "@/components/Calendar/Event/types";
import EventDialog from "@/sections/Calendar/Event/View";

// ------------------------------------------------------------------------

const PaperSx = {
    borderRadius: "15px",
};

// ------------------------------------------------------------------------

const CustomButtonGroup = ({}: any) => <IsAuthenticatedIndicator />;

// ------------------------------------------------------------------------

const StyledNumbering = styled(Numbering)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
}));

const StyledDayView = styled(CalendarGoogleDayView)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.neutral?.[800],

    height: "500px",
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",

    // Scrolling behavior
    overflow: "hidden auto",
    overscrollBehavior: "contain",
    scrollbarWidth: "none",
    WebkitOverflowScrolling: "touch", // smooth scrolling
}));

// ------------------------------------------------------------------------------------

interface CustomCalendarEventProps extends Omit<EventProps, "onLoad"> {
    onLoad?: (top: number) => void;
}

const CustomCalendarEvent: React.FC<CustomCalendarEventProps> = ({
    onLoad,
    ...props
}) => {
    // onLoad() support on mount; null happens on unmount
    const handleRef = useCallback((node: HTMLDivElement | null) => {
        if (!node) return;
        onLoad?.(node.offsetTop);
    }, []);

    return <CalendarEvent {...props} ref={handleRef} />;
};

// -----------------------------------------------------------------------------------

const getEvent =
    (
        onClick: ((e: TCalendarEvent) => void) | undefined,
        onFirstLoad: (top: number) => void
    ) =>
    (ce: TCalendarEvent, i: number) =>
        (
            <CustomCalendarEvent
                key={ce.id}
                event={ce}
                onLoad={i === 0 ? onFirstLoad : undefined}
                onClick={onClick}
            />
        );

// -----------------------------------------------------------------------------------

interface DayCell extends CalendarCellProps {
    onFirstEventLoad: (top: number) => void;
}

const Cell: FC<DayCell> = ({ events, onEventClick, onFirstEventLoad }) => (
    <>
        {/* Events */}
        {events.map(getEvent(onEventClick, onFirstEventLoad))}
    </>
);

// -----------------------------------------------------------------------------------

const CustomDayView: FC<CalendarDayViewProps> = ({ events = [], ...props }) => {
    const [event, setEvent] = useState<TCalendarEvent>();
    const closeDialog = () => setEvent(undefined);

    // Scroll to first event on load
    const handleFirstLoad = useCallback((top: number) => {
        const element = document.getElementById("simple-calendar-day-view");
        if (!element) return;
        element.scrollTo({
            top: top - 7,
            behavior: "smooth",
        });
    }, []);

    return (
        <>
            <StyledDayView
                id="simple-calendar-day-view"
                Numbering={StyledNumbering}
                Cell={(props) => (
                    <Cell
                        // TODO: ...
                        events={[]}
                        {...props}
                        onEventClick={setEvent}
                        onFirstEventLoad={handleFirstLoad}
                    />
                )}
                {...props}
            />

            {event ? <EventDialog event={event} onClose={closeDialog} /> : null}
        </>
    );
};

// ------------------------------------------------------------------------

const SimpleCalendar = () => (
    <Paper sx={PaperSx}>
        <CalendarGoogle
            initialView="day"
            ViewSlots={{
                DayView: CustomDayView,
            }}
            HeaderSlots={{
                ViewButtonGroup: CustomButtonGroup,
            }}
        />
    </Paper>
);

export default React.memo(SimpleCalendar);
