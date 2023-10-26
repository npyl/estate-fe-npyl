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
import { useDebouncedCallback } from "use-debounce";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAllCustomersQuery } from "src/services/customers";
import {
    selectArea,
    selectAuction,
    selectAvailableAfter,
    selectBuildable,
    selectCode,
    selectCurrentRentPrice,
    selectDebatablePrice,
    selectEstimatedRentPrice,
    selectKeyCode,
    selectManager,
    selectOwner,
    selectPlotArea,
    selectPrice,
    selectExclusive,
    selectRentalPeriodEnd,
    selectRentalPeriodStart,
    selectRented,
    selectState,
    setArea,
    setAuction,
    setExclusive,
    setAvailableAfter,
    setBuildable,
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

import DatePicker from "src/components/DatePicker";

import { LabelCreate } from "src/components/label";
import { useGlobals } from "src/hooks/useGlobals";
import { useAllUsersQuery } from "src/services/user";
import { IGlobalProperty } from "src/types/global";

import OnlyNumbersInput from "src/components/OnlyNumbers";

import { useEffect } from "react";
import { useLazyGetPropertyLabelsQuery } from "src/services/properties";
import { ILabel } from "src/types/label";

import { useRouter } from "next/router";
import {
    useAssignLabelToPropertyWithIDMutation,
    useCreateLabelForPropertyWithIDMutation,
    useDeleteLabelForPropertyWithIdMutation,
    useGetLabelsQuery,
} from "src/services/labels";
import { CodeField } from "./components/CodeField";
import { KeyCodeField } from "./components/KeyCodeField";
import { ICustomer } from "src/types/customer";
import { useTranslation } from "react-i18next";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { DateObject } from "react-multi-date-picker";
import { IOSSwitch } from "./BasicDetails";

const BasicForLandSection: React.FC<any> = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const data = useGlobals();

    const { propertyId } = router.query;

    // get list of owners & managers
    const { data: owners } = useAllCustomersQuery();
    const { data: managers } = useAllUsersQuery();
    // labels
    const { data: labels } = useGetLabelsQuery();

    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const propertyLabels = labels?.propertyLabels || [];

    // labels
    const [getLabels, { data: assignedLabels }] =
        useLazyGetPropertyLabelsQuery();
    const [assignLabel] = useAssignLabelToPropertyWithIDMutation();
    const [createAndAssignLabel] = useCreateLabelForPropertyWithIDMutation();
    const [deleteLabel] = useDeleteLabelForPropertyWithIdMutation();

    const currentDate = new Date();
    const code = useSelector(selectCode);
    const owner = useSelector(selectOwner) || "";
    const manager = useSelector(selectManager);
    const currentRentPrice = useSelector(selectCurrentRentPrice);
    const estimatedRentPrice = useSelector(selectEstimatedRentPrice);
    const state = useSelector(selectState) || "";
    const price = useSelector(selectPrice);
    const keyCode = useSelector(selectKeyCode);
    const area = useSelector(selectArea);
    const buildable = useSelector(selectBuildable);
    const plotArea = useSelector(selectPlotArea);
    const rented = useSelector(selectRented);
    const availableAfter = useSelector(selectAvailableAfter);
    const rentalPeriodStart = useSelector(selectRentalPeriodStart);
    const rentalPeriodEnd = useSelector(selectRentalPeriodEnd);
    const auction = useSelector(selectAuction);
    const debatablePrice = useSelector(selectDebatablePrice);
    const exclusive = useSelector(selectExclusive);
    const stateEnum = enums?.state;

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
    const handleLabelCreate = (label: ILabel) =>
        createAndAssignLabel({
            propertyId: +propertyId!,
            labelBody: label,
        }).then(() => revalidate());
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

    if (!enums) return null;

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
                                {t("State")}
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
                            label={t("Area")}
                            value={area}
                            formatThousands
                            adornment="m²"
                            onChange={(value) => {
                                dispatch(setArea(value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Plot Area")}
                            value={plotArea}
                            formatThousands
                            adornment="m²"
                            onChange={(value) => {
                                dispatch(setPlotArea(value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Price")}
                            value={price}
                            formatThousands
                            adornment="€"
                            onChange={(value) => {
                                dispatch(setPrice(value));
                            }}
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
                            formatThousands
                            adornment="€"
                            onChange={(value) => {
                                dispatch(setEstimatedRentPrice(value));
                            }}
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
                    <Grid
                        item
                        xs={2}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
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
                    <Grid
                        item
                        xs={4}
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
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={buildable}
                            checked={buildable}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setBuildable(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Buildable" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Buildable")}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={3}
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

                    <Grid item xs={12} padding={1}>
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
                                            label={t(
                                                "Available After"
                                            ).toString()}
                                            onSelect={changeAvailableAfter}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <OnlyNumbersInput
                                            label={t("Current Rent Price")}
                                            value={currentRentPrice}
                                            formatThousands
                                            onChange={(value) => {
                                                dispatch(
                                                    setCurrentRentPrice(value)
                                                );
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
                                            label={t(
                                                "Rental Period Start"
                                            ).toString()}
                                            onSelect={changeRentalPeriodStart}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <DatePicker
                                            date={
                                                rentalPeriodEnd ||
                                                currentDate.toDateString()
                                            }
                                            label={t(
                                                "Rental Period End"
                                            ).toString()}
                                            onSelect={changeRentalPeriodEnd}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default BasicForLandSection;
