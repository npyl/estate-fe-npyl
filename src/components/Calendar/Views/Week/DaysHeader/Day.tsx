import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { TODAY } from "@/components/BaseCalendar/constants";
import HighlightTypography from "@/components/Calendar/HighlightTypography";
import useCalendarLocale from "@/components/Calendar/useCalendarLocale";

interface DayTypographyProps {
    date: Date;
}

const DayTypography: FC<DayTypographyProps> = ({ date }) => {
    const locale = useCalendarLocale();

    const day = date.toLocaleDateString(locale, {
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

const Day: FC<DayProps> = ({ date }) => {
    const locale = useCalendarLocale();
    const weekday = date.toLocaleDateString(locale, { weekday: "short" });
    return (
        <Stack justifyContent="center" alignItems="center">
            <Typography
                textAlign="center"
                variant="h6"
                width={1}
                color="text.secondary"
            >
                {weekday}
            </Typography>
            <Stack width={1} justifyContent="center" alignItems="center">
                <DayTypography date={date} />
            </Stack>
        </Stack>
    );
};

export default Day;
