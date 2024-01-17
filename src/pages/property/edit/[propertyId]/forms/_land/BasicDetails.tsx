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
    selectCategory,
    // setters
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
    setCategory,
    selectParentCategory,
    selectPlotFrontage,
    selectBuildingBalance,
    selectTotalConstruction,
    selectPermissibleBuildingHeight,
    selectPermissibleFloors,
    selectLegalAndTechnicalControl,
    selectIrrigation,
    selectWaterSupply,
    selectSetbackCoefficient,
    selectHasBuildingPermit,
    selectHasBuilding,
    setPlotFrontage,
    setBuildingBalance,
    setTotalConstruction,
    setPermissibleBuildingHeight,
    setPermissibleFloors,
    setSetbackCoefficient,
    setLegalAndTechnicalControl,
    setIrrigation,
    setWaterSupply,
    setHasBuilding,
    setHasBuildingPermit,
} from "src/slices/property";

import DatePicker from "src/components/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import { LabelCreate } from "src/components/label";
import { useGlobals } from "src/hooks/useGlobals";
import { useAllUsersQuery } from "src/services/user";
import { IGlobalProperty } from "src/types/global";
import OnlyNumbersInput from "src/components/OnlyNumbers";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { CodeField } from "../components/CodeField";
import { KeyCodeField } from "../components/KeyCodeField";
import { useTranslation } from "react-i18next";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { DateObject } from "react-multi-date-picker";
import { IOSSwitch } from "src/components/iOSSwitch";
import { KeyValue } from "src/types/KeyValue";

import { styled } from "@mui/system";

const StyledGrid = styled(Grid)`
    display: inline-flex;
    align-items: center;
    flex-direction: row;
`;

interface CustomCheckboxProps {
    value?: boolean;
    setter: ActionCreatorWithPayload<any, string>;
    label: string;
}

const CustomCheckbox = ({ value, setter, label }: CustomCheckboxProps) => {
    const dispatch = useDispatch();

    return (
        <StyledGrid item xs={2}>
            <Checkbox
                value={value}
                checked={value}
                onChange={(e, checked) => dispatch(setter(checked))}
                sx={{ cursor: "default" }}
                color="primary"
            />
            <Typography variant="body1" sx={{ ml: 0 }}>
                {label}
            </Typography>
        </StyledGrid>
    );
};

const BasicForLandSection: React.FC<any> = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const data = useGlobals();

    const { propertyId } = router.query;

    // get list of owners & managers
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

    const enums: IGlobalProperty = data?.property as IGlobalProperty;

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

    const stateEnum = enums?.state || [];

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

    const plotFrontage = useSelector(selectPlotFrontage);
    const buildingBalance = useSelector(selectBuildingBalance);
    const totalConstruction = useSelector(selectTotalConstruction);
    const permissibleBuildingHeight = useSelector(
        selectPermissibleBuildingHeight
    );
    const permissibleFloors = useSelector(selectPermissibleFloors);
    const legalAndTechnicalControl = useSelector(
        selectLegalAndTechnicalControl
    );
    const irrigation = useSelector(selectIrrigation);
    const waterSupply = useSelector(selectWaterSupply);
    const setbackCoefficient = useSelector(selectSetbackCoefficient);
    const hasBuildingPermit = useSelector(selectHasBuildingPermit);
    const hasBuilding = useSelector(selectHasBuilding);

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
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h6">{t("Basic Details")}</Typography>
                <FormControlLabel
                    control={
                        <IOSSwitch
                            value={exclusive}
                            checked={exclusive}
                            onChange={(e, checked) =>
                                dispatch(setExclusive(checked))
                            }
                            name="exclusiveOption"
                        />
                    }
                    label={t("Exclusive")}
                />
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CodeField />
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
                        <Autocomplete
                            disablePortal
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
                        <FormControl fullWidth>
                            <InputLabel>{t("State")}</InputLabel>
                            <Select
                                value={state}
                                label={t("State")}
                                onChange={(e) => {
                                    dispatch(setState(e.target.value));
                                }}
                            >
                                {stateEnum.map((state, index) => (
                                    <MenuItem key={index} value={state.key}>
                                        {state.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Area")}
                            value={area}
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
                            adornment="€"
                            onChange={(value) => {
                                dispatch(setPrice(value));
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <KeyCodeField />
                    </Grid>

                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Estimated Rent Price")}
                            value={estimatedRentPrice}
                            adornment="€"
                            onChange={(value) => {
                                dispatch(setEstimatedRentPrice(value));
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Plot Frontage")}
                            value={plotFrontage}
                            onChange={(v) => dispatch(setPlotFrontage(v))}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Building Balance")}
                            value={buildingBalance}
                            onChange={(v) => dispatch(setBuildingBalance(v))}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Total Construction")}
                            value={totalConstruction}
                            onChange={(v) => dispatch(setTotalConstruction(v))}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Permissible Building Height")}
                            value={permissibleBuildingHeight}
                            onChange={(v) =>
                                dispatch(setPermissibleBuildingHeight(v))
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Permissible Floors")}
                            value={permissibleFloors}
                            onChange={(v) => dispatch(setPermissibleFloors(v))}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Setback Coefficient")}
                            value={setbackCoefficient}
                            onChange={(v) => dispatch(setSetbackCoefficient(v))}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <LabelCreate
                            variant="property"
                            resourceId={+propertyId!}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={2}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
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

                    <CustomCheckbox
                        label={t("Legal and Technical Control")}
                        value={legalAndTechnicalControl}
                        setter={setLegalAndTechnicalControl}
                    />
                    <CustomCheckbox
                        label={t("Irrigation")}
                        value={irrigation}
                        setter={setIrrigation}
                    />
                    <CustomCheckbox
                        label={t("Water Supply")}
                        value={waterSupply}
                        setter={setWaterSupply}
                    />
                    <CustomCheckbox
                        label={t("Building Permit")}
                        value={hasBuildingPermit}
                        setter={setHasBuildingPermit}
                    />
                    <CustomCheckbox
                        label={t("Contains Building")}
                        value={hasBuilding}
                        setter={setHasBuilding}
                    />

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
