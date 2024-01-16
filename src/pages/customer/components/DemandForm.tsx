import {
    Box,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import { useGlobals } from "src/hooks/useGlobals";
import {
    setDemandCities,
    setDemandComplexes,
    setDemandRegions,
} from "src/slices/customer";
import { useTranslation } from "react-i18next";
import { AreaOfPreference } from "./DemandForm/AreaOfPreference";
import { LabelSelect } from "./LabelSelect";
import PriorityFeatures from "./PriorityFeatures";
import { KeyValue } from "src/types/KeyValue";
import { DemandFormSlider } from "./DemandForm/components/DemandFormSlider";
import { IDemandFiltersPOST, IDemandPOST } from "src/types/demand";
import { useFormContext } from "react-hook-form";
import { RHFSelect } from "src/components/hook-form";
import { TranslationType } from "src/types/translation";

import MultiSelect from "./DemandForm/components/MultiSelect";
import DemandAutocomplete from "./DemandForm/Autocomplete";

interface DemandFormProps {
    index: number;
}

const leaserName = "leaser";
const buyerName = "buyer";

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
        name={getDemandFilterName("state")}
        label={t("State")}
        options={stateEnum}
    />,

    <LabelSelect index={index} />,

    <FormControl fullWidth variant="outlined">
        <InputLabel>{t("Time Frame")}</InputLabel>
        <RHFSelect
            fullWidth
            name={getDemandName("timeframe")}
            label={t("Time Frame")}
        >
            {timeframeEnum.map(({ key, value }, i) => (
                <MenuItem key={i} value={key}>
                    {value}
                </MenuItem>
            ))}
        </RHFSelect>
    </FormControl>,
];

const DemandForm: FC<DemandFormProps> = ({ index }) => {
    const { t } = useTranslation();
    const { watch } = useFormContext();

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
        minFloorsArray,
        maxFloorsArray,
    } = useMemo(
        () => ({
            furnishingEnum: detailsEnum?.furnished || [],
            minFloors: detailsEnum?.floors || [],
            maxFloors: detailsEnum?.floors || [],
            minFloorsArray: detailsEnum?.floors?.map((i) => i.key) || [],
            maxFloorsArray: detailsEnum?.floors?.map((i) => i.key) || [],
        }),
        [detailsEnum]
    );

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

                <DemandFormSlider
                    label={t("Price")}
                    min="minPrice"
                    max="maxPrice"
                    defaultMin={0}
                    defaultMax={1000000}
                    demandIndex={index}
                    adornment="€"
                    step={stepValue}
                />
                <DemandFormSlider
                    label={t("Size")}
                    min="minCovered"
                    max="maxCovered"
                    defaultMin={0}
                    defaultMax={300}
                    demandIndex={index}
                    adornment="m²"
                    step={10}
                />
                <DemandFormSlider
                    label={t("Size of Plot")}
                    min="minPlot"
                    max="maxPlot"
                    defaultMin={0}
                    defaultMax={500}
                    demandIndex={index}
                    adornment="m²"
                    step={10}
                />
                <DemandFormSlider
                    label={t("Bedrooms")}
                    min="minBedrooms"
                    max="maxBedrooms"
                    defaultMin={0}
                    defaultMax={10}
                    demandIndex={index}
                />
                <DemandFormSlider
                    label={t("Bathrooms")}
                    min="minBathrooms"
                    max="maxBathrooms"
                    defaultMin={0}
                    defaultMax={10}
                    demandIndex={index}
                />
                <DemandFormSlider
                    label={t("Year of Construction")}
                    min="minYearOfConstruction"
                    max="maxYearOfConstruction"
                    defaultMin={1960}
                    defaultMax={new Date().getFullYear()}
                    demandIndex={index}
                />

                {minFloorsArray && maxFloorsArray ? (
                    <DemandFormSlider
                        label={t("Floor")}
                        min="minFloor"
                        max="maxFloor"
                        defaultMin={0}
                        defaultMax={maxFloorsArray.length - 41}
                        demandIndex={index}

                        // value={[
                        //     minFloorsArray.indexOf(minFloor),
                        //     maxFloorsArray.indexOf(maxFloor),
                        // ]}
                        // onChange={(
                        //     _event: any,
                        //     newValue: number | number[],
                        //     _activeThumb: number
                        // ) => {
                        //     if (!Array.isArray(newValue)) return;

                        //     const min = minFloorsArray[newValue[0]];
                        //     const max = maxFloorsArray[newValue[1]];

                        //     setValue(
                        //         getDemandFilterName("minFloor"),
                        //         min
                        //     );
                        //     setValue(
                        //         getDemandFilterName("maxFloor"),
                        //         max
                        //     );
                        // }}
                        // valueLabelFormat={valueLabelFormat}
                    />
                ) : null}
            </Stack>

            <AreaOfPreference
                index={index}
                // setters
                setCities={setDemandCities}
                setComplexes={setDemandComplexes}
                setRegions={setDemandRegions}
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
