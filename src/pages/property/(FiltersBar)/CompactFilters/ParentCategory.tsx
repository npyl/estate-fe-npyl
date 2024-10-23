import {
    resetParentCategories,
    selectParentCategories,
    setParentCategories,
} from "@/slices/filters";
import { useTranslation } from "react-i18next";
import ClearableSection from "@/components/Filters/ClearableSection";
import { useGlobals } from "@/hooks/useGlobals";
import { KeyValue } from "@/types/KeyValue";
import { FC, ReactNode } from "react";
import { PPButton } from "@/components/styled";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import CounterChip from "./OptionCheckbox/CounterChip";
import useOption from "./OptionCheckbox/useOption";
import getParentCategoriesIcons from "@/assets/icons/parent-categories";
import { TOptionMapper } from "./OptionCheckbox/types";
import useFilterCounters from "@/hooks/property/useFilterCounters";
import { SxProps, Theme } from "@mui/material";

//Here i use the images with width and height set to 45 for the Parent category inside the Filters
const getIcons = (sx?: SxProps<Theme>): Record<string, ReactNode> => ({
    RESIDENTIAL: (
        <img
            src={"/static/categoryPhotos/home.webp"}
            alt="Home"
            style={{ width: 45, height: 45 }}
        />
    ),
    COMMERCIAL: (
        <img
            src={"/static/categoryPhotos/commercial.webp"}
            alt="Home"
            style={{ width: 45, height: 45 }}
        />
    ),
    LAND: (
        <img
            src={"/static/categoryPhotos/land.webp"}
            alt="Home"
            style={{ width: 45, height: 45 }}
        />
    ),
    OTHER: (
        <img
            src={"/static/categoryPhotos/more.webp"}
            alt="Home"
            style={{ width: 45, height: 45 }}
        />
    ),
});
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

const mapper: TOptionMapper = (optionKey, counters) =>
    counters?.parent_categories[optionKey.toLowerCase()] || 0;

interface IOption {
    option: KeyValue;
}

const Option: FC<IOption> = ({ option: { key, value } }) => {
    const { isChecked, handleToggle } = useOption(
        key,
        selectParentCategories,
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
                {getIcons()[key]}
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
