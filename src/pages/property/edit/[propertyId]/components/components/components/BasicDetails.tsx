import {
    Box,
    Checkbox,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useDebouncedCallback } from "use-debounce";
import DateFieldStyled from "./DateFieldStyled"; // adjust the path based on your directory structure

import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import OnlyNumbersInput from "src/components/OnlyNumbers";
import { useAllCustomersQuery } from "src/services/customers";

import "react-day-picker/dist/style.css";

import {
    selectArea,
    selectAuction,
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
    setAuction,
    setAvailableAfter,
    setAvgUtils,
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
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LabelCreate } from "src/components/label";
import { useAllGlobalsQuery } from "src/services/global";
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

const BasicSection: React.FC<any> = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { propertyId } = router.query;
    const { data } = useAllGlobalsQuery();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;

    // get list of owners, managers & labels
    const { data: owners } = useAllCustomersQuery();
    const { data: managers } = useAllUsersQuery();
    const { data: labels } = useGetLabelsQuery();
    const propertyLabels = labels?.propertyLabels;

    const currentDate = new Date();
    const code = useSelector(selectCode);
    const owner = useSelector(selectOwner);
    const manager = useSelector(selectManager);
    const currentRentPrice = useSelector(selectCurrentRentPrice);
    const estimatedRentPrice = useSelector(selectEstimatedRentPrice);
    const price = useSelector(selectPrice);
    const keyCode = useSelector(selectKeyCode);
    const avgUtils = useSelector(selectAvgUtils);
    const area = useSelector(selectArea);
    const plotArea = useSelector(selectPlotArea);
    const rented = useSelector(selectRented);
    const availableAfter = useSelector(selectAvailableAfter);
    const rentalPeriodStart = useSelector(selectRentalPeriodStart);
    const rentalPeriodEnd = useSelector(selectRentalPeriodEnd);
    const auction = useSelector(selectAuction);
    const debatablePrice = useSelector(selectDebatablePrice);
    const state = useSelector(selectState);
    const stateEnum = enums?.state;

    // labels
    const [getLabels, { data: assignedLabels }] =
        useLazyGetPropertyLabelsQuery();
    const [assignLabel] = useAssignLabelToPropertyWithIDMutation();
    const [createAndAssignLabel] = useCreateLabelForPropertyWithIDMutation();
    const [deleteLabel] = useDeleteLabelForPropertyWithIdMutation();

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

    const handleDateChange = (
        setter: ActionCreatorWithPayload<any, string>,
        date: Date | null
    ) => {
        if (!date || !setter) return; // we don't need null

        dispatch(setter(date.toISOString()));
    };

    if (!enums || !propertyLabels || !propertyId) return null;

    return (
        <Paper elevation={10} sx={{ padding: 0.5, overflow: "auto" }}>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t("Basic Details")}</Typography>
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
                            fullWidth
                            id="outlined-start-adornment"
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
                                owners?.map(
                                    (option: ICustomer, index: number) => (
                                        <MenuItem key={index} value={option.id}>
                                            {`${option.firstName} ${option.lastName}`}
                                        </MenuItem>
                                    )
                                )
                            ) : (
                                <MenuItem value={""}></MenuItem>
                            )}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-start-adornment"
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
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                State
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
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
                            label={t("Average Utils")}
                            value={avgUtils}
                            onChange={(value) => {
                                dispatch(setAvgUtils(value));
                            }}
                            adornment="€/Month"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LabelCreate
                            existingLabels={propertyLabels}
                            assignedLabels={assignedLabels || []}
                            newLabels={[]}
                            onLabelClick={handleLabelClick}
                            onLabelCreate={handleLabelCreate}
                            onRemoveAssignedLabel={handleLabelRemove}
                            onRemoveNewLabel={() => {}}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <KeyCodeField
                            keyCode={keyCode}
                            onChange={(event) =>
                                dispatch(setKeyCode(event.target.value))
                            }
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
                        xs={2.7}
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
                            inputProps={{
                                "aria-label": "Floor Heating Checkbox",
                            }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Debatable Price")}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={1.5}
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
                            inputProps={{
                                "aria-label": "Floor Heating Checkbox",
                            }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Auction")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={1.5}
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
                            inputProps={{ "aria-label": "Elevator" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Rented")}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} padding={1}>
                <Grid
                    container
                    spacing={0}
                    sx={{
                        padding: "10px",
                        border: "1px solid #CCCCCC",
                        borderRadius: "10px",
                    }}
                >
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <DateFieldStyled
                                    label="Available After:"
                                    value={
                                        availableAfter
                                            ? new Date(availableAfter)
                                            : currentDate
                                    }
                                    onChange={(value: any) => {
                                        handleDateChange(
                                            setAvailableAfter,
                                            value
                                        );
                                    }}
                                    disabled={!rented} // Disable the field if "rented" is unchecked
                                    sx={{ width: "100%" }} // Add custom styles to make it full width
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
                                <DateFieldStyled
                                    label="Rental Period Start"
                                    value={
                                        rentalPeriodStart
                                            ? new Date(rentalPeriodStart)
                                            : currentDate
                                    }
                                    onChange={(value: any) => {
                                        handleDateChange(
                                            setRentalPeriodStart,
                                            value
                                        );
                                    }}
                                    disabled={!rented} // Disable the field if "rented" is unchecked
                                    sx={{ width: "100%" }} // Add custom styles to make it full width
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <DateFieldStyled
                                    label={t("Rental Period End")}
                                    value={
                                        rentalPeriodEnd
                                            ? new Date(rentalPeriodEnd)
                                            : currentDate
                                    }
                                    onChange={(value: any) => {
                                        handleDateChange(
                                            setRentalPeriodEnd,
                                            value
                                        );
                                    }}
                                    disabled={!rented} // Disable the field if "rented" is unchecked
                                    sx={{ width: "100%" }} // Add custom styles to make it full width
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default BasicSection;
