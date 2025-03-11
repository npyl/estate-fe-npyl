/* eslint-disable react/jsx-key */

import { Grid } from "@mui/material";
import { FC, useMemo } from "react";
import LabelSelect from "./LabelSelect";
import { KeyValue } from "src/types/KeyValue";
import { TranslationType } from "src/types/translation";
import Select from "@/components/hook-form/dynamic/Select";
import MultiSelect from "../_shared/MultiSelect";
import DemandAutocomplete from "./Autocomplete";
import { useTranslation } from "react-i18next";
import { demandName, filterName } from "../util";
import useDemandEnums from "../useDemandEnums";

const getFIELDS = (
    t: TranslationType,
    index: number,
    // ---
    parentCategoryEnum: KeyValue[],
    furnishingEnum: KeyValue[],
    stateEnum: KeyValue[],
    timeframeEnum: KeyValue[]
) => [
    <DemandAutocomplete index={index} />,

    <MultiSelect
        name={filterName("parentCategories", index)}
        label={t("Parent Category")}
        options={parentCategoryEnum}
    />,

    <MultiSelect
        name={filterName("furnished", index)}
        label={t("Furnishing")}
        options={furnishingEnum}
    />,

    <MultiSelect
        name={filterName("states", index)}
        label={t("State")}
        options={stateEnum}
    />,

    <LabelSelect index={index} />,

    <Select
        isEnum
        name={demandName("timeframe", index)}
        label={t("Time Frame")}
        options={timeframeEnum}
        defaultValue=""
    />,
];

interface Props {
    index: number;
}

const Fields: FC<Props> = ({ index }) => {
    const { t } = useTranslation();

    const { parentCategoryEnum, furnishingEnum, stateEnum, timeframeEnum } =
        useDemandEnums();

    const FIELDS = useMemo(
        () =>
            getFIELDS(
                t,
                index,
                // ---
                parentCategoryEnum,
                furnishingEnum,
                stateEnum,
                timeframeEnum
            ),
        [
            t,
            index,
            // ---
            parentCategoryEnum,
            furnishingEnum,
            stateEnum,
            timeframeEnum,
        ]
    );

    return (
        <>
            {FIELDS.map((f, i) => (
                <Grid key={i} item xs={12} sm={6}>
                    {f}
                </Grid>
            ))}
        </>
    );
};

export default Fields;
