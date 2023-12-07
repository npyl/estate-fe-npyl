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
import { FC, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobals } from "src/hooks/useGlobals";
import {
    useAllPropertiesQuery,
    useLazyGetPropertyByCodeQuery,
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
    selectLeaser,
    selectBuyer,
} from "src/slices/customer";

import { useTranslation } from "react-i18next";
import { AreaOfPreference } from "./DemandForm/AreaOfPreference";
import { LabelSelect } from "./LabelSelect";
import PriorityFeatures from "./PriorityFeatures";
import { KeyValue } from "src/types/KeyValue";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { DemandFormSlider } from "./DemandForm/components/DemandFormSlider";
import {
    selectPropertyCode,
    setPropertyCode as setAutocompleteValue,
} from "src/slices/customer/misc";
import { IDemandFiltersPOST } from "src/types/demand";
import { IProperties } from "src/types/properties";

interface DemandFormProps {
    index: number;
}

const DemandForm: FC<DemandFormProps> = ({ index }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const enums = useGlobals();
    const propertyEnums = useMemo(() => enums?.property, [enums]);

    const stateEnum = propertyEnums?.state || [];
    const detailsEnum = propertyEnums?.details;
    const parentCategoryEnum = propertyEnums?.parentCategory || [];
    const furnishingEnum = detailsEnum?.furnished || [];
    const timeframeEnum = enums?.customer?.timeframe || [];

    const minFloors = detailsEnum?.floors || [];
    const maxFloors = detailsEnum?.floors || [];

    const demands = useSelector(selectDemands);
    const demand = useMemo(() => demands.at(index) || null, [demands, index]);
    const demandFilters = useMemo(
        () => demand?.filters || null,
        [demand?.filters]
    );
    const leaser = useSelector(selectLeaser);
    const buyer = useSelector(selectBuyer);
    const stepValue = buyer ? 25000 : leaser ? 100 : 100; // default to 100 if neither is true
    const extractOrDefault = useCallback(
        (key: string, defaultValue: any) =>
            (demandFilters as IDemandFiltersPOST)[key] || defaultValue,
        [demandFilters]
    );

    const {
        minBedrooms,
        maxBedrooms,
        minBathrooms,
        maxBathrooms,
        furnished,
        maxCovered,
        minCovered,
        minPlot,
        maxPlot,
        minYearOfConstruction,
        maxYearOfConstruction,
        minFloor,
        maxFloor,
        parentCategories,
        category,
        state,
        minPrice,
        maxPrice,
        timeFrame,
    } = useMemo(
        () => ({
            minBedrooms: extractOrDefault("minBedrooms", 0),
            maxBedrooms: extractOrDefault("maxBedrooms", 0),
            minBathrooms: extractOrDefault("minBathrooms", 0),
            maxBathrooms: extractOrDefault("maxBathrooms", 0),
            furnished: extractOrDefault("furnished", []),
            maxCovered: extractOrDefault("maxCovered", 0),
            minCovered: extractOrDefault("minCovered", 0),
            minPlot: extractOrDefault("minPlot", 0),
            maxPlot: extractOrDefault("maxPlot", 0),
            minYearOfConstruction: extractOrDefault("minYearOfConstruction", 0),
            maxYearOfConstruction: extractOrDefault("maxYearOfConstruction", 0),
            minFloor: extractOrDefault("minFloor", ""),
            maxFloor: extractOrDefault("maxFloor", ""),
            parentCategories: extractOrDefault("parentCategories", []),
            category: extractOrDefault("categories", []),
            state: extractOrDefault("states", []),
            minPrice: extractOrDefault("minPrice", 0),
            maxPrice: extractOrDefault("maxPrice", 0),
            timeFrame: extractOrDefault("timeframe", []),
        }),
        [demandFilters]
    );

    const minFloorsArray = useMemo(
        () => detailsEnum?.floors?.map((i) => i.key) || [],
        [detailsEnum?.floors]
    );
    const maxFloorsArray = useMemo(
        () => detailsEnum?.floors?.map((i) => i.key) || [],
        [detailsEnum?.floors]
    );

    const propertyCode = useSelector(selectPropertyCode);
    const autocompleteValue = useMemo(
        () => propertyCode?.at(index) || "",
        [propertyCode, index]
    );

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

    const [getPropertyByCode] = useLazyGetPropertyByCodeQuery();

    const fillFromPropertyForCode = useCallback(
        (p: IProperties) => {
            if (!p) return;

            dispatch(
                setParentCategory({
                    index,
                    value: [p.parentCategory.key],
                })
            );
            dispatch(setCategory({ index, value: [p.category.key] }));
            dispatch(
                setFurnished({
                    index,
                    value: [p.technicalFeatures.furnished.key],
                })
            );
            dispatch(setState({ index, value: [p.state.key] }));
            dispatch(
                setMinBedrooms({
                    index,
                    value: p.details.bedrooms,
                })
            );
            dispatch(
                setMinBathrooms({
                    index,
                    value: p.details.bathrooms,
                })
            );
            dispatch(
                setMinCovered({
                    index,
                    value: p.technicalFeatures.coverageFactor,
                })
            );
            dispatch(setMinPlot({ index, value: p.plotArea }));
            dispatch(setMinPrice({ index, value: p.price }));
            dispatch(setMinFloor({ index, value: p.details.floor.key }));
            dispatch(
                setMinYearOfConstruction({
                    index,
                    value: p.construction.yearOfConstruction,
                })
            );

            dispatch(
                setDemandLabels({
                    index,
                    value: p.labels.map((label) => label.id),
                })
            );
        },
        [index]
    );

    const autocompleteChange = useCallback(
        (_event: any, value: string | null) => {
            dispatch(setAutocompleteValue({ index, value: value || "" }));

            value &&
                getPropertyByCode(value)
                    .unwrap()
                    .then((p) => fillFromPropertyForCode(p));
        },
        [index]
    );

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

            <Grid container spacing={2} padding={1} marginBottom={2}>
                <Grid item xs={6}>
                    <Autocomplete
                        disablePortal
                        value={autocompleteValue}
                        onChange={autocompleteChange}
                        options={propertyCodes}
                        renderInput={(params) => (
                            <TextField {...params} label={t("Property Code")} />
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
                            renderValue={(selected: string[]) => {
                                return selected
                                    .map(
                                        (key) =>
                                            parentCategoryEnum.find(
                                                (item) => item.key === key
                                            )?.value
                                    )
                                    .filter(Boolean)
                                    .join(", ");
                            }}
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
                    parentCategories.map((e, parentCategoriesIndex) => {
                        // Find the name (value) of the selected parent category using its key (e)
                        const parentCategoryName = parentCategoryEnum.find(
                            (item) => item.key === e
                        )?.value;

                        return (
                            <Grid key={parentCategoriesIndex} item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="demo-simple-select-label">
                                        {`${t(
                                            "Category"
                                        )} (${parentCategoryName})`}
                                    </InputLabel>

                                    <Select
                                        multiple
                                        labelId="demo-simple-select-label"
                                        value={category}
                                        onChange={handleChange11}
                                        renderValue={(selected: string[]) => {
                                            return selected
                                                .map((key) => {
                                                    // Find the corresponding category from subCategoriesMap using the key
                                                    const category =
                                                        subCategoriesMap[
                                                            e
                                                        ]?.find(
                                                            (item) =>
                                                                item.key === key
                                                        );
                                                    // Return the value of the category or undefined
                                                    return category?.value;
                                                })
                                                .filter(Boolean) // Remove any undefined or null values
                                                .join(", "); // Join the values with a comma
                                        }}
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
                        );
                    })}
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>{t("Furnishing")}</InputLabel>
                        <Select
                            multiple
                            labelId="demo-simple-select-label"
                            value={furnished}
                            onChange={handleChange12}
                            renderValue={(selected: string[]) => {
                                return selected
                                    .map(
                                        (key) =>
                                            furnishingEnum?.find(
                                                (item) => item.key === key
                                            )?.value
                                    )
                                    .filter(Boolean)
                                    .join(", ");
                            }}
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
                            renderValue={(selected: string[]) => {
                                return selected
                                    .map(
                                        (key) =>
                                            stateEnum?.find(
                                                (item) => item.key === key
                                            )?.value
                                    )
                                    .filter(Boolean)
                                    .join(", ");
                            }}
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
                            renderValue={(selected) => {
                                const item = timeframeEnum?.find(
                                    (item) => item.key === selected
                                );
                                return item?.value || "";
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
                        step={stepValue}
                    />
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <DemandFormSlider
                        label={t("Size")}
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
                        label={t("Size of Plot")}
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
                        spacing={1}
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
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel>{t("Min Floor")}</InputLabel>
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
                                    <InputLabel>{t("Max Floor")}</InputLabel>
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
            </Grid>

            <AreaOfPreference
                index={index}
                // setters
                setCities={setDemandCities}
                setComplexes={setDemandComplexes}
                setRegions={setDemandRegions}
            />

            {parentCategories &&
                parentCategories.length > 0 &&
                (parentCategories as string[]).map((e, featuresIndex) => (
                    <PriorityFeatures
                        key={`${featuresIndex}_1`}
                        index={index}
                        parentCategory={e}
                    />
                ))}
        </>
    );
};
export default DemandForm;
