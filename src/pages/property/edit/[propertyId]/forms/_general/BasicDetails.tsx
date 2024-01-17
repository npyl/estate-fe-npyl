import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import DatePicker from "src/components/DatePicker";

import Autocomplete from "@mui/material/Autocomplete";

import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import OnlyNumbersInput from "src/components/OnlyNumbers";
import { useAllCustomersQuery } from "src/services/customers";

import {
    selectArea,
    selectAuction,
    selectExclusive,
    selectAvgUtils,
    selectCode,
    selectCurrentRentPrice,
    selectDebatablePrice,
    selectEstimatedRentPrice,
    selectKeyCode,
    selectManager,
    selectOwner,
    selectPlotArea,
    selectPrice,
    selectRentalPeriodEnd,
    selectRentalPeriodStart,
    selectRented,
    selectState,
    selectCategory,
    selectParentCategory,
    // setters
    setArea,
    setExclusive,
    setAuction,
    setAvailableAfter,
    setAvgUtils,
    setCategory,
    setCode,
    setCurrentRentPrice,
    setDebatablePrice,
    setEstimatedRentPrice,
    setKeyCode,
    setManager,
    setOwner,
    setPlotArea,
    setPrice,
    setRentalPeriodEnd,
    setRentalPeriodStart,
    setRented,
    setState,
} from "src/slices/property";

import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LabelCreate } from "src/components/label";
import { useGlobals } from "src/hooks/useGlobals";
import { useAllUsersQuery } from "src/services/user";
import { selectAvailableAfter } from "src/slices/property";
import { IGlobalProperty } from "src/types/global";
import { CodeField } from "../componentsFields/CodeField";
import { KeyCodeField } from "../componentsFields/KeyCodeField";
import { KeyValue } from "src/types/KeyValue";
import { DateObject } from "react-multi-date-picker";
import { IOSSwitch } from "src/components/iOSSwitch";

const BasicSection: React.FC<any> = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { propertyId } = router.query;
    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;

    // get list of owners, managers & labels
    const { data: owners } = useAllCustomersQuery();
    const ownerNames = useMemo(() => {
        if (owners) {
            return owners
                .filter((option) => option.seller || option.lessor)
                .map((owner) => ({
                    label: `${owner.firstName} ${owner.lastName}`,
                    value: owner.id,
                }));
        }
        return [];
    }, [owners]);

    const { data: managers } = useAllUsersQuery();
    const currentDate = new Date();
    const code = useSelector(selectCode);
    const owner = useSelector(selectOwner) || "";
    const manager = useSelector(selectManager);
    const currentRentPrice = useSelector(selectCurrentRentPrice);
    const estimatedRentPrice = useSelector(selectEstimatedRentPrice);
    const price = useSelector(selectPrice);
    const keyCode = useSelector(selectKeyCode);
    const avgUtils = useSelector(selectAvgUtils);
    const area = useSelector(selectArea);
    const plotArea = useSelector(selectPlotArea);
    const rented = useSelector(selectRented);
    const debatablePrice = useSelector(selectDebatablePrice);
    const availableAfter = useSelector(selectAvailableAfter);
    const rentalPeriodStart = useSelector(selectRentalPeriodStart);
    const rentalPeriodEnd = useSelector(selectRentalPeriodEnd);
    const auction = useSelector(selectAuction);
    const exclusive = useSelector(selectExclusive);

    const state = useSelector(selectState) || "";
    const stateEnum = enums?.state;

    const parentCategory = useSelector(selectParentCategory) || "";
    const category = useSelector(selectCategory) || "";

    const subCategoriesMap: {
        [key: string]: KeyValue[];
    } = useMemo(
        () => ({
            RESIDENTIAL: enums?.residentialCategory || [],
            COMMERCIAL: enums?.commercialCategory || [],
            LAND: enums?.landCategory || [],
            OTHER: enums?.otherCategory || [],
        }),
        [enums]
    );

    //
    //  Dates
    //
    const changeDate = (
        dates: DateObject | DateObject[],
        setter: ActionCreatorWithPayload<any, string>
    ) => dispatch(setter((dates as DateObject).toDate().toISOString()));

    const changeAvailableAfter = (dates: DateObject | DateObject[]) =>
        changeDate(dates, setAvailableAfter);
    const changeRentalPeriodStart = (dates: DateObject | DateObject[]) =>
        changeDate(dates, setRentalPeriodStart);
    const changeRentalPeriodEnd = (dates: DateObject | DateObject[]) =>
        changeDate(dates, setRentalPeriodEnd);

    return (
        <Paper elevation={10} sx={{ padding: 0.5, overflow: "auto" }}>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "space-between", // This will push the child elements apart
                    alignItems: "center", // This will align them vertically
                }}
            >
                <Typography variant="h6">{t("Basic Details")}</Typography>
                <FormControlLabel
                    control={
                        <IOSSwitch
                            value={exclusive}
                            checked={exclusive}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setExclusive(checked));
                            }}
                            name="exclusiveOption"
                            // any other props you need
                        />
                    }
                    label={t("Exclusive")} // or "iOS style" if you're keeping the original label
                    // ... any other props you need
                />
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CodeField
                            code={code}
                            onChange={(event) =>
                                dispatch(setCode(event.target.value))
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            disabled={!parentCategory}
                            fullWidth
                            select
                            label={t("Category")}
                            value={category}
                            onChange={(e) =>
                                dispatch(setCategory(e.target.value))
                            }
                        >
                            {subCategoriesMap[parentCategory!]?.map(
                                ({ key, value }) => (
                                    <MenuItem key={key} value={key}>
                                        {value}
                                    </MenuItem>
                                )
                            )}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            select
                            label={t("Manager")}
                            value={manager}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setManager(event.target.value));
                            }}
                        >
                            {managers && managers.length > 0 ? (
                                managers?.map((option, index) => (
                                    <MenuItem key={index} value={option.id}>
                                        {`${option.firstName} ${option.lastName}`}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem value={""}></MenuItem>
                            )}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-owners"
                            options={ownerNames}
                            value={{
                                label:
                                    ownerNames.find((i) => i.value == owner)
                                        ?.label ?? "Owner",
                                value: owner,
                            }}
                            onChange={(event: any, newValue: any | null) => {
                                try {
                                    if (newValue.value) {
                                        dispatch(setOwner(newValue.value));
                                    }
                                } catch (e: any) {
                                    console.log(e);
                                }
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Owner" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Area")}
                            value={area}
                            onChange={(value) => {
                                dispatch(setArea(value));
                            }}
                            adornment="m²"
                        />
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
                                {stateEnum?.map((state, index) => (
                                    <MenuItem key={index} value={state.key}>
                                        {state.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Price")}
                            value={price}
                            onChange={(value) => {
                                dispatch(setPrice(value));
                            }}
                            adornment="€"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Plot Area")}
                            value={plotArea}
                            onChange={(value) => {
                                dispatch(setPlotArea(value));
                            }}
                            adornment="m²"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LabelCreate
                            variant="property"
                            resourceId={+propertyId!}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Average Utils")}
                            value={avgUtils}
                            onChange={(value) => {
                                dispatch(setAvgUtils(value));
                            }}
                            adornment="€/Month"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Estimated Rent Price")}
                            value={estimatedRentPrice}
                            onChange={(value) => {
                                dispatch(setEstimatedRentPrice(value));
                            }}
                            adornment="€"
                        />
                    </Grid>

                    <Grid
                        item
                        xs={6}
                        flexDirection="row"
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                        }}
                    >
                        <KeyCodeField
                            keyCode={keyCode}
                            onChange={(event) =>
                                dispatch(setKeyCode(event.target.value))
                            }
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} p={1}>
                <Grid
                    container
                    flexDirection="row"
                    sx={{
                        display: "inline-flex",
                        alignItems: "center",
                    }}
                >
                    <Checkbox
                        id="outlined-controlled"
                        value={rented}
                        checked={rented}
                        onChange={(
                            event: React.ChangeEvent<unknown>,
                            checked: boolean
                        ) => {
                            dispatch(setRented(checked));
                        }}
                        sx={{ cursor: "default" }}
                        color="primary"
                    />
                    <Typography variant="body1" sx={{ ml: 0 }}>
                        {t("Rented")}
                    </Typography>
                </Grid>

                <Grid
                    container
                    spacing={0}
                    sx={{
                        padding: "10px",
                        border: "1px solid #000000",
                        borderRadius: "10px",
                    }}
                >
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <DatePicker
                                    date={
                                        availableAfter ||
                                        currentDate.toDateString()
                                    }
                                    label={t("Available After").toString()}
                                    onSelect={changeAvailableAfter}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <OnlyNumbersInput
                                    label={t("Current Rent Price")}
                                    value={currentRentPrice}
                                    onChange={(value) => {
                                        dispatch(setCurrentRentPrice(value));
                                    }}
                                    adornment="€"
                                    disabled={!rented}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DatePicker
                                    date={
                                        rentalPeriodStart ||
                                        currentDate.toDateString()
                                    }
                                    label={t("Rental Period Start").toString()}
                                    onSelect={changeRentalPeriodStart}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DatePicker
                                    date={
                                        rentalPeriodEnd ||
                                        currentDate.toDateString()
                                    }
                                    label={t("Rental Period End").toString()}
                                    onSelect={changeRentalPeriodEnd}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={3.5}
                    flexDirection="row"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                >
                    <Checkbox
                        value={debatablePrice}
                        checked={debatablePrice}
                        onChange={(
                            event: React.ChangeEvent<unknown>,
                            checked: boolean
                        ) => {
                            dispatch(setDebatablePrice(checked));
                        }}
                        sx={{ cursor: "default" }}
                        color="primary"
                    />
                    <Typography variant="body1" sx={{ ml: 0 }}>
                        {t("Debatable Price")}
                    </Typography>
                </Grid>

                <Grid
                    item
                    xs={2.5}
                    flexDirection="row"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                >
                    <Checkbox
                        value={auction}
                        checked={auction}
                        onChange={(
                            event: React.ChangeEvent<unknown>,
                            checked: boolean
                        ) => {
                            dispatch(setAuction(checked));
                        }}
                        sx={{ cursor: "default" }}
                        color="primary"
                    />
                    <Typography variant="body1" sx={{ ml: 0 }}>
                        {t("Auction")}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default BasicSection;
