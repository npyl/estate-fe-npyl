import { FC } from "react";
import { TMode } from "./types";
import { SpaceBetween } from "@/components/styled";
import PreviousButton from "./PreviousButton";
import MonthSelect from "./MonthSelect";
import YearSelect from "./YearSelect";
import NextButton from "./NextButton";

interface NavigatorRendererProps {
    currFocusedDate: Date;
    changeShownDate: (value: Date | number | string, mode?: TMode) => void;
}

const NavigatorRenderer: FC<NavigatorRendererProps> = ({
    currFocusedDate,
    changeShownDate,
}) => {
    const currentYear = currFocusedDate.getFullYear();
    const currentMonth = currFocusedDate.getMonth();

    return (
        <SpaceBetween alignItems="center" gap={1} width={1}>
            <PreviousButton changeShownDate={changeShownDate} />

            <MonthSelect
                sx={{ width: "fit-content" }}
                value={currentMonth}
                onChange={changeShownDate}
            />

            <YearSelect
                sx={{ width: "fit-content" }}
                value={currentYear}
                onChange={changeShownDate}
            />

            <NextButton changeShownDate={changeShownDate} />
        </SpaceBetween>
    );
};

export default NavigatorRenderer;
