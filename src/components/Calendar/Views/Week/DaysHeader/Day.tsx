import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { TODAY, WEEKDAYS } from "@/components/BaseCalendar/constants";
import HighlightTypography from "@/components/Calendar/HighlightTypography";

interface DayTypographyProps {
    date: Date;
}

const DayTypography: FC<DayTypographyProps> = ({ date }) => {
    const day = date.toLocaleDateString("en-US", {
        day: "2-digit",
    });

    const isToday = date.toDateString() === TODAY.toDateString();

    return (
        <HighlightTypography
            highlight={isToday}
            textAlign="center"
            variant="h3"
            width="fit-content"
            borderRadius="100%"
            px={1.5}
            py={0.5}
        >
            {day}
        </HighlightTypography>
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
