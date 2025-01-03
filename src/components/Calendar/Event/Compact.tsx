import { FC, MouseEvent } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack, { StackProps } from "@mui/material/Stack";
import { alpha, styled } from "@mui/material";
import Duration from "./_shared/Duration";
import { EventProps } from "./types";
import DateInfo from "./_shared/DateInfo";
import getTypeColor from "./_shared/getTypeColor";
import { TCalendarEventType } from "../types";

const StyledStack = styled(Stack)<StackProps & { type: TCalendarEventType }>(
    ({ type, theme }) => ({
        alignItems: "center",
        justifyContent: "space-between",

        borderRadius: "2px",

        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),

        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),

        cursor: "pointer",

        "&:hover": {
            boxShadow: theme.shadows[10],
            backgroundColor: alpha(getTypeColor(type), 0.3),
        },
    })
);

interface CompactEventProps extends EventProps {
    withDate?: boolean;
}

const CompactCalendarEvent: FC<CompactEventProps> = ({
    event,
    withDate = false,
    onClick,
    onDragEnd: _ /* INFO: relevant only for the normal Event */,
    ...props
}) => {
    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        onClick?.(event);
    };

    return (
        <StyledStack
            type={event.type}
            spacing={1}
            direction="row"
            onClick={handleClick}
            {...props}
        >
            <Stack direction="row" spacing={1} alignItems="start">
                <Box
                    minWidth="5px"
                    width="5px"
                    maxWidth="5px"
                    height="20px"
                    borderRadius="2px"
                    bgcolor={getTypeColor(event.type)}
                />

                <Typography variant="subtitle2">{event.title}</Typography>
            </Stack>

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
