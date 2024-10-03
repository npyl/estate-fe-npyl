import { Stack, StackProps } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getChangedFields, selectIds } from "src/slices/filters";
import { getFilterTags, getPairFilterTags } from "./tags";
import GeneralChip from "./Chips";

const ChosenFilters: FC<StackProps> = (props) => {
    const { t } = useTranslation();

    const changedProps = useSelector(getChangedFields);
    const ids = useSelector(selectIds);

    const filterTags = useMemo(() => getFilterTags(t), [t]);
    const pairFilterTags = useMemo(() => getPairFilterTags(t), [t]);

    return (
        <Stack direction="row" gap={0.3} flexWrap="wrap" {...props}>
            {ids.map((key) => (
                <GeneralChip
                    key={key}
                    filterKey={key}
                    changedProps={changedProps}
                    filterTags={filterTags}
                    pairFilterTags={pairFilterTags}
                />
            ))}
        </Stack>
    );
};

export default ChosenFilters;
