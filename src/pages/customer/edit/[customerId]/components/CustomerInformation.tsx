import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Rating,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import * as React from "react";
import { useAllGlobalsQuery } from "src/services/global";
import { useAllUsersQuery } from "src/services/user";

import { LabelCreate } from "src/components/label";

import {
    selectDateOfBirth,
    selectEmail,
    selectFax,
    selectFirstName,
    selectHomePhone,
    selectIdNumber,
    selectLabelIDs,
    selectLastName,
    selectLeadSource,
    selectManagedBy,
    selectMobilePhone,
    selectNationality,
    selectPassportNumber,
    selectPreferredLanguage,
    selectStatus,
    selectSuggestedBy,
    setDateOfBirth,
    setEmail,
    setFax,
    // setters
    setManagedBy,
    setSuggestedBy,
    setFirstName,
    setHomePhone,
    setIdNumber,
    setLastName,
    setLeadSource,
    setMobilePhone,
    setNationality,
    setPassportNumber,
    setPreferredLanguage,
    setStatus,
} from "src/slices/customer";

import { useDispatch, useSelector } from "react-redux";

import OnlyNumbersInput from "src/components/OnlyNumbers";
import {
    addLabelID,
    removeLabel as removeAssignedLabel,
} from "src/slices/customer";
import { useGetLabelsQuery } from "src/services/labels";
import {
    addLabel as addNewLabel,
    removeLabel as removeNewLabel,
    selectAll as selectAllNewLabels,
} from "src/slices/labels";
import { ILabel } from "src/types/label";

import CustomerTypeSelect from "./CustomerTypeSelect";
import { useTranslation } from "react-i18next";

const CustomerInformation: React.FC<any> = (props) => {
    const { t } = useTranslation();

    const enums = useAllGlobalsQuery().data;
    const propertyEnums = enums?.property;
    const managers = useAllUsersQuery().data;

    const leadSourceEnum = enums?.customer?.leadSource;

    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const email = useSelector(selectEmail);
    const managedBy = useSelector(selectManagedBy);
    const mobilePhone = useSelector(selectMobilePhone);
    const homePhone = useSelector(selectHomePhone);
    const fax = useSelector(selectFax);
    const nationality = useSelector(selectNationality);
    const idNumber = useSelector(selectIdNumber);
    const dateOfBirth = useSelector(selectDateOfBirth);
    const passportNumber = useSelector(selectPassportNumber);
    const preferredLanguage = useSelector(selectPreferredLanguage);
    const leadSource = useSelector(selectLeadSource);
    const suggestedBy = useSelector(selectSuggestedBy);
    const status = useSelector(selectStatus);
    const { data: labels } = useGetLabelsQuery();
    const customerLabels = labels?.customerLabels;

    const labelIDs = useSelector(selectLabelIDs);
    const assignedLabels =
        (labelIDs &&
            labelIDs.length > 0 &&
            customerLabels &&
            customerLabels.length > 0 &&
            labelIDs
                .filter((labelID) => labelID)
                .map((labelID, index) => {
                    // get label object with id
                    return customerLabels.find(
                        (label) => label.id === labelID
                    )!;
                })) ||
        [];

    const newLabels = useSelector(selectAllNewLabels);

    const dispatch = useDispatch();

    // Label Handlers
    const handleLabelClick = (label: ILabel) => dispatch(addLabelID(label.id));
    const handleLabelCreate = (label: ILabel) => dispatch(addNewLabel(label));
    const handleRemoveAssignedLabel = (index: number) =>
        dispatch(removeAssignedLabel(index));
    const handleRemoveNewLabel = (index: number) =>
        dispatch(removeNewLabel(index));

    if (
        !enums ||
        !customerLabels ||
        !propertyEnums ||
        !leadSourceEnum ||
        !managers
    )
        return null;

    return (
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
                <Typography variant="h6">
                    {t("Customer Information")}
                </Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-controlled"
                            label={t("First Name")}
                            value={firstName}
                            onChange={(e) => {
                                dispatch(setFirstName(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-controlled"
                            label={t("Last Name")}
                            value={lastName}
                            onChange={(e) => {
                                dispatch(setLastName(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-controlled"
                            label={t("Email")}
                            value={email}
                            onChange={(e) => {
                                dispatch(setEmail(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>{t("Managed By")}</InputLabel>
                            <Select
                                value={managedBy}
                                label={t("Managed By")}
                                onChange={(e) => {
                                    dispatch(setManagedBy(e.target.value));
                                }}
                            >
                                {managers.map((manager, index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={manager.id}
                                        >
                                            {manager.firstName +
                                                " " +
                                                manager.lastName}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Mobile Phone")}
                            value={mobilePhone}
                            onChange={(value) => {
                                dispatch(setMobilePhone(value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Home Phone")}
                            value={homePhone}
                            onChange={(value) => {
                                dispatch(setHomePhone(value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Fax")}
                            value={fax}
                            onChange={(value) => {
                                dispatch(setFax(value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-controlled"
                            label={t("Nationality")}
                            value={nationality}
                            onChange={(e) => {
                                dispatch(setNationality(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-controlled"
                            label={t("ID Number")}
                            value={idNumber}
                            onChange={(e) => {
                                dispatch(setIdNumber(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-controlled"
                            label={t("Date of Birth")}
                            value={dateOfBirth}
                            onChange={(e) => {
                                dispatch(setDateOfBirth(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-controlled"
                            label={t("Passport Number")}
                            value={passportNumber}
                            onChange={(e) => {
                                dispatch(setPassportNumber(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-controlled"
                            label={t("Preferred Language")}
                            value={preferredLanguage}
                            onChange={(e) => {
                                dispatch(setPreferredLanguage(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>{t("Lead Source")}</InputLabel>
                            <Select
                                value={leadSource}
                                label={t("Lead Source")}
                                onChange={(e) => {
                                    dispatch(setLeadSource(e.target.value));
                                }}
                            >
                                {leadSourceEnum.map((leadSource, index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={leadSource}
                                        >
                                            {leadSource}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-controlled"
                            label={t("Suggested by")}
                            value={suggestedBy}
                            onChange={(e) => {
                                dispatch(setSuggestedBy(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                border: 1,
                                borderColor: "divider",
                                borderRadius: 1,
                                height: "100%",
                                px: 3,
                                py: 1.5,
                                display: "flex",
                                justifyContent: "center",
                            }}
                            flexDirection={"column"}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography variant="h6">
                                    {" "}
                                    {t("Status")}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    py: 1.5,
                                }}
                            >
                                <Rating
                                    name="simple-controlled"
                                    value={status}
                                    onChange={(_event, newValue) => {
                                        dispatch(setStatus(newValue));
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <LabelCreate
                            variant="customer"
                            existingLabels={customerLabels}
                            assignedLabels={assignedLabels}
                            newLabels={newLabels}
                            onLabelClick={handleLabelClick}
                            onLabelCreate={handleLabelCreate}
                            onRemoveAssignedLabel={handleRemoveAssignedLabel}
                            onRemoveNewLabel={handleRemoveNewLabel}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomerTypeSelect />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default CustomerInformation;
