import { useIds } from "@/sections/Emails/Filters/Context";
import Stack from "@mui/material/Stack";
import getChip from "./getChip";

const ChosenFilters = () => {
    const ids = useIds();
    return (
        <Stack direction="row" spacing={1} flexWrap="wrap">
            {ids.map(getChip)}
        </Stack>
    );
};

export default ChosenFilters;
