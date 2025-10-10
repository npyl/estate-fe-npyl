import { FC, useCallback } from "react";
import MuiPopover from "@mui/material/Popover";
import { TCalendarEvent, TOnEventClick } from "@/components/Calendar/types";
import CompactCalendarEvent from "@/components/Calendar/Event/Compact";
import Stack from "@mui/material/Stack";
import { useFiltersContext } from "../context";
import { CALENDAR_SEARCH_POPOVER_TESTID, getOptionTestId } from "./constants";

const getEvent = (onEventClick: TOnEventClick) => (event: TCalendarEvent) => (
    <CompactCalendarEvent
        data-testid={getOptionTestId(event.id)}
        key={event.id}
        event={event}
        onEventClick={onEventClick}
    />
);

interface PopoverProps {
    anchorEl: HTMLElement;
    events: TCalendarEvent[];
    onWaitEventAndClick: (eventId: string) => void;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({
    anchorEl,
    events,
    onWaitEventAndClick,
    onClose,
}) => {
    const { onDateChange } = useFiltersContext();

    const onEventClick: TOnEventClick = useCallback(
        (_, ce) => {
            onDateChange(new Date(ce.startDate));
            onWaitEventAndClick(ce.id);
            onClose();
        },
        [onWaitEventAndClick, onDateChange]
    );

    return (
        <MuiPopover
            open
            disableAutoFocus // prevent focus ring
            disableEnforceFocus // prevent search losing focus
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            onClose={onClose}
        >
            <Stack
                data-testid={CALENDAR_SEARCH_POPOVER_TESTID}
                spacing={1}
                width="max-content"
                p={1}
            >
                {events.map(getEvent(onEventClick))}
            </Stack>
        </MuiPopover>
    );
};

export default Popover;
