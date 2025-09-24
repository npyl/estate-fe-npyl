import { SelectChangeEvent } from "@/components/Select";
import Stack from "@mui/material/Stack";
import { FC, useCallback } from "react";
import MonthSelect from "./MonthSelect";
import YearSelect from "./YearSelect";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

interface NavigatorRendererProps {
    currFocusedDate: Date;
    changeShownDate: (
        value: Date | number | string,
        mode?: "set" | "setYear" | "setMonth" | "monthOffset"
    ) => void;
}

const NavigatorRenderer: FC<NavigatorRendererProps> = ({
    currFocusedDate,
    changeShownDate,
}) => {
    const currentYear = currFocusedDate.getFullYear();
    const currentMonth = currFocusedDate.getMonth();

    const handleYearChange = useCallback((event: SelectChangeEvent<number>) => {
        const selectedYear = event.target.value as number;
        changeShownDate(selectedYear, "setYear");
    }, []);

    const handleMonthChange = useCallback(
        (event: SelectChangeEvent<number>) => {
            const selectedMonth = event.target.value as number;
            changeShownDate(selectedMonth, "setMonth");
        },
        []
    );

    return (
        <Stack direction="row" alignItems="center" spacing={1} width={1}>
            <IconButton size="small">
                <ChevronLeft />
            </IconButton>

            <MonthSelect
                sx={{ width: "fit-content" }}
                value={currentMonth}
                label="Month"
                onChange={handleMonthChange}
            />

            <YearSelect
                sx={{ width: "fit-content" }}
                value={currentYear}
                label="Year"
                onChange={handleYearChange}
            />

            <IconButton size="small">
                <ChevronRight />
            </IconButton>
        </Stack>
    );
};

const useNagivationRenderer = () =>
    useCallback(
        (
            d: Date,
            changeCb: (
                value: Date | number | string,
                mode?: "set" | "setYear" | "setMonth" | "monthOffset"
            ) => void
        ) => (
            <NavigatorRenderer currFocusedDate={d} changeShownDate={changeCb} />
        ),
        []
    );

export default useNagivationRenderer;
