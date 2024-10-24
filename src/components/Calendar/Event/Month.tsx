import { FC } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material";
import Duration from "./_shared/Duration";
import { EventProps } from "./types";

const StyledStack = styled(Stack)(({ theme }) => ({
    alignItems: "center",

    borderRadius: "20px",

    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),

    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),

    cursor: "pointer",

    "&:hover": {
        backgroundColor:
            theme.palette.mode === "light"
                ? theme.palette.neutral?.[300]
                : theme.palette.neutral?.[800],
    },
}));

const MonthCalendarEvent: FC<EventProps> = ({ event, onClick, ...props }) => {
    const handleClick = () => onClick?.(event);

    return (
        <StyledStack
            spacing={1}
            direction="row"
            onClick={handleClick}
            {...props}
        >
            <Duration
                start={event.startDate}
                end={event.endDate}
                fontSize="12px"
                noWrap
            />

            <Box
                width="5px"
                height="5px"
                borderRadius="100%"
                bgcolor={event.type.color}
                p={1}
            />

            <Typography variant="subtitle2" noWrap>
                {event.title}
            </Typography>
        </StyledStack>
    );
};

export default MonthCalendarEvent;
