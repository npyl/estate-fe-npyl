import useFilterCounters from "@/hooks/property/useFilterCounters";
import { IPropertyFilterCounters } from "@/types/properties";
import Chip, { ChipProps } from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import { FC } from "react";

interface CounterChipProps extends Omit<ChipProps, "disabled"> {
    optionKey: string;
}

const CounterChip: FC<CounterChipProps> = ({ optionKey, ...props }) => {
    const { counters, isCountersLoading } = useFilterCounters();

    const label = counters?.[optionKey]?.toString() || "0";
    const isDisabled = counters?.[optionKey] === 0;

    if (isCountersLoading)
        return (
            <Skeleton width={50} height={38} sx={{ borderRadius: "15px" }} />
        );

    return (
        <Chip
            label={label}
            variant="outlined"
            size="small"
            disabled={isDisabled}
            {...props}
        />
    );
};

export default CounterChip;
