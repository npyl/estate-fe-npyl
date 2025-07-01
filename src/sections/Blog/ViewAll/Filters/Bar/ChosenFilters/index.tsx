import { Stack, StackProps } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getFilterTags } from "./tags";
import GeneralChip from "./Chips";
import { useIds } from "@/sections/Blog/ViewAll/Filters/Context";

const ChosenFilters: FC<StackProps> = (props) => {
    const { t } = useTranslation();

    const ids = useIds();
    const filterTags = useMemo(() => getFilterTags(t), [t]);

    return (
        <Stack direction="row" gap={0.3} flexWrap="wrap" {...props}>
            {ids.map((key) => (
                <GeneralChip
                    key={key}
                    filterKey={key}
                    filterTags={filterTags}
                />
            ))}
        </Stack>
    );
};

export default ChosenFilters;
