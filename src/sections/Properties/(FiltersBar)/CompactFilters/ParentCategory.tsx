import { useTranslation } from "react-i18next";
import ClearableSection from "@/components/Filters/ClearableSection";
import { useGlobals } from "@/hooks/useGlobals";
import { KeyValue } from "@/types/KeyValue";
import { FC } from "react";
import { PPButton } from "@/components/styled";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import CounterChip from "./OptionCheckbox/CounterChip";
import useOption from "./OptionCheckbox/useOption";
import { TOptionMapper } from "./OptionCheckbox/types";
import useFilterCounters from "@/hooks/property/useFilterCounters";
import getIcons from "@/assets/icons/parent-categories";
import { useFiltersContext, useParentCategories } from "../../FiltersContext";

const FlexItem = styled.div`
    flex-basis: 100%;

    @media (min-width: 600px) {
        flex-basis: calc(50% - 4px); // Subtracting half of the gap
    }

    @media (min-width: 900px) {
        flex-basis: calc(25% - 6px); // Subtracting 3/4 of the gap
    }
`;

const mapper: TOptionMapper = (optionKey, counters) =>
    counters?.parent_categories[optionKey.toLowerCase()] || 0;

interface IOption {
    option: KeyValue;
}

const Option: FC<IOption> = ({ option: { key, value } }) => {
    const parentCategories = useParentCategories();
    const { setParentCategories } = useFiltersContext();

    const { isChecked, handleToggle } = useOption(
        key,
        parentCategories,
        setParentCategories
    );

    const { counters } = useFilterCounters();
    const isDisabled = mapper(key, counters) === 0;

    return (
        <FlexItem>
            <PPButton
                clicked={isChecked}
                disabled={isDisabled}
                onClick={handleToggle}
            >
                {getIcons({ width: 45, height: 45 })[key]}
                <Stack alignItems={"center"} mt={1}>
                    <Typography>{value}</Typography>
                    <CounterChip optionKey={key} mapper={mapper} />
                </Stack>
            </PPButton>
        </FlexItem>
    );
};

// -----------------------------------------------------------------

const getOption = (o: KeyValue) => <Option key={o.key} option={o} />;

// -----------------------------------------------------------------

const ParentCategory = () => {
    const { t } = useTranslation();
    const data = useGlobals();
    const parentCategoryEnum = data?.property?.parentCategory || [];

    const { resetParentCategories } = useFiltersContext();

    return (
        <ClearableSection
            title={t("Parent Category")}
            reset={resetParentCategories}
        >
            <Stack direction="row" gap={1} flexWrap="wrap" p={1}>
                {parentCategoryEnum.map(getOption)}
            </Stack>
        </ClearableSection>
    );
};

export default ParentCategory;
