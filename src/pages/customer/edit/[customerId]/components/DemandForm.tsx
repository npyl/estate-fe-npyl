import {
    Autocomplete,
    Box,
    Checkbox,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Slider,
    TextField,
    Typography,
} from "@mui/material";
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAllGlobalsQuery } from "src/services/global";
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

interface DemandFormProps {
    index: number;
}
const DemandForm: FC<DemandFormProps> = ({ index }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const enums = useAllGlobalsQuery().data;
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

    const handleChange = (
        setter: any,
        index: number,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        let value: string | number = event.target.value;

        if (
            event.target instanceof HTMLInputElement &&
            event.target.type === "number"
        ) {
            value = event.target.valueAsNumber;
        }

        dispatch(setter({ index, value }));
    };

    const autocompleteChange = (_event: any, value: string | null) =>
        setAutocompleteValue(value || "");

    const handleSliderChange0 = (
        event: any,
        newValue: any,
        activeThumb: any
    ) => {
        const newValues = newValue;
        const [minValue, maxValue] = newValues;
        dispatch(setMinBedrooms({ index, value: minValue }));
        dispatch(setMaxBedrooms({ index, value: maxValue }));
    };
    const handleSliderChange1 = (
        event: any,
        newValue: any,
        activeThumb: any
    ) => {
        const newValues = newValue;
        const [minValue, maxValue] = newValues;
        dispatch(setMinBathrooms({ index, value: minValue }));
        dispatch(setMaxBathrooms({ index, value: maxValue }));
    };
    const handleSliderChange2 = (
        event: any,
        newValue: any,
        activeThumb: any
    ) => {
        const newValues = newValue;
        const [minValue, maxValue] = newValues;
        dispatch(setMinCovered({ index, value: minValue }));
        dispatch(setMaxCovered({ index, value: maxValue }));
    };
    const handleSliderChange3 = (
        event: any,
        newValue: any,
        activeThumb: any
    ) => {
        const newValues = newValue;
        const [minValue, maxValue] = newValues;
        dispatch(setMinPlot({ index, value: minValue }));
        dispatch(setMaxPlot({ index, value: maxValue }));
    };
    const handleSliderChange4 = (
        event: any,
        newValue: any,
        activeThumb: any
    ) => {
        const newValues = newValue;
        const [minValue, maxValue] = newValues;
        dispatch(setMinPrice({ index, value: minValue }));
        dispatch(setMaxPrice({ index, value: maxValue }));
    };
    const handleSliderChange6 = (
        event: any,
        newValue: any,
        activeThumb: any
    ) => {
        const newValues = newValue;
        const [minValue, maxValue] = newValues;
        dispatch(setMinYearOfConstruction({ index, value: minValue }));
        dispatch(setMaxYearOfConstruction({ index, value: maxValue }));
    };

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
                        <Typography variant="h6">{t("Bedrooms")}</Typography>
                        <Grid
                            container
                            direction={"row"}
                            spacing={1}
                            paddingTop={2}
                            paddingLeft={3}
                            paddingRight={3}
                        >
                            <Slider
                                getAriaLabel={() => "Bedrooms Slider"}
                                orientation="horizontal"
                                value={[minBedrooms, maxBedrooms]}
                                onChange={handleSliderChange0}
                                valueLabelDisplay="auto"
                                min={0}
                                max={10}
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Min"
                                        type="number"
                                        value={minBedrooms}
                                        onChange={(event) =>
                                            handleChange(
                                                setMinBedrooms,
                                                index,
                                                event
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Max"
                                        type="number"
                                        value={maxBedrooms}
                                        onChange={(event) =>
                                            handleChange(
                                                setMaxBedrooms,
                                                index,
                                                event
                                            )
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="h6">{t("Bathrooms")}</Typography>

                        <Grid
                            container
                            direction={"row"}
                            spacing={1}
                            paddingTop={2}
                            paddingLeft={3}
                            paddingRight={3}
                        >
                            <Slider
                                getAriaLabel={() => "Bathrooms Slider"}
                                orientation="horizontal"
                                value={[minBathrooms, maxBathrooms]}
                                onChange={handleSliderChange1}
                                valueLabelDisplay="auto"
                                min={0}
                                max={10}
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Min"
                                        type="number"
                                        value={
                                            minBathrooms === 0
                                                ? ""
                                                : minBathrooms
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                setMinBathrooms,
                                                index,
                                                event
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Max"
                                        type="number"
                                        value={
                                            maxBathrooms === 0
                                                ? ""
                                                : maxBathrooms
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                setMaxBathrooms,
                                                index,
                                                event
                                            )
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="h6">{t("Covered")} </Typography>
                        <Grid
                            container
                            direction={"row"}
                            spacing={1}
                            paddingTop={2}
                            paddingLeft={3}
                            paddingRight={3}
                        >
                            <Slider
                                getAriaLabel={() => "Covered Slider"}
                                orientation="horizontal"
                                value={[minCovered, maxCovered]}
                                onChange={handleSliderChange2}
                                valueLabelDisplay="auto"
                                min={0}
                                max={300}
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Min"
                                        type="number"
                                        value={
                                            minCovered === 0 ? "" : minCovered
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                setMinCovered,
                                                index,
                                                event
                                            )
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    m²
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                step: 10,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Max"
                                        type="number"
                                        value={
                                            maxCovered === 0 ? "" : maxCovered
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                setMaxCovered,
                                                index,
                                                event
                                            )
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    m²
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                step: 10,
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="h6">{t("Plot")} </Typography>
                        <Grid
                            container
                            direction={"row"}
                            spacing={1}
                            paddingTop={2}
                            paddingLeft={3}
                            paddingRight={3}
                        >
                            <Slider
                                getAriaLabel={() => "Plot Slider"}
                                orientation="horizontal"
                                value={[minPlot, maxPlot]}
                                onChange={handleSliderChange3}
                                valueLabelDisplay="auto"
                                min={0}
                                max={500}
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Min"
                                        type="number"
                                        value={minPlot === 0 ? "" : minPlot}
                                        onChange={(event) =>
                                            handleChange(
                                                setMinPlot,
                                                index,
                                                event
                                            )
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    m²
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                step: 10,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Max"
                                        type="number"
                                        value={maxPlot === 0 ? "" : maxPlot}
                                        onChange={(event) =>
                                            handleChange(
                                                setMaxPlot,
                                                index,
                                                event
                                            )
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    m²
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                step: 10,
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="h6">{t("Price")} </Typography>
                        <Grid
                            container
                            direction={"row"}
                            spacing={1}
                            paddingTop={2}
                            paddingLeft={3}
                            paddingRight={3}
                        >
                            <Slider
                                getAriaLabel={() => "Price Slider"}
                                orientation="horizontal"
                                value={[minPrice, maxPrice]}
                                onChange={handleSliderChange4}
                                valueLabelDisplay="auto"
                                min={0}
                                max={1000000}
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Min"
                                        type="number"
                                        value={minPrice === 0 ? "" : minPrice}
                                        onChange={(event) =>
                                            handleChange(
                                                setMinPrice,
                                                index,
                                                event
                                            )
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    €
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                step: 50,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Max"
                                        type="number"
                                        value={maxPrice === 0 ? "" : maxPrice}
                                        onChange={(event) =>
                                            handleChange(
                                                setMaxPrice,
                                                index,
                                                event
                                            )
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    €
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                step: 50,
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">
                            {t("Year of Construction")}
                        </Typography>
                        <Grid
                            container
                            direction={"row"}
                            spacing={1}
                            paddingTop={2}
                            paddingLeft={3}
                            paddingRight={3}
                        >
                            <Slider
                                getAriaLabel={() =>
                                    "Year Of Constuction Slider"
                                }
                                orientation="horizontal"
                                value={[
                                    minYearOfConstruction,
                                    maxYearOfConstruction,
                                ]}
                                onChange={handleSliderChange6}
                                valueLabelDisplay="auto"
                                min={1960}
                                max={2023}
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Min"
                                        type="number"
                                        value={
                                            minYearOfConstruction === 0
                                                ? ""
                                                : minYearOfConstruction
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                setMinYearOfConstruction,
                                                index,
                                                event
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Max"
                                        type="number"
                                        value={
                                            maxYearOfConstruction === 0
                                                ? ""
                                                : maxYearOfConstruction
                                        }
                                        onChange={(event) =>
                                            handleChange(
                                                setMaxYearOfConstruction,
                                                index,
                                                event
                                            )
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
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
