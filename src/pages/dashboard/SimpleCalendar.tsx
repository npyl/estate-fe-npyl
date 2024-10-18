import { Paper, styled } from "@mui/material";
import { FC, useCallback } from "react";
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
import CalendarEvent, { CalendarEventProps } from "@/components/Calendar/Event";
import CalendarHeader from "@/components/Calendar/Header";

// ------------------------------------------------------------------------

const PaperSx = {
    borderRadius: "15px",
};

// ------------------------------------------------------------------------

const StyledHeader = styled(CalendarHeader)({
    backgroundColor: "transparent",
});

// ------------------------------------------------------------------------

const CustomButtonGroup = ({}: any) => <IsAuthenticatedIndicator />;

// ------------------------------------------------------------------------

const StyledNumbering = styled(Numbering)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(1.5),
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

interface CustomCalendarEventProps extends Omit<CalendarEventProps, "onLoad"> {
    event: TCalendarEvent;
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
    (onFirstLoad: (top: number) => void) => (ce: TCalendarEvent, i: number) =>
        (
            <CustomCalendarEvent
                key={ce.id}
                event={ce}
                onLoad={i === 0 ? onFirstLoad : undefined}
            />
        );

// -----------------------------------------------------------------------------------

interface DayCell extends CalendarCellProps {
    onFirstEventLoad: (top: number) => void;
}

const Cell: FC<DayCell> = ({ events, onFirstEventLoad }) => (
    <>
        {/* Events */}
        {events.map(getEvent(onFirstEventLoad))}
    </>
);

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
                <Cell
                    // TODO: ...
                    events={[]}
                    {...props}
                    onFirstEventLoad={handleFirstLoad}
                />
            )}
            {...props}
        />
    );
};

// ------------------------------------------------------------------------

const SimpleCalendar = () => (
    <Paper sx={PaperSx}>
        <CalendarGoogle
            initialView="day"
            slots={{
                Header: StyledHeader,
            }}
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
