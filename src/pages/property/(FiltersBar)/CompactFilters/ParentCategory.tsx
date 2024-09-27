import {
    resetParentCategories,
    selectParentCategories,
    setParentCategories,
} from "@/slices/filters";
import { useTranslation } from "react-i18next";
import ClearableSection from "@/components/Filters/ClearableSection";
import { useGlobals } from "@/hooks/useGlobals";
import { useSelector } from "react-redux";
import { KeyValue } from "@/types/KeyValue";
import { FC } from "react";
import { useDispatch } from "react-redux";

import { PPButton } from "@/components/styled";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";

const icons: Record<string, string> = {
    RESIDENTIAL: "/static/categories/commercial.png",
    COMMERCIAL: "/static/categories/land.png",
    LAND: "/static/categories/other.png",
    OTHER: "/static/categories/residential.png",
};

// -----------------------------------------------------------------
interface IOption {
    option: KeyValue;
}

const FlexItem = styled.div`
    flex-basis: 100%;

    @media (min-width: 600px) {
        flex-basis: calc(50% - 4px); // Subtracting half of the gap
    }

    @media (min-width: 900px) {
        flex-basis: calc(25% - 6px); // Subtracting 3/4 of the gap
    }
`;

const Option: FC<IOption> = ({ option: { key, value } }) => {
    const dispatch = useDispatch();
    const parentCategories = useSelector(selectParentCategories) || [];
    const isChecked = parentCategories.includes(key);

    const handleChange = () => {
        // toggle
        const calculated = parentCategories.includes(key)
            ? parentCategories.filter((s) => s !== key)
            : [...parentCategories, key];
        // update slice

        dispatch(setParentCategories(calculated));
    };

    return (
        <FlexItem>
            <PPButton clicked={isChecked} onClick={handleChange}>
                <img src={icons[key]} alt={value} />
                <Typography mt={1}>{value}</Typography>
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
