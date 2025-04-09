import { FC, MouseEvent, useCallback } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Duration from "../_shared/Duration";
import { EventProps } from "../types";
import DateInfo from "../_shared/DateInfo";
import StyledStack from "./StyledStack";
import { TCalendarEvent, TOnEventClick } from "../../types";

interface CompactEventProps extends EventProps {
    event: TCalendarEvent;
    withDate?: boolean;
    onEventClick?: TOnEventClick;
}

const CompactCalendarEvent: FC<CompactEventProps> = ({
    event,
    withDate = false,
    onEventClick,
    ...props
}) => {
    const handleClick = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            onEventClick?.(e, event);
        },
        [onEventClick, event]
    );

    return (
        <StyledStack
            type={event.type}
            colorId={event.colorId}
            onClick={handleClick}
            {...props}
        >
            <Typography variant="subtitle2">{event.title}</Typography>

            <Stack spacing={0.3} alignItems="end" height={1}>
                <Duration
                    start={event.startDate}
                    end={event.endDate}
                    fontSize="12px"
                    overflow="visible"
                    noWrap
                />

                {withDate ? <DateInfo date={event.startDate} /> : null}
            </Stack>
        </StyledStack>
    );
};

export default CompactCalendarEvent;
