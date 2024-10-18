import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { WEEKDAYS } from "@/components/BaseCalendar/constants";

interface DayTypographyProps {
    date: Date;
}

const DayTypography: FC<DayTypographyProps> = ({ date }) => {
    const day = date.toLocaleDateString("en-US", {
        day: "2-digit",
    });

    const isToday = date.toDateString() === new Date().toDateString();
    const bgColor = isToday ? "primary.main" : "transparent";
    const color = isToday ? "background.paper" : "text.secondary";

    return (
        <Typography
            textAlign="center"
            variant="h3"
            width="fit-content"
            borderRadius="100%"
            bgcolor={bgColor}
            color={color}
            px={1.5}
            py={0.5}
        >
            {day}
        </Typography>
    );
};

interface DayProps {
    date: Date;
}

const Day: FC<DayProps> = ({ date }) => (
    <Stack justifyContent="center" alignItems="center">
        <Typography
            textAlign="center"
            variant="h6"
            width={1}
            color="text.secondary"
        >
            {WEEKDAYS[date.getDay()]}
        </Typography>
        <Stack width={1} justifyContent="center" alignItems="center">
            <DayTypography date={date} />
        </Stack>
    </Stack>
);

export default Day;
