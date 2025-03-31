import { FC } from "react";
import useWeekUtils from "@/components/BaseCalendar/useWeekUtils";
import { gridStyle, StyledStack } from "./styled";
import Day from "./Day";
import ModeToggle from "./ModeToggle";

// ------------------------------------------------------------------------------

const getDay = (date: Date) => <Day key={date.toDateString()} date={date} />;

// ------------------------------------------------------------------------------

interface DaysHeaderProps {
    date: Date;
}

const DaysHeader: FC<DaysHeaderProps> = ({ date }) => {
    const { getStartOfWeek } = useWeekUtils();

    const startOfWeek = getStartOfWeek(date);

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        return day;
    });

    return (
        <StyledStack>
            <ModeToggle />
            <div style={gridStyle}>{weekDays.map(getDay)}</div>
        </StyledStack>
    );
};

export default DaysHeader;
