import {
    Autocomplete,
    Box,
    Checkbox,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    SelectChangeEvent,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import { FC, useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useGlobals } from "src/hooks/useGlobals";
import {
    useAllPropertiesQuery,
    useLazyGetPropertyByCodeQuery,
} from "src/services/properties";
import {
    setMaxFloor,
    setMinFloor,
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
import { IProperties } from "src/types/properties";
import { useFormContext } from "react-hook-form";
import { RHFSelect } from "src/components/hook-form";

interface DemandFormProps {
    index: number;
}

const leaserName = "leaser";
const buyerName = "buyer";

interface MultiSelectProps {
    name: string;
    label: string;
    options: KeyValue[];
}

const MultiSelect = ({ name, label, options }: MultiSelectProps) => {
    const { watch, setValue } = useFormContext();

    const values = (watch(name) as string[]) || [];

    const renderValue = useCallback(
        (selected: string[]) =>
            selected
                .map((key) => options.find((item) => item.key === key)?.value)
                .filter(Boolean)
                .join(", "),
        [options]
    );

    const handleChange = useCallback(
        (e: SelectChangeEvent<string[]>) => setValue(name, e.target.value),
        [name]
    );

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel>{label}</InputLabel>
            <RHFSelect
                multiple
                fullWidth
                name={name}
                input={<OutlinedInput />}
                onChange={handleChange}
                renderValue={renderValue}
                value={values}
            >
                {options.map(({ key, value }, i) => (
                    <MenuItem key={i} value={key}>
                        <Checkbox checked={values?.indexOf(key) > -1} />
                        {value}
                    </MenuItem>
                ))}
            </RHFSelect>
        </FormControl>
    );
};

const DemandForm: FC<DemandFormProps> = ({ index }) => {
    const { t } = useTranslation();
    const { watch, setValue } = useFormContext();
    const dispatch = useDispatch();

    const [getPropertyByCode] = useLazyGetPropertyByCodeQuery();

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

    const [propertyCode, setPropertyCode] = useState<string>("");

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
    const minFloor = watch(getDemandFilterName("minFloor")) || "";
    const maxFloor = watch(getDemandFilterName("maxFloor")) || "";

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

    const propertyCodes: string[] =
        useAllPropertiesQuery(undefined, {
            selectFromResult: ({ data }) => ({
                data: data
                    ?.filter((property) => property.code !== null)
                    .map((property) => {
                        return property.code;
                    }),
            }),
        }).data || [];

    const fillFromPropertyForCode = useCallback(
        (p: IProperties) => {
            if (!p) return;

            const setFilter = (key: keyof IDemandFiltersPOST, value: any) =>
                setValue(`demands[${index}].filters.${key}`, value);

            setFilter("parentCategories", p.parentCategory.key);
            setFilter("categories", p.category.key);
            setFilter("furnished", p.technicalFeatures.furnished.key);
            setFilter("state", p.state.key);
            setFilter("minBedrooms", p.details.bedrooms);
            setFilter("minBathrooms", p.details.bathrooms);
            setFilter("minCovered", p.technicalFeatures.coverageFactor);
            setFilter("minPlot", p.plotArea);
            setFilter("minPrice", p.price);
            setFilter("minFloor", p.details.floor.key);
            setFilter(
                "minYearOfConstruction",
                p.construction.yearOfConstruction
            );
            setFilter(
                "labels",
                p.labels.map((label) => label.id)
            );
        },
        [index]
    );

    const autocompleteChange = useCallback(
        (_event: any, value: string | null) => {
            setPropertyCode(value || "");

            if (value)
                getPropertyByCode(value).unwrap().then(fillFromPropertyForCode);
        },
        [index]
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

            <Box px={1.5}>
                <Autocomplete
                    disablePortal
                    value={propertyCode}
                    onChange={autocompleteChange}
                    options={propertyCodes}
                    renderInput={(params) => (
                        <TextField {...params} label={t("Property Code")} />
                    )}
                />

                <MultiSelect
                    name={getDemandFilterName("parentCategories")}
                    label={t("Parent Category")}
                    options={parentCategoryEnum}
                />

                <Grid container>
                    {parentCategories?.map((e, i) => {
                        // Find the name (value) of the selected parent category using its key (e)
                        const pc = parentCategoryEnum.find(
                            (item) => item.key === e
                        )?.value;

                        return (
                            <Grid key={i} item xs={6}>
                                <MultiSelect
                                    name={getDemandFilterName("categories")}
                                    label={`${t("Category")} (${pc})`}
                                    options={subCategoriesMap[e]}
                                />
                            </Grid>
                        );
                    })}
                </Grid>

                <MultiSelect
                    name={getDemandFilterName("furnished")}
                    label={t("Furnishing")}
                    options={furnishingEnum}
                />

                <MultiSelect
                    name={getDemandFilterName("state")}
                    label={t("State")}
                    options={stateEnum}
                />

                <LabelSelect index={index} />

                <RHFSelect
                    name={getDemandName("timeframe")}
                    label={t("Time Frame")}
                >
                    {timeframeEnum.map(({ key, value }, i) => (
                        <MenuItem key={i} value={key}>
                            {value}
                        </MenuItem>
                    ))}
                </RHFSelect>

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

                {minFloorsArray && maxFloorsArray && (
                    <>
                        <Typography variant="h6">{t("Floor")}</Typography>
                        <Grid
                            container
                            direction={"row"}
                            spacing={1}
                            paddingTop={2}
                            paddingLeft={3}
                            paddingRight={3}
                        >
                            <Slider
                                orientation="horizontal"
                                value={[
                                    minFloorsArray.indexOf(minFloor),
                                    maxFloorsArray.indexOf(maxFloor),
                                ]}
                                onChange={(
                                    _event: any,
                                    newValue: number | number[],
                                    _activeThumb: number
                                ) => {
                                    if (!Array.isArray(newValue)) return;

                                    const min = minFloorsArray[newValue[0]];
                                    const max = maxFloorsArray[newValue[1]];

                                    dispatch(
                                        setMinFloor({
                                            index,
                                            value: min,
                                        })
                                    );
                                    dispatch(
                                        setMaxFloor({
                                            index,
                                            value: max,
                                        })
                                    );
                                }}
                                valueLabelDisplay="auto"
                                valueLabelFormat={valueLabelFormat}
                                min={0}
                                max={maxFloorsArray.length - 41}
                            />

                            <MultiSelect
                                name={getDemandFilterName("minFloor")}
                                label={t("Min Floor")}
                                options={minFloors}
                            />
                            <MultiSelect
                                name={getDemandFilterName("maxFloor")}
                                label={t("Max Floor")}
                                options={maxFloors}
                            />
                        </Grid>
                    </>
                )}
            </Box>

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
