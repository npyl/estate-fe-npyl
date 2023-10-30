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
    Switch,
    SwitchProps,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import { useDebouncedCallback } from "use-debounce";
import DatePicker from "src/components/DatePicker";

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
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LabelCreate } from "src/components/label";
import { useGlobals } from "src/hooks/useGlobals";
import {
    useAssignLabelToPropertyWithIDMutation,
    useCreateLabelForPropertyWithIDMutation,
    useDeleteLabelForPropertyWithIdMutation,
    useGetLabelsQuery,
} from "src/services/labels";
import { useLazyGetPropertyLabelsQuery } from "src/services/properties";
import { useAllUsersQuery } from "src/services/user";
import { selectAvailableAfter } from "src/slices/property";
import { ICustomer } from "src/types/customer";
import { IGlobalProperty } from "src/types/global";
import { ILabel } from "src/types/label";

import { CodeField } from "./componentsFields/CodeField";
import { KeyCodeField } from "./componentsFields/KeyCodeField";
import { selectCategory, selectParentCategory } from "src/slices/property";
import { KeyValue } from "src/types/KeyValue";
import { DateObject } from "react-multi-date-picker";
export const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
        focusVisibleClassName=".Mui-focusVisible"
        disableRipple
        {...props}
    />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor:
                    theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
                opacity: 1,
                border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5,
            },
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff",
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color:
                theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22,
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
    },
}));
const BasicSection: React.FC<any> = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { propertyId } = router.query;
    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;

    // get list of owners, managers & labels
    const { data: owners } = useAllCustomersQuery();
    const { data: managers } = useAllUsersQuery();
    const { data: labels } = useGetLabelsQuery();

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

    // const exclusive = useSelector(selectExclusive);

    const state = useSelector(selectState) || "";
    const stateEnum = enums?.state;

    const parentCategory = useSelector(selectParentCategory) || "";
    const category = useSelector(selectCategory) || "";

    // labels
    const [getLabels, { data: assignedLabels }] =
        useLazyGetPropertyLabelsQuery();
    const [assignLabel] = useAssignLabelToPropertyWithIDMutation();
    const [createAndAssignLabel] = useCreateLabelForPropertyWithIDMutation();
    const [deleteLabel] = useDeleteLabelForPropertyWithIdMutation();

    const subCategoriesMap: {
        [key: string]: KeyValue[];
    } | null = useMemo(
        () =>
            enums &&
            enums.residentialCategory &&
            enums.commercialCategory &&
            enums.landCategory &&
            enums.otherCategory
                ? {
                      RESIDENTIAL: enums.residentialCategory,
                      COMMERCIAL: enums.commercialCategory,
                      LAND: enums.landCategory,
                      OTHER: enums.otherCategory,
                  }
                : null,
        [enums]
    );

    useEffect(() => {
        if (!propertyId) return;
        revalidate();
    }, [propertyId]);

    const revalidate = () => {
        // TODO: improve this by revalidating automatically (invalidating a tag)
        getLabels(+propertyId!);
    };

    const handleLabelClick = useDebouncedCallback((label: ILabel) => {
        if (!assignedLabels) return null;
        if (assignedLabels.find((item) => item.id === label.id)) return null;

        label.id &&
            assignLabel({
                propertyId: +propertyId!,
                labelId: label.id,
            }).then(() => revalidate());
    }, 500);

    const handleLabelCreate = (label: ILabel) => {
        createAndAssignLabel({
            propertyId: +propertyId!,
            labelBody: label,
        }).then(() => revalidate());
    };
    const handleLabelRemove = (index: number) =>
        assignedLabels &&
        assignedLabels[index] &&
        assignedLabels[index].id &&
        deleteLabel({
            propertyId: +propertyId!,
            labelId: assignedLabels[index].id!,
        }).then(() => revalidate());

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

    if (!enums || !propertyId || !subCategoriesMap) return null;

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
                            ) || <MenuItem />}
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
                        <TextField
                            fullWidth
                            select
                            label={t("Owner")}
                            value={owner}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setOwner(event.target.value));
                            }}
                        >
                            {owners && owners.length > 0 ? (
                                owners
                                    .filter(
                                        (option: ICustomer) =>
                                            option.seller || option.lessor
                                    ) // Filtering based on sellers or lessors being true
                                    .map((option: ICustomer, index: number) => (
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
                        <OnlyNumbersInput
                            label={t("Area")}
                            value={area}
                            formatThousands
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
                                {stateEnum.map((state, index) => {
                                    return (
                                        <MenuItem key={index} value={state.key}>
                                            {state.value}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Price")}
                            value={price}
                            formatThousands
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
                            formatThousands
                            onChange={(value) => {
                                dispatch(setPlotArea(value));
                            }}
                            adornment="m²"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LabelCreate
                            assignedLabels={assignedLabels || []}
                            onLabelClick={handleLabelClick}
                            onLabelCreate={handleLabelCreate}
                            onRemoveAssignedLabel={handleLabelRemove}
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
                            formatThousands
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
                                    formatThousands
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
