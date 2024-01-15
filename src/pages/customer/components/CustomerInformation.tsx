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
import { TranslationType } from "src/types/translation";
import { useMemo } from "react";
import { IUser } from "src/types/user";
import { KeyValue } from "src/types/KeyValue";

const getFIELDS = (
    t: TranslationType,
    managers?: IUser[],
    nationalitiesEnum?: KeyValue<string>[],
    leadSourceEnum?: KeyValue<string>[]
) => [
    <RHFTextField fullWidth name="firstName" label={t("First Name")} />,
    <RHFTextField fullWidth name="lastName" label={t("Last Name")} />,
    <RHFTextField fullWidth name="email" label={t("Email")} />,
    <RHFSelect name="managedBy" label={t("Managed By")}>
        {managers?.map(({ id, firstName, lastName }, i) => (
            <MenuItem key={i} value={id}>
                {`${firstName} ${lastName}`}
            </MenuItem>
        ))}
    </RHFSelect>,
    <RHFTextField fullWidth name="mobilePhone" label={t("Mobile Phone")} />,
    <RHFTextField fullWidth name="homePhone" label={t("Home Phone")} />,
    <RHFTextField fullWidth name="fax" label={t("Fax")} />,
    <RHFSelect fullWidth name="nationality" label={t("Nationality")}>
        {nationalitiesEnum?.map(({ key, value }, i) => (
            <MenuItem key={i} value={key}>
                {value}
            </MenuItem>
        ))}
    </RHFSelect>,
    <RHFTextField fullWidth name="idNumber" label={t("ID Number")} />,
    <RHFTextField fullWidth name="dateOfBirth" label={t("Date of Birth")} />,
    <RHFTextField
        fullWidth
        name="passportNumber"
        label={t("Passport Number")}
    />,
    <RHFSelect
        fullWidth
        name="preferredLanguage"
        label={t("Preferred Language")}
    >
        <MenuItem value={"ENGLISH"}>{t("English")}</MenuItem>
        <MenuItem value={"GREEK"}>{t("Greek")}</MenuItem>
    </RHFSelect>,
    <RHFSelect fullWidth name="leadSource" label={t("Lead Source")}>
        {leadSourceEnum?.map(({ key, value }, i) => (
            <MenuItem key={i} value={key}>
                {value}
            </MenuItem>
        ))}
    </RHFSelect>,
];

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

    const FIELDS = useMemo(
        () => getFIELDS(t, managers, nationalitiesEnum, leadSourceEnum),
        [t, managers, nationalitiesEnum, leadSourceEnum]
    );

    return (
        <Panel label="Customer Information">
            <Grid container spacing={2} p={1.5}>
                {FIELDS.map((f, i) => (
                    <Grid key={i} item xs={6}>
                        {f}
                    </Grid>
                ))}

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
                            <Typography variant="h6">{t("Status")}</Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                py: 1.5,
                            }}
                        >
                            <Rating
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
        </Panel>
    );
};
export default CustomerInformation;
