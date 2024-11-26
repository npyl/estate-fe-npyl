import useFilterCounters from "@/hooks/property/useFilterCounters";
import Skeleton from "@mui/material/Skeleton";
import { FC } from "react";
import { TOptionMapper } from "./types";
import Typography, { TypographyProps } from "@mui/material/Typography";

interface CounterChipProps extends Omit<TypographyProps, "disabled"> {
    optionKey: string;
    mapper: TOptionMapper; // map optionKey to counterKey
}

const CounterChip: FC<CounterChipProps> = ({ optionKey, mapper, ...props }) => {
    const { counters, isCountersLoading } = useFilterCounters();

    const label = mapper(optionKey, counters);

    if (isCountersLoading)
        return (
            <Skeleton width={50} height={38} sx={{ borderRadius: "15px" }} />
        );

    return (
        <Typography variant="body2" color="textSecondary" {...props}>
            ({label})
        </Typography>
    );
};

export default CounterChip;
