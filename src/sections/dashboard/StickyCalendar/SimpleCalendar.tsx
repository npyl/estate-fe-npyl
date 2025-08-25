import { Paper, styled } from "@mui/material";
import Numbering from "@/components/Calendar/Views/Numbering";
import CalendarGoogle from "@/components/CalendarGoogle";
import IsAuthenticatedIndicator from "@/sections/Google/WorkspaceIndicator";
import CalendarGoogleDayView from "@/components/CalendarGoogle/Views/Day";
import {
    CalendarCellProps,
    CalendarDayViewProps,
} from "@/components/Calendar/types";
import CalendarEvent from "@/components/Calendar/Event";
import { EventProps } from "@/components/Calendar/Event/types";
import { CELL_HOUR_HEIGHT } from "@/constants/calendar";
import useTimemappedEvents from "@/components/Calendar/Views/useTimemappedEvents";
import React, { FC, useCallback } from "react";

// ------------------------------------------------------------------------

const PaperSx = {
    borderRadius: "15px",
    boxShadow: 5,
};

// ------------------------------------------------------------------------

const CustomButtonGroup = () => <IsAuthenticatedIndicator />;

// ------------------------------------------------------------------------

const StyledNumbering = styled(Numbering)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),

    paddingTop: theme.spacing(1.5),
}));

const StyledDayView = styled(CalendarGoogleDayView)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.neutral?.[800],

    height: `${11 * CELL_HOUR_HEIGHT}px`, // 7am - 5pm
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

const CustomCalendarEvent = ({
    onLoad,
    ...props
}: CustomCalendarEventProps) => {
    // onLoad() support on mount; null happens on unmount
    const handleRef = useCallback((node: HTMLDivElement | null) => {
        if (!node) return;
        onLoad?.(node.offsetTop);
    }, []);

    return <CalendarEvent {...props} ref={handleRef} />;
};

// -----------------------------------------------------------------------------------

interface DayCell extends CalendarCellProps {
    onFirstEventLoad: (top: number) => void;
}

const Cell: FC<DayCell> = ({
    events,
    onEventClick: _0,
    onEventDragEnd: _1,
    onFirstEventLoad,
}) => {
    const getEventProps = useCallback(
        (i: number) => ({ onLoad: i === 0 ? onFirstEventLoad : undefined }),
        [onFirstEventLoad]
    );

    const EVENTS = useTimemappedEvents(
        events,
        // ...
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        // ...
        CustomCalendarEvent,
        getEventProps
    );

    return (
        <>
            {/* Events */}
            {EVENTS}
        </>
    );
};

// -----------------------------------------------------------------------------------

const CustomDayView: FC<CalendarDayViewProps> = ({ events = [], ...props }) => {
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
        <StyledDayView
            id="simple-calendar-day-view"
            Numbering={StyledNumbering}
            Cell={(props) => (
                <Cell {...props} onFirstEventLoad={handleFirstLoad} />
            )}
            {...props}
        />
    );
};

// ------------------------------------------------------------------------

const SimpleCalendar = () => (
    <Paper sx={PaperSx} variant="outlined">
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
