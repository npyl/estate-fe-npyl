import { Box, Grid, MenuItem, Rating, Typography } from "@mui/material";
import * as React from "react";
import { useGlobals } from "src/hooks/useGlobals";
import { useAllUsersQuery } from "src/services/user";

import { LabelCreate } from "src/components/label";

import { selectLeadSource, selectStatus, setStatus } from "src/slices/customer";

import { useDispatch, useSelector } from "react-redux";

import { LeadSource } from "src/types/global";

import CustomerTypeSelect from "./CustomerTypeSelect";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Panel from "src/components/Panel";
import { RHFSelect, RHFTextField } from "src/components/hook-form";

const CustomerInformation: React.FC<any> = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { t } = useTranslation();
    const enums = useGlobals();

    const { customerId } = router.query;

    const nationalitiesEnum = enums?.customer?.nationality;
    const leadSourceEnum = enums?.customer?.leadSource;

    const managers = useAllUsersQuery().data;

    const status = useSelector(selectStatus) || 0;

    const leadSource = (useSelector(selectLeadSource) as LeadSource) || "";

    return (
        <Panel label="Customer Information">
            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <RHFTextField
                            fullWidth
                            name="firstName"
                            label={t("First Name")}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFTextField
                            fullWidth
                            name="lastName"
                            label={t("Last Name")}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFTextField
                            fullWidth
                            name="email"
                            label={t("Email")}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFSelect name="managedBy" label={t("Managed By")}>
                            {managers?.map(({ id, firstName, lastName }, i) => (
                                <MenuItem key={i} value={id}>
                                    {`${firstName} ${lastName}`}
                                </MenuItem>
                            ))}
                        </RHFSelect>
                    </Grid>
                    <Grid item xs={6}>
                        <RHFTextField
                            fullWidth
                            name="mobilePhone"
                            label={t("Mobile Phone")}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFTextField
                            fullWidth
                            name="homePhone"
                            label={t("Home Phone")}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFTextField fullWidth name="fax" label={t("Fax")} />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFSelect
                            fullWidth
                            name="nationality"
                            label={t("Nationality")}
                        >
                            {nationalitiesEnum?.map(({ key, value }, i) => (
                                <MenuItem key={i} value={key}>
                                    {value}
                                </MenuItem>
                            ))}
                        </RHFSelect>
                    </Grid>
                    <Grid item xs={6}>
                        <RHFTextField
                            fullWidth
                            name="idNumber"
                            label={t("ID Number")}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFTextField
                            fullWidth
                            name="dateOfBirth"
                            label={t("Date of Birth")}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFTextField
                            fullWidth
                            name="passportNumber"
                            label={t("Passport Number")}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFSelect
                            fullWidth
                            name="preferredLanguage"
                            label={t("Preferred Language")}
                        >
                            <MenuItem value={"ENGLISH"}>
                                {t("English")}
                            </MenuItem>
                            <MenuItem value={"GREEK"}>{t("Greek")}</MenuItem>
                        </RHFSelect>
                    </Grid>
                    <Grid item xs={6}>
                        <RHFSelect
                            fullWidth
                            name="leadSource"
                            label={t("Lead Source")}
                        >
                            {leadSourceEnum?.map(({ key, value }, i) => (
                                <MenuItem key={i} value={key}>
                                    {value}
                                </MenuItem>
                            ))}
                        </RHFSelect>
                    </Grid>
                    <Grid item xs={6}>
                        {leadSource === "CUSTOMER" ? (
                            <RHFTextField
                                fullWidth
                                name="suggestedBy"
                                label={t("Suggested by")}
                            />
                        ) : null}
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
