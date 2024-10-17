import { FC } from "react";
import { TCalendarEvent } from "../types";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";

interface CompactCalendarEventProps extends BoxProps {
    event: TCalendarEvent;
}

const CompactCalendarEvent: FC<CompactCalendarEventProps> = ({
    event,
    ...props
}) => (
    <Box
        position="absolute"
        left={50}
        right={0}
        top={5}
        height="50px"
        bgcolor={event.type.color}
        p={1}
        mx={1}
        overflow="hidden"
        boxShadow={10}
        {...props}
    >
        <Typography variant="subtitle2" noWrap>
            {event.title}
        </Typography>
    </Box>
);

export default CompactCalendarEvent;
