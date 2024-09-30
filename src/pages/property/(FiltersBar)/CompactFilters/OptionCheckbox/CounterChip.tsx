import useFilterCounters from "@/hooks/property/useFilterCounters";
import { IPropertyFilterCounters } from "@/types/properties";
import Chip, { ChipProps } from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import { FC } from "react";

interface CounterChipProps extends Omit<ChipProps, "disabled"> {
    // TODO: IpropertyFilter's keys -> should be the same as IPropertyFilterCounters' keys...
    filterKey: keyof IPropertyFilterCounters;
}

const CounterChip: FC<CounterChipProps> = ({ filterKey, ...props }) => {
    const { counters, isCountersLoading } = useFilterCounters();

    const label = counters?.[filterKey]?.toString() || "0";
    const isDisabled = counters?.[filterKey] === 0;

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
