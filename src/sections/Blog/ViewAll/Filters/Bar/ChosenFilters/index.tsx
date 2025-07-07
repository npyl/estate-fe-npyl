import { Stack, StackProps } from "@mui/material";
import { FC } from "react";
import GeneralChip from "./Chips";
import { useIds } from "@/sections/Blog/ViewAll/Filters/Context";

const ChosenFilters: FC<StackProps> = (props) => {
    const ids = useIds();

    return (
        <Stack direction="row" gap={0.3} flexWrap="wrap" {...props}>
            {ids.map((key) => (
                <GeneralChip key={key} filterKey={key} />
            ))}
        </Stack>
    );
};

export default ChosenFilters;
