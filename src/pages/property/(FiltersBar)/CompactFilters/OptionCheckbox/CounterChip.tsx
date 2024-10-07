import useFilterCounters from "@/hooks/property/useFilterCounters";
import Chip, { ChipProps } from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import { FC } from "react";
import { TOptionMapper } from "./types";

interface CounterChipProps extends Omit<ChipProps, "disabled"> {
    optionKey: string;
    mapper: TOptionMapper; // map optionKey to counterKey
}

const CounterChip: FC<CounterChipProps> = ({ optionKey, mapper, ...props }) => {
    const { counters, isCountersLoading } = useFilterCounters();

    const label = mapper(optionKey, counters);
    const isDisabled = mapper(optionKey, counters) === 0;

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
            sx={{
                borderTop: "none",
                borderBottom: "none",
            }}
            {...props}
        />
    );
};

export default CounterChip;
