/* eslint-disable react/jsx-key */
import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Typography,
} from "@mui/material";
import * as React from "react";
import { useGlobals } from "src/hooks/useGlobals";
import { useAllUsersQuery } from "src/services/user";
import {
    LabelCreate,
    Placeholder as LabelPlaceholder,
} from "@/components/Label";
import { LeadSource } from "src/types/global";
import CustomerTypeSelect from "./TypeSelect";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Panel from "src/components/Panel";
import { RHFSelect, RHFTextField, RHFRating } from "src/components/hook-form";
import { TranslationType } from "src/types/translation";
import { useMemo } from "react";
import { IUser } from "src/types/user";
import { KeyValue } from "src/types/KeyValue";
import { useFormContext } from "react-hook-form";
import RHFDatePicker from "src/components/hook-form/RHFDatePicker";
import Select from "src/components/hook-form/Select";

const Rating = () => {
    const { t } = useTranslation();

    return (
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
                <RHFRating name="status" />
            </Box>
        </Box>
    );
};

const getFIELDS = (
    t: TranslationType,
    managers: IUser[],
    nationalitiesEnum: KeyValue<string>[],
    leadSourceEnum: KeyValue<string>[],
    leadSource?: LeadSource,
    customerId?: string
) => [
    <RHFTextField fullWidth name="firstName" label={t("First Name") + " *"} />,
    // eslint-disable-next-line react/jsx-key
    <RHFTextField fullWidth name="lastName" label={t("Last Name") + " *"} />,
    // eslint-disable-next-line react/jsx-key
    <RHFTextField fullWidth name="email" label={t("Email")} />,
    <FormControl fullWidth variant="outlined">
        <InputLabel>{t("Managed By")}</InputLabel>
        <RHFSelect name="managedBy" label={t("Managed By")}>
            <MenuItem value="">{t("Not selected")}</MenuItem>
            {managers?.map(({ id, firstName, lastName }, i) => (
                <MenuItem key={i} value={id}>
                    {`${firstName} ${lastName}`}
                </MenuItem>
            ))}
        </RHFSelect>
    </FormControl>,
    <RHFTextField fullWidth name="mobilePhone" label={t("Mobile Phone")} />,
    <RHFTextField fullWidth name="homePhone" label={t("Home Phone")} />,
    <RHFTextField fullWidth name="fax" label={t("Fax")} />,
    <Select
        name="nationality"
        label={t("Nationality")}
        options={nationalitiesEnum}
    />,
    <RHFTextField fullWidth name="idNumber" label={t("ID Number")} />,
    <RHFDatePicker disableFuture name="dateOfBirth" />,
    <RHFTextField
        fullWidth
        name="passportNumber"
        label={t("Passport number")}
    />,
    <FormControl fullWidth variant="outlined">
        <InputLabel>{t("Preferred Language")}</InputLabel>
        <RHFSelect
            fullWidth
            name="preferredLanguage"
            label={t("Preferred Language")}
        >
            <MenuItem value="">{t("Not selected")}</MenuItem>
            <MenuItem value="ENGLISH">{t("English")}</MenuItem>
            <MenuItem value="GREEK">{t("Greek")}</MenuItem>
        </RHFSelect>
    </FormControl>,
    <Select
        name="leadSource"
        label={t("Lead Source")}
        options={leadSourceEnum}
    />,
    leadSource === "CUSTOMER" ? (
        <RHFTextField fullWidth name="suggestedBy" label={t("Suggested by")} />
    ) : null,
    <Rating />,
    customerId ? (
        <LabelCreate variant="customer" resourceId={+customerId} />
    ) : (
        <LabelPlaceholder />
    ),
];

const CustomerInformation: React.FC<any> = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { watch } = useFormContext();

    const { customerId } = router.query;
    const enums = useGlobals();
    const managers = useAllUsersQuery().data || [];
    const leadSource = watch("leadSource");

    const nationalitiesEnum = enums?.customer?.nationality || [];
    const leadSourceEnum = enums?.customer?.leadSource || [];

    const FIELDS = useMemo(
        () =>
            getFIELDS(
                t,
                managers,
                nationalitiesEnum,
                leadSourceEnum,
                leadSource,
                customerId as string
            ),
        [t, managers, nationalitiesEnum, leadSourceEnum, leadSource, customerId]
    );

    return (
        <Panel label="Customer Information">
            <Grid container spacing={2} p={1.5}>
                {FIELDS.map((f, i) => (
                    <Grid key={i} item xs={12} sm={6}>
                        {f}
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <CustomerTypeSelect />
                </Grid>
            </Grid>
        </Panel>
    );
};
export default CustomerInformation;
