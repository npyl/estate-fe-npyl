import { RangeKeyDict, DateRangeProps } from "react-date-range";
import parseISO from "date-fns/parseISO";
import { FC, useCallback, useMemo } from "react";
import useNavigationRenderer from "./useNavigationRenderer";
import { primary } from "@/theme/light-theme-options";
import StyledDateRange from "./styled";

interface ContentProps extends Omit<DateRangeProps, "ranges" | "onChange"> {
    startDate: string;
    endDate: string;
    onChange: (startDate: string, endDate: string) => void;
}

const Content: FC<ContentProps> = ({
    startDate,
    endDate,
    onChange,
    ...props
}) => {
    const navigationRenderer = useNavigationRenderer();

    const ranges = useMemo(
        () => [
            {
                startDate: startDate ? parseISO(startDate) : new Date(),
                endDate: endDate ? parseISO(endDate) : new Date(),
                key: "selection",
            },
        ],
        [startDate, endDate]
    );

    const handleChange = useCallback((ranges: RangeKeyDict) => {
        const { selection } = ranges;
        if (!selection.startDate || !selection.endDate) return;

        onChange(
            selection.startDate.toISOString(),
            selection.endDate.toISOString()
        );
    }, []);

    return (
        <StyledDateRange
            rangeColors={[primary.main]}
            showDateDisplay={false}
            navigatorRenderer={navigationRenderer}
            ranges={ranges}
            onChange={handleChange}
            {...props}
        />
    );
};

export type { ContentProps };
export default Content;
