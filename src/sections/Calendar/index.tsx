import CalendarGoogle from "@/components/CalendarGoogle";
import StyledHeader from "./Header";

const CalendarSection = () => (
    <CalendarGoogle
        slots={{
            Header: StyledHeader,
        }}
    />
);

export default CalendarSection;
