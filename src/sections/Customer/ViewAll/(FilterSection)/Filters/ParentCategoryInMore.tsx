import { useTranslation } from "react-i18next";
import ClearableSection from "@/components/Filters/ClearableSection";
import { useGlobals } from "@/sections/useGlobals";
import { KeyValue } from "@/types/KeyValue";
import { FC, useCallback } from "react";
import { PPButton } from "@/components/styled";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import getIcons from "@/assets/icons/parent-categories";
import { useFiltersContext, useParentCategories } from "../Context";

// Responsive layout for icon buttons
const FlexItem = styled.div`
    flex-basis: 100%;

    @media (min-width: 600px) {
        flex-basis: calc(50% - 4px);
    }

    @media (min-width: 900px) {
        flex-basis: calc(25% - 6px);
    }
`;

// ----------------------------------------------------------------

interface IOption {
    option: KeyValue;
}

const Option: FC<IOption> = ({ option: { key, value } }) => {
    const { setParentCategories } = useFiltersContext();

    const selected = useParentCategories() || [];

    const isChecked = selected?.includes(key);
    const toggle = () => {
        const updated = isChecked
            ? selected?.filter((k) => k !== key)
            : [...selected, key];
        setParentCategories(updated);
    };

    return (
        <FlexItem>
            <PPButton clicked={isChecked} onClick={toggle}>
                {getIcons({ width: 45, height: 45 })[key]}
                <Stack alignItems="center" mt={1}>
                    <Typography fontSize={14}>{value}</Typography>
                </Stack>
            </PPButton>
        </FlexItem>
    );
};

// ----------------------------------------------------------------

const ParentCategoryInMore = () => {
    const { t } = useTranslation();
    const data = useGlobals();

    const { setCategories, setParentCategories } = useFiltersContext();

    const parentCategoryEnum = data?.property?.parentCategory || [];

    const reset = useCallback(() => {
        setParentCategories([]);
        setCategories([]);
    }, []);

    return (
        <ClearableSection title={t("Parent Category")} reset={reset}>
            <Stack direction="row" gap={1} flexWrap="wrap" p={1}>
                {parentCategoryEnum.map((option) => (
                    <Option key={option.key} option={option} />
                ))}
            </Stack>
        </ClearableSection>
    );
};

export default ParentCategoryInMore;
