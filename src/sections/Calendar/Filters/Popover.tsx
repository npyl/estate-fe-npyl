import { FC, useCallback, useRef, useState } from "react";
import MuiPopover from "@mui/material/Popover";
import { TCalendarEvent, TOnEventClick } from "@/components/Calendar/types";
import CompactCalendarEvent from "@/components/Calendar/Event/Compact";
import Stack from "@mui/material/Stack";
import dynamic from "next/dynamic";
const EventDialog = dynamic(() => import("../Event/View"));

const getEvent = (onClick: TOnEventClick) => (event: TCalendarEvent) =>
    <CompactCalendarEvent key={event.id} event={event} onClick={onClick} />;

interface PopoverProps {
    anchorEl: HTMLElement;
    events: TCalendarEvent[];
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({ anchorEl, events, onClose }) => {
    const anchorRef = useRef<HTMLDivElement>();

    const [event, setEvent] = useState<TCalendarEvent>();
    const closeDialog = useCallback(() => setEvent(undefined), []);

    const onEventClick: TOnEventClick = useCallback((me, ce) => {
        anchorRef.current = me.currentTarget;
        setEvent(ce);
    }, []);

    return (
        <>
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

            {event ? (
                <EventDialog
                    anchorEl={anchorRef.current}
                    event={event}
                    onClose={closeDialog}
                />
            ) : null}
        </>
    );
};

export default Popover;
