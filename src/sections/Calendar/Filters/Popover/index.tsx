import { FC, useCallback } from "react";
import MuiPopover from "@mui/material/Popover";
import { TCalendarEvent, TOnEventClick } from "@/components/Calendar/types";
import CompactCalendarEvent from "@/components/Calendar/Event/Compact";
import Stack from "@mui/material/Stack";
import { useFiltersContext } from "../context";
import waitForEventAndClick from "./waitForEventAndClick";

const getEvent = (onEventClick: TOnEventClick) => (event: TCalendarEvent) => (
    <CompactCalendarEvent
        key={event.id}
        event={event}
        onEventClick={onEventClick}
    />
);

interface PopoverProps {
    anchorEl: HTMLElement;
    events: TCalendarEvent[];
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({ anchorEl, events, onClose }) => {
    const { onDateChange } = useFiltersContext();

    const onEventClick: TOnEventClick = useCallback(
        (_, ce) => {
            onDateChange(new Date(ce.startDate));
            onClose();

            // INFO: this is an async method; let it fire on its own; we do not care about the result
            waitForEventAndClick(ce.id);
        },
        [onDateChange]
    );

    return (
        <MuiPopover
            open
            disableAutoFocus // prevent focus ring
            disableEnforceFocus // prevent search losing focus
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            onClose={onClose}
        >
            <Stack spacing={1} width="max-content" p={1}>
                {events.map(getEvent(onEventClick))}
            </Stack>
        </MuiPopover>
    );
};

export default Popover;
