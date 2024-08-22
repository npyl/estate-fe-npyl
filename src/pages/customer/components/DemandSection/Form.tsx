import {
    Divider,
    Grid,
    SelectChangeEvent,
    Slider,
    Stack,
    Typography,
} from "@mui/material";
import { FC, Suspense, lazy, useCallback, useEffect, useMemo } from "react";
import { useGlobals } from "src/hooks/useGlobals";
import { useTranslation } from "react-i18next";
import { LabelSelect } from "./LabelSelect";
import PriorityFeatures from "./PriorityFeatures";
import { KeyValue } from "src/types/KeyValue";
import { DemandFormSlider } from "./components/Slider";
import { IDemandFiltersPOST, IDemandPOST } from "src/types/demand";
import { useFormContext } from "react-hook-form";
import { TranslationType } from "src/types/translation";

import Select from "@/components/hook-form/Select";
import MultiSelect from "./components/MultiSelect";
import DemandAutocomplete from "./Autocomplete";
import MapSkeleton from "./MapSkeleton";

// Dynamic
const AreaOfPreference = lazy(() => import("./AreaOfPreference"));

interface DemandFormProps {
    index: number;
}

const leaserName = "leaser";
const buyerName = "buyer";

// Function to generate the options for each field
const generateRange = (start: number, end: number, step: number = 1) => {
    const range = [];
    for (let i = start; i <= end; i += step) {
        range.push(i);
    }
    return range;
};

const priceOptions = generateRange(10000, 1000000, 10000);
const sizeOptions = generateRange(0, 300, 10);
const plotSizeOptions = generateRange(0, 500, 10);
const bedroomOptions = generateRange(0, 10, 1);
const bathroomOptions = generateRange(0, 10, 1);
const yearOptions = generateRange(1960, 2024);

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
    // eslint-disable-next-line react/jsx-key
    <DemandAutocomplete index={index} />,

    // eslint-disable-next-line react/jsx-key
    <MultiSelect
        name={getDemandFilterName("parentCategories")}
        label={t("Parent Category")}
        options={parentCategoryEnum}
    />,

    // eslint-disable-next-line react/jsx-key
    <MultiSelect
        name={getDemandFilterName("furnished")}
        label={t("Furnishing")}
        options={furnishingEnum}
    />,

    // eslint-disable-next-line react/jsx-key
    <MultiSelect
        name={getDemandFilterName("states")}
        label={t("State")}
        options={stateEnum}
    />,

    // eslint-disable-next-line react/jsx-key
    <LabelSelect onDemandFiltersName={getDemandFilterName} />,

    // eslint-disable-next-line react/jsx-key
    <Select
        name={getDemandName("timeframe")}
        label={t("Time Frame")}
        options={timeframeEnum}
    />,
];
interface FloorSliderProps {
    onDemandFilterName: (k: keyof IDemandFiltersPOST) => any;
}
const FloorSlider: FC<FloorSliderProps> = ({ onDemandFilterName }) => {
    const { t } = useTranslation();
    const { watch, setValue } = useFormContext();
    const { minFloors, maxFloors } = useDemandEnums();

    const minName = onDemandFilterName("minFloor");
    const maxName = onDemandFilterName("maxFloor");

    const minFloor = watch(minName);
    const maxFloor = watch(maxName);

    //  function to remove underscores and convert to number so i can compare them in order to not get maxValue less than minValue
    const cleanValue = (value: string | null): number | null => {
        if (!value) return null;
        return parseInt(value.replace(/^_/, ""), 10);
    };

    const handleChangeMin = useCallback(
        (event: SelectChangeEvent<string>) => {
            const min = event.target.value === "" ? null : event.target.value;
            const max = watch(maxName);

            const cleanMin = cleanValue(min);
            const cleanMax = cleanValue(max);

            if (cleanMin !== null && cleanMax !== null && cleanMin > cleanMax) {
                setValue(maxName, min); // Set maxFloor to minFloor value if min is greater
            }

            setValue(minName, min);
        },
        [maxName, minName, setValue, watch]
    );

    const handleChangeMax = useCallback(
        (event: SelectChangeEvent<string>) => {
            const max = event.target.value === "" ? null : event.target.value;
            const min = watch(minName);

            const cleanMax = cleanValue(max);
            const cleanMin = cleanValue(min);

            if (cleanMax !== null && cleanMin !== null && cleanMax < cleanMin) {
                setValue(minName, max); // Set minFloor to maxFloor value if max is less
            }

            setValue(maxName, max);
        },
        [maxName, minName, setValue, watch]
    );

    // Ensure the values are set to null when they are empty strings
    useEffect(() => {
        if (minFloor === "") {
            setValue(minName, null);
        }
        if (maxFloor === "") {
            setValue(maxName, null);
        }
    }, [minFloor, maxFloor, setValue, minName, maxName]);

    // Ensure maxFloor is updated if it is less than minFloor
    useEffect(() => {
        const cleanMinFloor = cleanValue(minFloor);
        const cleanMaxFloor = cleanValue(maxFloor);

        if (
            cleanMinFloor !== null &&
            cleanMaxFloor !== null &&
            cleanMinFloor > cleanMaxFloor
        ) {
            setValue(maxName, minFloor); // Adjust maxFloor to be equal to minFloor
        }
    }, [minFloor, maxFloor, setValue, maxName]);

    return (
        <>
            <Typography variant="h6">{t("Floors")}</Typography>
            <Stack mt={2} px={1}>
                <Grid container direction="row" spacing={1.5}>
                    <Grid item xs={6}>
                        <Select
                            name={minName}
                            label={t("Min")}
                            options={minFloors}
                            value={minFloor !== null ? minFloor : ""}
                            onChange={handleChangeMin}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            name={maxName}
                            label={t("Max")}
                            options={maxFloors}
                            value={maxFloor !== null ? maxFloor : ""}
                            onChange={handleChangeMax}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
};

const getSLIDERS = (
    t: TranslationType,
    index: number,
    stepValue: number,
    onDemandFilterName: (k: keyof IDemandFiltersPOST) => any
) => [
    // eslint-disable-next-line react/jsx-key
    <DemandFormSlider
        label={t("Price")}
        min="minPrice"
        max="maxPrice"
        defaultMin={0}
        defaultMax={1000000}
        demandIndex={index}
        adornment="€"
        step={stepValue}
        options={priceOptions}
        isForPrice={true}
    />,
    // eslint-disable-next-line react/jsx-key
    <DemandFormSlider
        label={t("Size")}
        min="minCovered"
        max="maxCovered"
        defaultMin={0}
        defaultMax={300}
        demandIndex={index}
        adornment="m²"
        step={10}
        options={sizeOptions}
    />,
    // eslint-disable-next-line react/jsx-key
    <DemandFormSlider
        label={t("Size of Plot")}
        min="minPlot"
        max="maxPlot"
        defaultMin={0}
        defaultMax={500}
        demandIndex={index}
        adornment="m²"
        step={10}
        options={plotSizeOptions}
    />,
    // eslint-disable-next-line react/jsx-key
    <DemandFormSlider
        label={t("Bedrooms")}
        min="minBedrooms"
        max="maxBedrooms"
        defaultMin={0}
        defaultMax={10}
        demandIndex={index}
        step={1}
        options={bedroomOptions}
    />,
    // eslint-disable-next-line react/jsx-key
    <DemandFormSlider
        label={t("Bathrooms")}
        min="minBathrooms"
        max="maxBathrooms"
        defaultMin={0}
        defaultMax={10}
        demandIndex={index}
        step={1}
        options={bathroomOptions}
    />,
    // eslint-disable-next-line react/jsx-key
    <DemandFormSlider
        label={t("Year of Construction")}
        min="minYearOfConstruction"
        max="maxYearOfConstruction"
        defaultMin={1960}
        defaultMax={new Date().getFullYear()}
        demandIndex={index}
        options={yearOptions}
        isForYearOfConstruction={true}
    />,
    // eslint-disable-next-line react/jsx-key
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
            <Stack gap={1.5} mt={1}>
                <Grid container spacing={1.5}>
                    {FIELDS.map((f, i) => (
                        <Grid key={i} item xs={12} sm={6}>
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

                <Grid container spacing={1.5}>
                    {SLIDERS.map((s, i) => (
                        <Grid key={i} xs={12} sm={6} item>
                            {s}
                        </Grid>
                    ))}
                </Grid>
            </Stack>

            <Suspense fallback={<MapSkeleton />}>
                <AreaOfPreference
                    index={index}
                    onGetDemandName={getDemandName}
                    onGetDemandFilterName={getDemandFilterName}
                />
            </Suspense>

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
