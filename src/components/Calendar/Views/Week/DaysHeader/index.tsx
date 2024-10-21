import { FC } from "react";
import { Box, Divider, Stack } from "@mui/material";
import { getStartOfWeek } from "@/components/BaseCalendar/util";
import { gridStyle, StyledStack } from "./styled";
import Day from "./Day";
import { Z_INDEX } from "@/constants/calendar";

const getDay = (date: Date) => (
    <Box>
        <Day key={date.toISOString()} date={date} />

        <Divider
            orientation="vertical"
            sx={{
                position: "absolute",
                height: "100vh",
                zIndex: Z_INDEX.DIVIDER,
            }}
        />
    </Box>
);

interface DaysHeaderProps {
    date: Date;
}

const DaysHeader: FC<DaysHeaderProps> = ({ date }) => {
    const startOfWeek = getStartOfWeek(date);

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        return day;
    });

    return (
        <StyledStack>
            <Stack width="50px" />
            <div style={gridStyle}>{weekDays.map(getDay)}</div>
        </StyledStack>
    );
};

export default DaysHeader;
