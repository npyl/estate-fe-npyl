import { Box, Divider, Grid, Slider, Stack, Typography } from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import { useGlobals } from "src/hooks/useGlobals";
import { useTranslation } from "react-i18next";
import { AreaOfPreference } from "./AreaOfPreference";
import { LabelSelect } from "./LabelSelect";
import PriorityFeatures from "./PriorityFeatures";
import { KeyValue } from "src/types/KeyValue";
import { DemandFormSlider } from "./components/Slider";
import { IDemandFiltersPOST, IDemandPOST } from "src/types/demand";
import { useFormContext } from "react-hook-form";
import { TranslationType } from "src/types/translation";

import Select from "../components/Select";
import MultiSelect from "./components/MultiSelect";
import DemandAutocomplete from "./Autocomplete";

interface DemandFormProps {
    index: number;
}

const leaserName = "leaser";
const buyerName = "buyer";

const useDemandEnums = () => {
    const enums = useGlobals();

    const { propertyEnums, timeframeEnum } = useMemo(
        () => ({
            propertyEnums: enums?.property,
            timeframeEnum: enums?.customer?.timeframe || [],
        }),
        [enums]
    );
    const { stateEnum, detailsEnum, parentCategoryEnum } = useMemo(
        () => ({
            stateEnum: propertyEnums?.state || [],
            detailsEnum: propertyEnums?.details,
            parentCategoryEnum: propertyEnums?.parentCategory || [],
        }),
        [propertyEnums]
    );
    const {
        furnishingEnum,
        minFloors,
        maxFloors,
        minFloorsKeys,
        maxFloorsKeys,
    } = useMemo(
        () => ({
            furnishingEnum: detailsEnum?.furnished || [],
            minFloors: detailsEnum?.floors || [],
            maxFloors: detailsEnum?.floors || [],
            minFloorsKeys: detailsEnum?.floors?.map((i) => i.key) || [],
            maxFloorsKeys: detailsEnum?.floors?.map((i) => i.key) || [],
        }),
        [detailsEnum]
    );

    return {
        propertyEnums,
        timeframeEnum,
        stateEnum,
        detailsEnum,
        parentCategoryEnum,
        furnishingEnum,
        minFloors,
        maxFloors,
        minFloorsKeys,
        maxFloorsKeys,
    };
};

const getFIELDS = (
    t: TranslationType,
    index: number,
    // ---
    parentCategoryEnum: KeyValue[],
    furnishingEnum: KeyValue[],
    stateEnum: KeyValue[],
    timeframeEnum: KeyValue[],
    // ---
    getDemandFilterName: (k: keyof IDemandFiltersPOST) => any,
    getDemandName: (k: keyof IDemandPOST) => any
) => [
    <DemandAutocomplete index={index} />,

    <MultiSelect
        name={getDemandFilterName("parentCategories")}
        label={t("Parent Category")}
        options={parentCategoryEnum}
    />,

    <MultiSelect
        name={getDemandFilterName("furnished")}
        label={t("Furnishing")}
        options={furnishingEnum}
    />,

    <MultiSelect
        name={getDemandFilterName("states")}
        label={t("State")}
        options={stateEnum}
    />,

    <LabelSelect onDemandFiltersName={getDemandFilterName} />,

    <Select
        name={getDemandName("timeframe")}
        label={t("Time Frame")}
        options={timeframeEnum}
    />,
];

interface FloorSliderProps {
    onDemandFilterName: (k: keyof IDemandFiltersPOST) => any;
}

const FloorSlider = ({ onDemandFilterName }: FloorSliderProps) => {
    const { t } = useTranslation();
    const { watch, setValue } = useFormContext();
    const { minFloors, maxFloors, minFloorsKeys, maxFloorsKeys } =
        useDemandEnums();

    const minName = onDemandFilterName("minFloor");
    const maxName = onDemandFilterName("maxFloor");

    const minFloor = watch(minName) || -1;
    const maxFloor = watch(maxName) || -1;

    const valueLabelFormat = useCallback(
        (value: number, index: number): string => {
            if (minFloors.length < value || maxFloors.length < value) return "";

            return (
                (index === 0
                    ? minFloors[value]?.value
                    : maxFloors[value]?.value) || ""
            );
        },
        [minFloors, maxFloors]
    );

    const handleChange = useCallback(
        (e: any, v: number | number[]) => {
            if (!Array.isArray(v)) return;

            const min = minFloorsKeys[v[0]];
            const max = maxFloorsKeys[v[1]];

            setValue(minName, min);
            setValue(maxName, max);
        },
        [minName, maxName]
    );

    return (
        <Box>
            <Typography variant="h6">{t("Floor")}</Typography>
            <Slider
                orientation="horizontal"
                value={[
                    minFloorsKeys.indexOf(minFloor),
                    maxFloorsKeys.indexOf(maxFloor),
                ]}
                onChange={handleChange}
                valueLabelDisplay="auto"
                valueLabelFormat={valueLabelFormat}
                min={0}
                max={maxFloorsKeys.length - 41}
            />
            <Grid container direction="row" spacing={1.5}>
                <Grid item xs={6}>
                    <Select
                        name={minName}
                        label={t("Min Floor")}
                        options={minFloors}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Select
                        name={maxName}
                        label={t("Max Floor")}
                        options={maxFloors}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

const getSLIDERS = (
    t: TranslationType,
    index: number,
    stepValue: number,
    onDemandFilterName: (k: keyof IDemandFiltersPOST) => any
) => [
    <DemandFormSlider
        label={t("Price")}
        min="minPrice"
        max="maxPrice"
        defaultMin={0}
        defaultMax={1000000}
        demandIndex={index}
        adornment="€"
        step={stepValue}
    />,
    <DemandFormSlider
        label={t("Size")}
        min="minCovered"
        max="maxCovered"
        defaultMin={0}
        defaultMax={300}
        demandIndex={index}
        adornment="m²"
        step={10}
    />,
    <DemandFormSlider
        label={t("Size of Plot")}
        min="minPlot"
        max="maxPlot"
        defaultMin={0}
        defaultMax={500}
        demandIndex={index}
        adornment="m²"
        step={10}
    />,
    <DemandFormSlider
        label={t("Bedrooms")}
        min="minBedrooms"
        max="maxBedrooms"
        defaultMin={0}
        defaultMax={10}
        demandIndex={index}
    />,
    <DemandFormSlider
        label={t("Bathrooms")}
        min="minBathrooms"
        max="maxBathrooms"
        defaultMin={0}
        defaultMax={10}
        demandIndex={index}
    />,
    <DemandFormSlider
        label={t("Year of Construction")}
        min="minYearOfConstruction"
        max="maxYearOfConstruction"
        defaultMin={1960}
        defaultMax={new Date().getFullYear()}
        demandIndex={index}
    />,
    <FloorSlider onDemandFilterName={onDemandFilterName} />,
];

const DemandForm: FC<DemandFormProps> = ({ index }) => {
    const { t } = useTranslation();
    const { watch } = useFormContext();

    const {
        propertyEnums,
        parentCategoryEnum,
        furnishingEnum,
        stateEnum,
        timeframeEnum,
    } = useDemandEnums();

    const leaser = watch(leaserName);
    const buyer = watch(buyerName);

    const stepValue = buyer ? 25000 : leaser ? 100 : 100; // default to 100 if neither is true

    const getDemandFilterName = useCallback(
        (name: keyof IDemandFiltersPOST) => `demands[${index}].filters.${name}`,
        [index]
    );
    const getDemandName = useCallback(
        (name: keyof IDemandPOST) => `demands[${index}].${name}`,
        [index]
    );

    const parentCategories =
        (watch(getDemandFilterName("parentCategories")) as string[]) || [];

    const subCategoriesMap: {
        [key: string]: KeyValue[];
    } = useMemo(
        () => ({
            RESIDENTIAL: propertyEnums?.residentialCategory || [],
            COMMERCIAL: propertyEnums?.commercialCategory || [],
            LAND: propertyEnums?.landCategory || [],
            OTHER: propertyEnums?.otherCategory || [],
        }),
        [propertyEnums]
    );

    const FIELDS = useMemo(
        () =>
            getFIELDS(
                t,
                index,
                // ---
                parentCategoryEnum,
                furnishingEnum,
                stateEnum,
                timeframeEnum,
                // ---
                getDemandFilterName,
                getDemandName
            ),
        [
            t,
            index,
            // ---
            parentCategoryEnum,
            furnishingEnum,
            stateEnum,
            timeframeEnum,
            // ---
            getDemandFilterName,
            getDemandName,
        ]
    );

    const SLIDERS = useMemo(
        () => getSLIDERS(t, index, stepValue, getDemandFilterName),
        [t, index, stepValue, getDemandFilterName]
    );

    return (
        <>
            <Box
                sx={{
                    p: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">
                    {t("Demand Form")} No.{index + 1}
                </Typography>
            </Box>

            <Stack px={1.5} gap={1.5}>
                <Grid container spacing={1.5}>
                    {FIELDS.map((f, i) => (
                        <Grid key={i} item xs={6}>
                            {f}
                        </Grid>
                    ))}
                </Grid>

                {parentCategories?.length > 0 ? (
                    <>
                        <Divider />
                        <Grid container spacing={1.5}>
                            {parentCategories?.map((e, i) => {
                                // Find the name (value) of the selected parent category using its key (e)
                                const pc = parentCategoryEnum.find(
                                    (item) => item.key === e
                                )?.value;

                                return (
                                    <Grid key={i} item xs={6}>
                                        <MultiSelect
                                            name={getDemandFilterName(
                                                "categories"
                                            )}
                                            label={`${t("Category")} (${pc})`}
                                            options={subCategoriesMap[e]}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </>
                ) : null}

                <Grid container>
                    {SLIDERS.map((s, i) => (
                        <Grid key={i} xs={6} item>
                            {s}
                        </Grid>
                    ))}
                </Grid>
            </Stack>

            <AreaOfPreference
                index={index}
                onGetDemandName={getDemandName}
                onGetDemandFilterName={getDemandFilterName}
            />

            {parentCategories?.map((e, i) => (
                <PriorityFeatures
                    key={`${i}_1`}
                    index={index}
                    parentCategory={e}
                />
            ))}
        </>
    );
};
export default DemandForm;
