import {
    Autocomplete,
    Box,
    Checkbox,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobals } from "src/hooks/useGlobals";
import {
    useAllPropertiesQuery,
    useGetPropertyByCodeQuery,
} from "src/services/properties";
import {
    setCategory, // setters
    setFurnished,
    setMaxBathrooms,
    setMaxBedrooms,
    setMaxCovered,
    setMaxFloor,
    setMaxPlot,
    setMaxPrice,
    setMaxYearOfConstruction,
    setMinBathrooms,
    setMinBedrooms,
    setMinCovered,
    setMinFloor,
    setMinPlot,
    setMinPrice,
    setMinYearOfConstruction,
    setParentCategory,
    setDemandLabels,
    setState,
    setTimeFrame, //Demand Location
    setDemandCities,
    setDemandComplexes,
    setDemandRegions,
    selectDemands,
} from "src/slices/customer";

import { useTranslation } from "react-i18next";
import { AreaOfPreference } from "./DemandForm/AreaOfPreference";
import { LabelSelect } from "./LabelSelect";
import PriorityFeatures from "./PriorityFeatures";
import NonPriorityFeatures from "./NonPriorityFeatures";
import { KeyValue } from "src/types/KeyValue";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { DemandFormSlider } from "./DemandForm/components/DemandFormSlider";

interface DemandFormProps {
    index: number;
}

const DemandForm: FC<DemandFormProps> = ({ index }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const enums = useGlobals();
    const propertyEnums = enums?.property;
    const stateEnum = propertyEnums?.state;
    const detailsEnum = propertyEnums?.details;
    const parentCategoryEnum = propertyEnums?.parentCategory;
    const furnishingEnum = detailsEnum?.furnished;
    const timeframeEnum = enums?.customer?.timeframe;
    const minFloors = detailsEnum?.floors;
    const maxFloors = detailsEnum?.floors;

    const demands = useSelector(selectDemands);

    const demand = demands[index] || {};
    const demandFilters = demand?.filters;
    const minBedrooms = demandFilters?.minBedrooms || 0;
    const maxBedrooms = demandFilters?.maxBedrooms || 0;
    const minBathrooms = demandFilters?.minBathrooms || 0;
    const maxBathrooms = demandFilters?.maxBathrooms || 0;
    const furnished = demandFilters?.furnished || [];
    const maxCovered = demandFilters?.maxCovered || 0;
    const minCovered = demandFilters?.minCovered || 0;
    const minPlot = demandFilters?.minPlot || 0;
    const maxPlot = demandFilters?.maxPlot || 0;
    const minYearOfConstruction = demandFilters?.minYearOfConstruction || 0;
    const maxYearOfConstruction = demandFilters?.maxYearOfConstruction || 0;
    const minFloor = demandFilters?.minFloor || "";
    const maxFloor = demandFilters?.maxFloor || "";
    const parentCategories = demandFilters?.parentCategories || [];
    const category = demandFilters?.categories || [];
    const state = demandFilters?.states || [];
    const minPrice = demandFilters?.minPrice || 0;
    const maxPrice = demandFilters?.maxPrice || 0;
    const timeFrame = demand.timeframe || [];

    const minFloorsArray = minFloors?.map((i) => i.key);
    const maxFloorsArray = maxFloors?.map((i) => i.key);

    // Location
    const cities = demandFilters?.cities || [];
    const complexes = demandFilters?.complexes || [];
    const regions = demandFilters?.regions || [];

    const [autocompleteValue, setAutocompleteValue] = useState("");

    const subCategoriesMap: {
        [key: string]: KeyValue[];
    } = {
        RESIDENTIAL: propertyEnums?.residentialCategory ?? [],
        COMMERCIAL: propertyEnums?.commercialCategory ?? [],
        LAND: propertyEnums?.landCategory ?? [],
        OTHER: propertyEnums?.otherCategory ?? [],
    };

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

    const { data: propertyForCode, isSuccess: isPropertyForCodeSuccess } =
        useGetPropertyByCodeQuery(autocompleteValue, {
            skip: !autocompleteValue,
        });

    useEffect(() => {
        if (!propertyForCode) return;

        dispatch(
            setParentCategory({
                index,
                value: [propertyForCode.parentCategory.key],
            })
        );
        dispatch(setCategory({ index, value: [propertyForCode.category.key] }));
        dispatch(
            setFurnished({
                index,
                value: [propertyForCode.technicalFeatures.furnished.key],
            })
        );
        dispatch(setState({ index, value: [propertyForCode.state.key] }));
        dispatch(
            setMinBedrooms({
                index,
                value: propertyForCode.details.bedrooms,
            })
        );
        dispatch(
            setMinBathrooms({
                index,
                value: propertyForCode.details.bathrooms,
            })
        );
        dispatch(
            setMinCovered({
                index,
                value: propertyForCode.technicalFeatures.coverageFactor,
            })
        );
        dispatch(setMinPlot({ index, value: propertyForCode.plotArea }));
        dispatch(setMinPrice({ index, value: propertyForCode.price }));
        dispatch(
            setMinFloor({ index, value: propertyForCode.details.floor.key })
        );
        dispatch(
            setMinYearOfConstruction({
                index,
                value: propertyForCode.construction.yearOfConstruction,
            })
        );

        dispatch(
            setDemandLabels({
                index,
                value: propertyForCode.labels.map((label) => label.id),
            })
        );
    }, [propertyForCode, isPropertyForCodeSuccess]);

    const autocompleteChange = (_event: any, value: string | null) =>
        setAutocompleteValue(value || "");

    const handleChange10 = (
        event: SelectChangeEvent<typeof parentCategories>
    ) => {
        const {
            target: { value },
        } = event;
        dispatch(
            setParentCategory({
                index,
                value: typeof value === "string" ? value.split(",") : value,
            })
        );
    };
    const handleChange11 = (event: SelectChangeEvent<typeof category>) => {
        const {
            target: { value },
        } = event;
        dispatch(
            setCategory({
                // On autofill we get a stringified value.
                index,
                value: typeof value === "string" ? value.split(",") : value,
            })
        );
    };
    const handleChange12 = (event: SelectChangeEvent<typeof furnished>) => {
        const {
            target: { value },
        } = event;
        dispatch(
            setFurnished({
                // On autofill we get a stringified value.
                index,
                value: typeof value === "string" ? value.split(",") : value,
            })
        );
    };
    const handleChange13 = (event: SelectChangeEvent<typeof state>) => {
        const {
            target: { value },
        } = event;
        dispatch(
            setState({
                // On autofill we get a stringified value.
                index,
                value: typeof value === "string" ? value.split(",") : value,
            })
        );
    };

    // Sliders
    const handleSliderChange = (
        newValue: [number, number],
        minSetter: ActionCreatorWithPayload<any, string>,
        maxSetter: ActionCreatorWithPayload<any, string>
    ) => {
        const [minValue, maxValue] = newValue;

        if (minValue > maxValue) return;

        dispatch(minSetter({ index, value: minValue }));
        dispatch(maxSetter({ index, value: maxValue }));
    };

    const handleSliderChange0 = (event: any, newValue: any, activeThumb: any) =>
        handleSliderChange(newValue, setMinBedrooms, setMaxBedrooms);
    const handleSliderChange1 = (event: any, newValue: any, activeThumb: any) =>
        handleSliderChange(newValue, setMinBathrooms, setMaxBathrooms);
    const handleSliderChange2 = (event: any, newValue: any, activeThumb: any) =>
        handleSliderChange(newValue, setMinCovered, setMaxCovered);
    const handleSliderChange3 = (event: any, newValue: any, activeThumb: any) =>
        handleSliderChange(newValue, setMinPlot, setMaxPlot);
    const handleSliderChange4 = (event: any, newValue: any, activeThumb: any) =>
        handleSliderChange(newValue, setMinPrice, setMaxPrice);
    const handleSliderChange5 = (event: any, newValue: any, activeThumb: any) =>
        handleSliderChange(
            newValue,
            setMinYearOfConstruction,
            setMaxYearOfConstruction
        );

    if (
        !propertyEnums ||
        !stateEnum ||
        !detailsEnum ||
        !furnishingEnum ||
        !parentCategoryEnum ||
        !timeframeEnum
    )
        return null;

    return (
        <>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">
                    {t("Demand Form")} No.{index + 1}
                </Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={autocompleteValue}
                            onChange={autocompleteChange}
                            options={propertyCodes}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={t("Property Code")}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                {t("Parent Category")}
                            </InputLabel>
                            <Select
                                multiple
                                labelId="demo-simple-select-label"
                                value={parentCategories}
                                onChange={handleChange10}
                                renderValue={(selected) => selected.join(", ")}
                                input={<OutlinedInput label="Κατάσταση" />}
                                MenuProps={{
                                    PaperProps: {
                                        sx: { maxHeight: "60vh" },
                                    },
                                }}
                            >
                                {parentCategoryEnum.map(
                                    ({ key, value }, labelSelectIndex) => {
                                        return (
                                            <MenuItem
                                                key={labelSelectIndex}
                                                value={key}
                                            >
                                                <Checkbox
                                                    checked={
                                                        parentCategories.indexOf(
                                                            key
                                                        ) > -1
                                                    }
                                                />

                                                {value}
                                            </MenuItem>
                                        );
                                    }
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    {Array.isArray(parentCategories) &&
                        parentCategories.length > 0 &&
                        parentCategories.map((e, parentCategoriesIndex) => (
                            <Grid key={parentCategoriesIndex} item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        {t("Category")}
                                    </InputLabel>
                                    <Select
                                        multiple
                                        labelId="demo-simple-select-label"
                                        value={category}
                                        onChange={handleChange11}
                                        renderValue={(selected) =>
                                            selected.join(", ")
                                        }
                                        input={
                                            <OutlinedInput label="Κατάσταση" />
                                        }
                                        MenuProps={{
                                            PaperProps: {
                                                sx: { maxHeight: "60vh" },
                                            },
                                        }}
                                    >
                                        {subCategoriesMap[e] ? (
                                            subCategoriesMap[e].map(
                                                (
                                                    { key, value },
                                                    subCategoriesIndex
                                                ) => (
                                                    <MenuItem
                                                        key={subCategoriesIndex}
                                                        value={key}
                                                    >
                                                        <Checkbox
                                                            checked={
                                                                category.indexOf(
                                                                    key
                                                                ) > -1
                                                            }
                                                        />
                                                        {value}
                                                    </MenuItem>
                                                )
                                            )
                                        ) : (
                                            <MenuItem />
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                        ))}
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>{t("Furnishing")}</InputLabel>
                            <Select
                                multiple
                                labelId="demo-simple-select-label"
                                value={furnished}
                                onChange={handleChange12}
                                renderValue={(selected) => selected.join(", ")}
                                input={<OutlinedInput label="Κατάσταση" />}
                                MenuProps={{
                                    PaperProps: {
                                        sx: { maxHeight: "60vh" },
                                    },
                                }}
                            >
                                {furnishingEnum.map(
                                    ({ key, value }, furnishedSelectIndex) => (
                                        <MenuItem
                                            key={furnishedSelectIndex}
                                            value={key}
                                        >
                                            <Checkbox
                                                checked={
                                                    furnished.indexOf(key) > -1
                                                }
                                            />

                                            {value}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>{t("State")}</InputLabel>
                            <Select
                                multiple
                                labelId="demo-simple-select-label"
                                value={state}
                                onChange={handleChange13}
                                renderValue={(selected) => selected.join(", ")}
                                input={<OutlinedInput label="Κατάσταση" />}
                                MenuProps={{
                                    PaperProps: {
                                        sx: { maxHeight: "60vh" },
                                    },
                                }}
                            >
                                {stateEnum.map(
                                    ({ key, value }, stateSelectIndex) => {
                                        return (
                                            <MenuItem
                                                key={stateSelectIndex}
                                                value={key}
                                            >
                                                <Checkbox
                                                    checked={
                                                        state.indexOf(key) > -1
                                                    }
                                                />

                                                {value}
                                            </MenuItem>
                                        );
                                    }
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <LabelSelect index={index} />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>{t("Time Frame")}</InputLabel>
                            <Select
                                value={timeFrame}
                                label={t("Time Frame")}
                                onChange={(e) => {
                                    dispatch(
                                        setTimeFrame({
                                            index,
                                            value: e.target.value,
                                        })
                                    );
                                }}
                            >
                                {timeframeEnum.map(
                                    ({ key, value }, timeFrameSelectIndex) => {
                                        return (
                                            <MenuItem
                                                key={timeFrameSelectIndex}
                                                value={key}
                                            >
                                                {value}
                                            </MenuItem>
                                        );
                                    }
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <DemandFormSlider
                            label={t("Bedrooms")}
                            min={minBedrooms}
                            max={maxBedrooms}
                            defaultMin={0}
                            defaultMax={10}
                            demandIndex={index}
                            handleChange={handleSliderChange0}
                            setterMin={setMinBedrooms}
                            setterMax={setMaxBedrooms}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DemandFormSlider
                            label={t("Bathrooms")}
                            min={minBathrooms}
                            max={maxBathrooms}
                            defaultMin={0}
                            defaultMax={10}
                            demandIndex={index}
                            handleChange={handleSliderChange1}
                            setterMin={setMinBathrooms}
                            setterMax={setMaxBathrooms}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DemandFormSlider
                            label={t("Covered")}
                            min={minCovered}
                            max={maxCovered}
                            defaultMin={0}
                            defaultMax={300}
                            demandIndex={index}
                            handleChange={handleSliderChange2}
                            setterMin={setMinCovered}
                            setterMax={setMaxCovered}
                            adornment="m²"
                            step={10}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DemandFormSlider
                            label={t("Plot")}
                            min={minPlot}
                            max={maxPlot}
                            defaultMin={0}
                            defaultMax={500}
                            demandIndex={index}
                            handleChange={handleSliderChange3}
                            setterMin={setMinPlot}
                            setterMax={setMaxPlot}
                            adornment="m²"
                            step={10}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DemandFormSlider
                            label={t("Price")}
                            min={minPrice}
                            max={maxPrice}
                            defaultMin={0}
                            defaultMax={1000000}
                            demandIndex={index}
                            handleChange={handleSliderChange4}
                            setterMin={setMinPrice}
                            setterMax={setMaxPrice}
                            adornment="€"
                            step={50}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DemandFormSlider
                            label={t("Year of Construction")}
                            min={minYearOfConstruction}
                            max={maxYearOfConstruction}
                            defaultMin={1960}
                            defaultMax={new Date().getFullYear()}
                            demandIndex={index}
                            handleChange={handleSliderChange5}
                            setterMin={setMinYearOfConstruction}
                            setterMax={setMaxYearOfConstruction}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">{t("Floor")}</Typography>
                        <Grid
                            container
                            direction={"row"}
                            spacing={2}
                            paddingTop={2}
                            paddingLeft={3}
                            paddingRight={3}
                        >
                            {minFloorsArray && maxFloorsArray && (
                                <Slider
                                    getAriaLabel={() => "Floor Slider"}
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
                                    valueLabelFormat={(
                                        value: number,
                                        index: number
                                    ) =>
                                        index === 0
                                            ? minFloors![value].value
                                            : maxFloors![value].value
                                    }
                                    min={0}
                                    max={maxFloorsArray.length - 41}
                                />
                            )}

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Min Floor</InputLabel>
                                    <Select
                                        value={minFloor}
                                        label="Min floor"
                                        onChange={(e) => {
                                            dispatch(
                                                setMinFloor({
                                                    index,
                                                    value: e.target.value,
                                                })
                                            );
                                        }}
                                    >
                                        {minFloors
                                            ? minFloors.map(
                                                  (
                                                      { key, value },
                                                      minFloorsSelectIndex
                                                  ) => (
                                                      <MenuItem
                                                          key={
                                                              minFloorsSelectIndex
                                                          }
                                                          value={key}
                                                      >
                                                          {value}
                                                      </MenuItem>
                                                  )
                                              )
                                            : null}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Max Floor</InputLabel>
                                    <Select
                                        value={maxFloor}
                                        label="Max floor"
                                        onChange={(e) => {
                                            dispatch(
                                                setMaxFloor({
                                                    index,
                                                    value: e.target.value,
                                                })
                                            );
                                        }}
                                    >
                                        {maxFloors
                                            ? maxFloors.map(
                                                  (
                                                      { key, value },
                                                      maxFloorsSelectIndex
                                                  ) => (
                                                      <MenuItem
                                                          key={
                                                              maxFloorsSelectIndex
                                                          }
                                                          value={key}
                                                      >
                                                          {value}
                                                      </MenuItem>
                                                  )
                                              )
                                            : null}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} mt={2}>
                    <Typography variant="h6" mb={2}>
                        {t("Area of Preference")}
                    </Typography>
                    <AreaOfPreference
                        index={index}
                        // getters
                        cities={cities}
                        regions={regions}
                        complexes={complexes}
                        // setters
                        setCities={setDemandCities}
                        setComplexes={setDemandComplexes}
                        setRegions={setDemandRegions}
                    />
                </Grid>
            </Grid>

            {parentCategories &&
                parentCategories.length > 0 &&
                parentCategories.map((e, featuresIndex) => (
                    <>
                        <PriorityFeatures
                            key={`${featuresIndex}_1`}
                            index={index}
                            parentCategory={e}
                        />
                        <NonPriorityFeatures
                            key={`${featuresIndex}_2`}
                            index={index}
                            parentCategory={e}
                        />
                    </>
                ))}
        </>
    );
};
export default DemandForm;
