import {
    Autocomplete,
    Box,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Slider,
    TextField,
    Typography,
} from "@mui/material";

import * as React from "react";

import {
    selectBuyer,
    selectFurnished,
    // getters
    selectLeaser,
    selectMaxBathrooms,
    selectMaxBedrooms,
    selectMaxCovered,
    selectMaxFloor,
    selectMaxPlot,
    selectMaxPrice,
    selectMaxYearOfConstruction,
    selectMinBathrooms,
    selectMinBedrooms,
    selectMinCovered,
    selectMinFloor,
    selectMinPlot,
    selectMinPrice,
    selectMinYearOfConstruction,
    selectParentCategory,
    selectState,
    selectTimeFrame,
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
    setState,
    setTimeFrame,
    setDemandLabels,
} from "src/slices/customer";
import { useDispatch, useSelector } from "react-redux";
import { FC, useEffect, useState } from "react";
import { useAllGlobalsQuery } from "src/services/global";
import {
    useAllPropertiesQuery,
    useGetPropertyByCodeQuery,
} from "src/services/properties";

import { LabelSelect } from "./LabelSelect";
import { useTranslation } from "react-i18next";

const DemandForm: FC = () => {
    const { t } = useTranslation();

    const enums = useAllGlobalsQuery().data;
    const propertyEnums = enums?.property;
    const stateEnum = propertyEnums?.state;
    const detailsEnum = propertyEnums?.details;
    const parentCategoryEnum = propertyEnums?.parentCategory;
    const furnishingEnum = detailsEnum?.furnished;
    const timeframeEnum = enums?.customer?.timeframe;
    const minFloors = detailsEnum?.floors;
    const maxFloors = detailsEnum?.floors;
    const minBedrooms = useSelector(selectMinBedrooms) || 0;
    const maxBedrooms = useSelector(selectMaxBedrooms) || 0;
    const minBathrooms = useSelector(selectMinBathrooms) || 0;
    const maxBathrooms = useSelector(selectMaxBathrooms) || 0;
    const furnished = useSelector(selectFurnished) || "";
    const maxCovered = useSelector(selectMaxCovered) || 0;
    const minCovered = useSelector(selectMinCovered) || 0;
    const minPlot = useSelector(selectMinPlot) || 0;
    const maxPlot = useSelector(selectMaxPlot) || 0;
    const minYearOfConstruction = useSelector(selectMinYearOfConstruction) || 0;
    const maxYearOfConstruction = useSelector(selectMaxYearOfConstruction) || 0;
    const minFloor = useSelector(selectMinFloor) || 0;
    const maxFloor = useSelector(selectMaxFloor) || 0;
    const parentCategory = useSelector(selectParentCategory) || "";
    const state = useSelector(selectState) || "";
    const minPrice = useSelector(selectMinPrice) || 0;
    const maxPrice = useSelector(selectMaxPrice) || 0;
    const timeFrame = useSelector(selectTimeFrame) || "";
    //Convert the enum to an array
    const minFloorsArray = minFloors;
    const maxFloorsArray = maxFloors;
    // slider value change handler
    const handleSliderChange7 = (_event: any, newValue: number[]) => {
        if (minFloors && maxFloors) {
            dispatch(setMinFloor(minFloors[newValue[0]]));
            dispatch(setMaxFloor(maxFloors[newValue[1]]));
        }
    };

    const leaser = useSelector(selectLeaser);
    const buyer = useSelector(selectBuyer);

    const dispatch = useDispatch();

    const floorMap: Map<number, string> = new Map([
        [-3, "Basement"],
        [-2, "Semi-basement"],
        [-1, "Ground Floor"],
        [0, "Mezzanine"],
        ...Array.from(
            { length: 21 },
            (_, i) => [i + 1, `Floor ${i + 1}`] as const
        ),
    ]);

    const [autocompleteValue, setAutocompleteValue] = useState("");
    const handleChange = (
        setter: any,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch(setter(event.target.value));
    };
    const autocompleteChange = (_event: any, value: string | null) => {
        setAutocompleteValue(value || "");
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
        useGetPropertyByCodeQuery(+autocompleteValue, {
            skip: autocompleteValue === "",
        }) || {};

    // everytime the autocomplete's value is updated, fetch a property
    useEffect(() => {
        const property = propertyForCode;

        if (!property) return;

        dispatch(setParentCategory(property.parentCategory));
        dispatch(setFurnished(property.technicalFeatures.furnished));
        dispatch(setState(property.state));
        // dispatch(setTimeFrame());
        dispatch(setMinBedrooms(property.details.bedrooms));
        dispatch(setMaxBedrooms(property));
        dispatch(setMinBathrooms(property.details.bathrooms));
        dispatch(setMaxBathrooms(property));
        dispatch(setMinCovered(property.technicalFeatures.coverageFactor));
        dispatch(setMaxCovered(property));
        dispatch(setMinPlot(property.plotArea));
        dispatch(setMaxPlot(property));
        dispatch(setMinPrice(property.price));
        dispatch(setMaxPrice(property));
        dispatch(setMinFloor(property.details.floor));
        dispatch(setMaxFloor(property));
        dispatch(
            setMinYearOfConstruction(property.construction.yearOfConstruction)
        );

        dispatch(setDemandLabels(property.labels));

        // dispatch(setMaxYearOfConstruction(property));
    }, [isPropertyForCodeSuccess]);
    const handleSliderChange = (
        event: any,
        newValue: any,
        activeThumb: any
    ) => {
        const newValues = newValue;
        const [minValue, maxValue] = newValues;
        dispatch(setMinBedrooms(minValue)); // Set minBedrooms variable
        dispatch(setMaxBedrooms(maxValue)); // Set maxBedrooms variable
    };

    const handleSliderChange1 = (
        event: any,
        newValue: any,
        activeThumb: any
    ) => {
        const newValues = newValue;
        const [minValue, maxValue] = newValues;
        dispatch(setMinBathrooms(minValue)); // Set minBedrooms variable
        dispatch(setMaxBathrooms(maxValue)); // Set maxBedrooms variable
    };
    const handleSliderChange2 = (
        event: any,
        newValue: any,
        activeThumb: any
    ) => {
        const newValues = newValue;
        const [minValue, maxValue] = newValues;
        dispatch(setMinCovered(minValue)); // Set minBedrooms variable
        dispatch(setMaxCovered(maxValue)); // Set maxBedrooms variable
    };
    const handleSliderChange3 = (
        event: any,
        newValue: any,
        activeThumb: any
    ) => {
        const newValues = newValue;
        const [minValue, maxValue] = newValues;
        dispatch(setMinPlot(minValue)); // Set minBedrooms variable
        dispatch(setMaxPlot(maxValue)); // Set maxBedrooms variable
    };
    const handleSliderChange4 = (
        event: any,
        newValue: any,
        activeThumb: any
    ) => {
        const newValues = newValue;
        const [minValue, maxValue] = newValues;
        dispatch(setMinPrice(minValue)); // Set minBedrooms variable
        dispatch(setMaxPrice(maxValue)); // Set maxBedrooms variable
    };
    const handleSliderChange5 = (
        event: any,
        newValue: any,
        activeThumb: any
    ) => {
        const newValues = newValue;
        const [minValue, maxValue] = newValues;
        dispatch(setMinFloor(minValue)); // Set minBedrooms variable
        dispatch(setMaxFloor(maxValue)); // Set maxBedrooms variable
    };
    const handleSliderChange6 = (
        event: any,
        newValue: any,
        activeThumb: any
    ) => {
        const newValues = newValue;
        const [minValue, maxValue] = newValues;
        dispatch(setMinYearOfConstruction(minValue)); // Set minBedrooms variable
        dispatch(setMaxYearOfConstruction(maxValue)); // Set maxBedrooms variable
    };

    if (
        !enums ||
        !propertyEnums ||
        !stateEnum ||
        !detailsEnum ||
        !furnishingEnum ||
        !parentCategoryEnum ||
        !timeframeEnum
    )
        return null;

    return leaser || buyer ? (
        <Paper
            elevation={10}
            sx={{
                overflow: "auto",
                padding: 0.5,
            }}
        >
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t("Demand Form")}</Typography>
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
                            <InputLabel>{t("Parent Category")}</InputLabel>
                            <Select
                                value={parentCategory}
                                label="Parent Category"
                                onChange={(e) => {
                                    dispatch(setParentCategory(e.target.value));
                                }}
                            >
                                {parentCategoryEnum.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>{t("Furnishing")}</InputLabel>
                            <Select
                                value={furnished}
                                label="Furnishing"
                                onChange={(e) => {
                                    dispatch(setFurnished(e.target.value));
                                }}
                            >
                                {furnishingEnum.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>{t("State")}</InputLabel>
                            <Select
                                value={state}
                                label={t("State")}
                                onChange={(e) => {
                                    dispatch(setState(e.target.value));
                                }}
                            >
                                {stateEnum.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <LabelSelect />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>{t("Time Frame")}</InputLabel>
                            <Select
                                value={timeFrame}
                                label={t("Time Frame")}
                                onChange={(e) => {
                                    dispatch(setTimeFrame(e.target.value));
                                }}
                            >
                                {timeframeEnum.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>
                                            {item}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>{" "}
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
                                onChange={handleSliderChange}
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
                                            minBedrooms === 0 ? "" : minBedrooms
                                        }
                                        onChange={(event) =>
                                            handleChange(setMinBedrooms, event)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Max"
                                        type="number"
                                        value={
                                            maxBedrooms === 0 ? "" : maxBedrooms
                                        }
                                        onChange={(event) =>
                                            handleChange(setMaxBedrooms, event)
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
                                            handleChange(setMinBathrooms, event)
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
                                            handleChange(setMaxBathrooms, event)
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
                                            handleChange(setMinCovered, event)
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    m²
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                // New field
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
                                            handleChange(setMaxCovered, event)
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    m²
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                // New field
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
                                            handleChange(setMinPlot, event)
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    m²
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                // New field
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
                                            handleChange(setMaxPlot, event)
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    m²
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                // New field
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
                                            handleChange(setMinPrice, event)
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    €
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                // New field
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
                                            handleChange(setMaxPrice, event)
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    €
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                // New field
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
                                        minFloorsArray.indexOf(
                                            minFloor as string
                                        ),
                                        maxFloorsArray.indexOf(
                                            maxFloor as string
                                        ),
                                    ]}
                                    onChange={(
                                        _event: any,
                                        newValue: number | number[],
                                        _activeThumb: number
                                    ) => {
                                        if (Array.isArray(newValue)) {
                                            const min =
                                                minFloorsArray[newValue[0]];
                                            const max =
                                                maxFloorsArray[newValue[1]];
                                            dispatch(setMinFloor(min));
                                            dispatch(setMaxFloor(max));
                                        }
                                    }}
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={(
                                        value: number,
                                        index: number
                                    ) =>
                                        index === 0
                                            ? minFloorsArray[value]
                                            : maxFloorsArray[value]
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
                                                setMinFloor(e.target.value)
                                            );
                                        }}
                                    >
                                        {minFloors
                                            ? minFloors.map((item, index) => {
                                                  return (
                                                      <MenuItem
                                                          key={index}
                                                          value={item}
                                                      >
                                                          {item}
                                                      </MenuItem>
                                                  );
                                              })
                                            : null}
                                    </Select>
                                </FormControl>{" "}
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Max Floor</InputLabel>
                                    <Select
                                        value={maxFloor}
                                        label="Max floor"
                                        onChange={(e) => {
                                            dispatch(
                                                setMaxFloor(e.target.value)
                                            );
                                        }}
                                    >
                                        {maxFloors
                                            ? maxFloors.map((item, index) => {
                                                  return (
                                                      <MenuItem
                                                          key={index}
                                                          value={item}
                                                      >
                                                          {item}
                                                      </MenuItem>
                                                  );
                                              })
                                            : null}
                                    </Select>
                                </FormControl>{" "}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    ) : (
        <></>
    );
};
export default DemandForm;
