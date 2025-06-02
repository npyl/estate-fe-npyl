import { useTranslation } from "react-i18next";
import ClearableSection from "@/components/Filters/ClearableSection";
import { useGlobals } from "src/hooks/useGlobals";
import { useDispatch, useSelector } from "src/store";
import {
    selectCategories,
    selectParentCategories,
    setCategories,
} from "src/slices/customer/filters";
import { Checkbox, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import { KeyValue } from "src/types/KeyValue";

// ----------------------------------------

const GroupTitle = styled(Typography)`
    font-weight: 400;
    margin-bottom: 8px;
    margin-top: 12px;
`;

const CategoryItem = styled.label<{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
    font-size: 14px;
`;

// ----------------------------------------

const FilterCategoryInMore = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const data = useGlobals();

    const parentCategories = useSelector(selectParentCategories) || [];
    const selected = useSelector(selectCategories) || [];

    const propertyEnums = data?.property;

    const subCategoriesMap: Record<string, KeyValue[]> = {
        RESIDENTIAL: propertyEnums?.residentialCategory || [],
        COMMERCIAL: propertyEnums?.commercialCategory || [],
        LAND: propertyEnums?.landCategory || [],
        OTHER: propertyEnums?.otherCategory || [],
    };

    const handleToggle = (key: string, parentKey: string) => {
        if (!parentCategories.includes(parentKey)) return; // prevent toggle if parentCategory not selected

        const isSelected = selected.includes(key);
        const updated = isSelected
            ? selected.filter((k) => k !== key)
            : [...selected, key];
        dispatch(setCategories(updated));
    };

    const reset = () => {
        dispatch(setCategories([]));
    };

    return (
        <ClearableSection title={t("Category")} reset={reset}>
            <Grid container spacing={0}>
                {Object.entries(subCategoriesMap).map(
                    ([parentKey, categoryList]) => (
                        <Grid item xs={12} sm={6} md={4} key={parentKey}>
                            <GroupTitle color="text.secondary">
                                {t(
                                    {
                                        RESIDENTIAL: "Residential",
                                        COMMERCIAL: "Commercial",
                                        LAND: "Land",
                                        OTHER: "Other",
                                    }[parentKey] || parentKey
                                )}
                            </GroupTitle>

                            <Stack spacing={0.5}>
                                {categoryList.map(({ key, value }) => {
                                    const isSelected = selected.includes(key);
                                    const isItemDisabled =
                                        !parentCategories.includes(parentKey);

                                    return (
                                        <CategoryItem
                                            key={key}
                                            disabled={isItemDisabled}
                                        >
                                            <Checkbox
                                                size="small"
                                                disabled={isItemDisabled}
                                                checked={isSelected}
                                                onChange={() =>
                                                    handleToggle(key, parentKey)
                                                }
                                            />
                                            <span>{t(value)}</span>
                                        </CategoryItem>
                                    );
                                })}
                            </Stack>
                        </Grid>
                    )
                )}
            </Grid>
        </ClearableSection>
    );
};

export default FilterCategoryInMore;
