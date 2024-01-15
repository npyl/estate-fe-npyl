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
import { useGlobals } from "src/hooks/useGlobals";
import { useAllUsersQuery } from "src/services/user";

import { LabelCreate } from "src/components/label";

import {
    selectDateOfBirth,
    selectEmail,
    selectFax,
    selectFirstName,
    selectHomePhone,
    selectIdNumber,
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
import { LeadSource } from "src/types/global";

import CustomerTypeSelect from "./CustomerTypeSelect";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import DatePicker from "src/components/DatePicker";
import OnlyLettersInput from "src/components/OnlyLetters";
import OnlyEmailInput from "src/components/OnlyEmailInput";
import { DateObject } from "react-multi-date-picker";
import Panel from "src/components/Panel";

const CustomerInformation: React.FC<any> = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { t } = useTranslation();
    const enums = useGlobals();

    const { customerId } = router.query;

    const nationalitiesEnum = enums?.customer?.nationality;
    const leadSourceEnum = enums?.customer?.leadSource;

    const managers = useAllUsersQuery().data;

    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const email = useSelector(selectEmail);
    const mobilePhone = useSelector(selectMobilePhone);
    const homePhone = useSelector(selectHomePhone);
    const fax = useSelector(selectFax);
    const idNumber = useSelector(selectIdNumber);
    const passportNumber = useSelector(selectPassportNumber);
    const status = useSelector(selectStatus) || 0;

    const managedBy = useSelector(selectManagedBy) || "";
    const suggestedBy = useSelector(selectSuggestedBy) || "";
    const nationality = useSelector(selectNationality) || "";
    const dateOfBirth = useSelector(selectDateOfBirth) || "";
    const preferredLanguage = useSelector(selectPreferredLanguage) || "";
    const leadSource = (useSelector(selectLeadSource) as LeadSource) || "";

    const currentDate = new Date();

    const handleDateChange = (dates: DateObject | DateObject[]) =>
        dispatch(setDateOfBirth((dates as DateObject).toDate().toISOString()));

    return (
        <Panel label="Customer Information">
            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <OnlyLettersInput
                            fullWidth
                            label={t("First Name")}
                            value={firstName}
                            onChange={(value) => dispatch(setFirstName(value))}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyLettersInput
                            fullWidth
                            label={t("Last Name")}
                            value={lastName}
                            onChange={(value) => dispatch(setLastName(value))}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyEmailInput
                            label={t("Email")}
                            value={email}
                            onChange={(value) => dispatch(setEmail(value))}
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
                                {managers?.map((manager, index) => {
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
                            value={+mobilePhone}
                            onChange={(value) =>
                                dispatch(setMobilePhone(value.toString()))
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Home Phone")}
                            value={+homePhone}
                            onChange={(value) =>
                                dispatch(setHomePhone(value.toString()))
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Fax")}
                            value={+fax}
                            onChange={(value) =>
                                dispatch(setFax(value.toString()))
                            }
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>{t("Nationality")}</InputLabel>
                            <Select
                                value={nationality}
                                label={t("Nationality")}
                                onChange={(e) => {
                                    dispatch(setNationality(e.target.value));
                                }}
                            >
                                {nationalitiesEnum?.map(
                                    (nationality, index) => {
                                        return (
                                            <MenuItem
                                                key={index}
                                                value={nationality.key}
                                            >
                                                {nationality.value}
                                            </MenuItem>
                                        );
                                    }
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label={t("ID Number")}
                            value={idNumber}
                            onChange={(e) => {
                                dispatch(setIdNumber(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker
                            date={dateOfBirth || currentDate.toDateString()}
                            label={t("Date of Birth").toString()}
                            onSelect={handleDateChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label={t("Passport Number")}
                            value={passportNumber}
                            onChange={(e) => {
                                dispatch(setPassportNumber(e.target.value));
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>{t("Preferred Language")}</InputLabel>
                            <Select
                                value={preferredLanguage}
                                onChange={(e) => {
                                    dispatch(
                                        setPreferredLanguage(
                                            e.target.value as string
                                        )
                                    );
                                }}
                                label={t("Preferred Language")}
                            >
                                <MenuItem value={"ENGLISH"}>
                                    {t("English")}
                                </MenuItem>
                                <MenuItem value={"GREEK"}>
                                    {t("Greek")}
                                </MenuItem>
                            </Select>
                        </FormControl>
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
                                {leadSourceEnum?.map((leadSource, index) => {
                                    return (
                                        <MenuItem
                                            key={index}
                                            value={leadSource.key}
                                        >
                                            {leadSource.value}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        {leadSource === "CUSTOMER" && (
                            <TextField
                                fullWidth
                                label={t("Suggested by")}
                                value={suggestedBy}
                                onChange={(e) => {
                                    dispatch(setSuggestedBy(e.target.value));
                                }}
                            />
                        )}
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
                            resourceId={customerId ? +customerId : -1}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomerTypeSelect />
                    </Grid>
                </Grid>
            </Grid>
        </Panel>
    );
};
export default CustomerInformation;
