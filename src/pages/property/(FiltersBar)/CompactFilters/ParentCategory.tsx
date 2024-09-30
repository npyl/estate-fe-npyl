import {
    resetParentCategories,
    selectParentCategories,
    setParentCategories,
} from "@/slices/filters";
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
import getParentCategoriesIcons from "@/assets/icons/parent-categories";

// -----------------------------------------------------------------

const FlexItem = styled.div`
    flex-basis: 100%;

    @media (min-width: 600px) {
        flex-basis: calc(50% - 4px); // Subtracting half of the gap
    }

    @media (min-width: 900px) {
        flex-basis: calc(25% - 6px); // Subtracting 3/4 of the gap
    }
`;

interface IOption {
    option: KeyValue;
}

const Option: FC<IOption> = ({ option: { key, value } }) => {
    const { isChecked, handleToggle } = useOption(
        key,
        selectParentCategories,
        setParentCategories
    );

    return (
        <FlexItem>
            <PPButton clicked={isChecked} onClick={handleToggle}>
                {getParentCategoriesIcons()[key]}
                <Stack direction="row" spacing={1} mt={1}>
                    <Typography>{value}</Typography>
                    <CounterChip filterKey={key as any} />
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
    return (
        <ClearableSection
            title={t("Parent Category")}
            reset={resetParentCategories}
        >
            <Stack direction="row" gap={1} flexWrap="wrap" p={4}>
                {parentCategoryEnum.map(getOption)}
            </Stack>
        </ClearableSection>
    );
};

export default ParentCategory;
